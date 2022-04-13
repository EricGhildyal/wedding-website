//Imports
import { Client } from "@notionhq/client";
import { google } from "googleapis";
import { Handler } from "@netlify/functions";
const { Duplex } = require("stream");

const parser = require("lambda-multipart-parser");

// Env Vars
const {
  NOTION_TOKEN,
  NOTION_DB_ID,
  DRIVE_FOLDER_ID,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
} = process.env;

const handler: Handler = async (event, context) => {
  // Initializing a notion client
  const notion: Client = new Client({
    auth: NOTION_TOKEN,
  });

  switch (event.httpMethod) {
    case "GET": {
      return await handle_get(event, context, notion);
    }
    case "PUT": {
      return handle_put(event, context, notion);
    }
    default: {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
  }
};

async function handle_get(event: any, context: any, notion: Client) {
  let fname: string = event.queryStringParameters.fname;
  let lname: string = event.queryStringParameters.lname;
  console.log(`GET Request for ${fname} ${lname}`);
  // Check if we're missing data
  if (fname === undefined || lname === undefined) {
    console.log("Returning 400...");
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing required params: fname or lname",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  // Get this guest from the Notion DB, return a friendly error if they don't exist
  try {
    const guestRes = await notion.databases.query({
      database_id: NOTION_DB_ID,
      filter: {
        and: [
          { property: "First Name", title: { contains: fname } },
          { property: "Last Name", title: { contains: lname } },
        ],
      },
    });
    // Handle "guest not found"
    if (guestRes.results && guestRes.results.length === 0) {
      console.log("Returning 404...");
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Could not find guest in Notion",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    // Pull out the group name to use in the next request
    let groupName = guestRes.results[0].properties.Group.title[0].plain_text;

    // Now that we have a single guest, lets get their group
    const groupRes = await notion.databases.query({
      database_id: NOTION_DB_ID,
      filter: {
        property: "Group",
        title: {
          contains: groupName,
        },
      },
      sorts: [
        {
          property: "First Name",
          direction: "ascending",
        },
      ],
    });
    // Handle "group not found"
    if (groupRes.results && groupRes.results.length === 0) {
      console.log("Returning 404...");
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Could not find group in Notion",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    let response = groupRes.results.map((guest) => {
      return {
        fname: guest.properties["First Name"].rich_text[0].plain_text || null,
        lname: guest.properties["Last Name"].rich_text[0]?.plain_text || null, // Special question mark since unknown guests don't have a lname
        // Create a title for this guest. Either "fname lname" or just "fname" for unknown guests
        title: guest.properties["First Name"].rich_text[0].plain_text
          .toLowerCase()
          .includes("guest")
          ? guest.properties["First Name"].rich_text[0].plain_text
          : `${guest.properties["First Name"].rich_text[0].plain_text} ${guest.properties["Last Name"].rich_text[0].plain_text}`,
        rsvp: guest.properties["RSVP Status"].select?.name || null,
        welcomeReception:
          guest.properties["Welcome Reception Status"].select?.name || null,
        vaccineCard: guest.properties["Vaccine Card"].url || null,
        id: guest.id,
        groupName: guest.properties.Group.title[0].plain_text || null,
      };
    });
    // Lets return all guests in the group
    console.log("Returning 200!");
    return {
      statusCode: 200,
      body: JSON.stringify({ group: response }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.log(`Notion error: ${error}`);
  }
  console.log("Returning 400...");
  return {
    statusCode: 400,
    body: JSON.stringify({ message: "There was an error" }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

function bufferToStream(myBuffer) {
  let tmp = new Duplex();
  tmp.push(myBuffer);
  tmp.push(null);
  return tmp;
}

async function getFileURL(file, guestFName, guestLName) {
  try {
    const client = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.split("\\n").join("\n"),
      },
      scopes: "https://www.googleapis.com/auth/drive.file",
    });

    const drive = await google.drive({
      version: "v3",
      auth: client,
    });

    const fileUploadRes = await drive.files.create({
      requestBody: {
        name: `${guestFName}_${guestLName}_vaccine_card_${new Date().toISOString()}.pdf`,
        mimeType: file.contentType,
        parents: [DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: file.contentType,
        body: bufferToStream(file.content),
      },
    });

    if (!!fileUploadRes.data.id) {
      const fileRes = await drive.files.get({
        fileId: fileUploadRes.data.id,
      });

      if (!!fileRes.data.id) {
        return `https://drive.google.com/file/d/${fileRes.data.id}/preview`;
      } else {
        console.log("Error getting file to get link:");
        console.log(fileRes);
      }
    } else {
      console.log("Error uploading file:");
      console.log(fileUploadRes);
    }
  } catch (err) {
    console.log("Google drive error:");
    console.log(err);
  }
  return "Link Generation Failed";
}

async function handle_put(event: any, context: any, notion: Client) {
  //   Get this guest from the Notion DB, return an error if they don't exist
  const res = await parser.parse(event);
  let params = JSON.parse(res.data);
  console.log(`PUT Request for ${params.fname} ${params.lname}!`);
  let file_url = params.vaccineCard;
  // Do we have a file to upload?
  if (res.files.length !== 0) {
    file_url = await getFileURL(res.files[0], params.fname, params.lname);
  }

  try {
    const updateRes = await notion.pages.update({
      page_id: params.id,
      properties: {
        "RSVP Complete": {
          checkbox: true,
        },
        "RSVP Status": {
          select: {
            name: params.rsvp,
          },
        },
        "Welcome Reception Status": {
          select: {
            name: params.welcomeReception,
          },
        },
        "First Name": {
          rich_text: [
            {
              text: {
                content: params.fname,
              },
            },
          ],
        },
        "Last Name": {
          rich_text: [
            {
              text: {
                content: params.lname || "",
              },
            },
          ],
        },
        "Vaccine Card": {
          url: file_url,
        },
      },
    });
    //if we have an ID, it's a success...I guess
    if (!!updateRes.id) {
      console.log("Returning 200!");
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "RSVP Saved" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    } else {
      console.log("Returning 400...");
      console.log("Notion update failed:");
      console.log(updateRes);
    }
  } catch (err) {
    console.log("Returning 400...");
    console.log("Notion update failed:");
    console.log(err);

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "An Error Ocurred" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  console.log("uhhhhhhhhhhhhhhh, we're here....?");
  console.log("Returning 400...");
  return {
    statusCode: 400,
    body: JSON.stringify({ message: "An Error Ocurred" }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export { handler };
