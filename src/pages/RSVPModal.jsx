import React, { useState, useRef, createRef, useEffect } from "react";

// 3rd party imports
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { isEmpty, remove } from "lodash";

// Our Imports
import "../App.css";
import "./rsvp.css";
import ButtonGroup from "../components/buttonGroup";
import { makeConsoleLogger } from "@notionhq/client/build/src/logging";

const rsvpSchema = Yup.object().shape({
  fname: Yup.string()
    .min(1, "Enter at least 1 characters")
    .required("First Name Required")
    .typeError("First Name Required"),
  lname: Yup.string()
    .min(1, "Enter at least 1 characters")
    .required("Last Name Required")
    .typeError("Last Name Required"),
  rsvp: Yup.string().required("RSVP to Wedding Required"),
  welcomeReception: Yup.string()
    .required("RSVP to Reception Required")
    .typeError("Vaccine Card Upload Required"),
  vaccineCard: Yup.string().when("rsvp", {
    is: "Yes",
    then: Yup.string()
      .required("Vaccine Card Upload Required")
      .typeError("Vaccine Card Upload Required"),
    otherwise: Yup.string().nullable(),
  }),
});

const getGroupName = (guests) => {
  return guests[0].properties.Group.title[0].plain_text;
};

const getGuestFullName = (guest) => {
  let fname = guest.properties["First Name"].rich_text[0].plain_text;
  if (fname === "Guest") return fname;
  return `${fname} ${guest.properties["Last Name"].rich_text[0].plain_text}`;
};

const getGuestFName = (guest) => {
  return guest.properties["First Name"].rich_text[0].plain_text;
};

const getGuestLName = (guest) => {
  if (getGuestFullName(guest) === "Guest") return "";
  return guest.properties["Last Name"].rich_text[0].plain_text;
};

const getVaccineURL = (guest) => {
  return guest.properties["Vaccine Card"].url;
};

const RSVPModal = ({ group, closeModal, updateGroup }) => {
  const [complete, setComplete] = useState(false);
  const formRefs = useRef(group.map(() => createRef()));
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(false);

  return (
    <div className="modal-content">
      {complete && (
        <h1>Thanks for submitting your RSVP, {getGroupName(group)}!</h1>
      )}
      {!complete && (
        <div>
          <h1>Welcome {getGroupName(group)}!</h1>
          <p>
            Please complete the RSVP below for each individual in your group.
            You can re-visit this page at any time to update or modify your
            RSVP.
          </p>
          <br />

          {group.map((guest, index) => {
            return (
              <div key={guest.id} className="guest-wrapper">
                <Formik
                  innerRef={formRefs.current[index]}
                  initialValues={{
                    fname:
                      getGuestFName(guest) === "Guest"
                        ? ""
                        : getGuestFName(guest),
                    lname: getGuestLName(guest),
                    rsvp: guest.properties["RSVP Status"].select?.name,
                    welcomeReception:
                      guest.properties["Welcome Reception Status"].select?.name,
                    vaccineCard: getVaccineURL(guest),
                    guestID: guest.id,
                  }}
                  onSubmit={(values, actions) => {
                    try {
                      const formData = new FormData();
                      // Hacky trick to handle getting a new vaccination card
                      if (values.vaccineCard === "new_card") {
                        // add file
                        formData.append(
                          "vaccineCard",
                          values.file,
                          values.file.name
                        );
                      }

                      // get all existing data as JSON
                      const jsonData = JSON.stringify(values);
                      formData.append("data", jsonData);
                      axios
                        .put("/.netlify/functions/rsvp", formData, {
                          validateStatus: false,
                          headers: { "Content-Type": "multipart/form-data" },
                        })
                        .then((res) => {
                          if (res.status === 200) {
                            updateGroup(values.fname, values.lname);
                            actions.setSubmitting(false);
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          actions.setSubmitting(false);
                        });
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  validationSchema={rsvpSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    status,
                    isSubmitting,
                    setFieldValue,
                    setTouched,
                    handleChange,
                  }) => (
                    <Form
                      className="modal-form"
                      onChange={() => setFormErrors(false)}
                    >
                      <h2>{getGuestFullName(guest)}</h2>
                      {!!status && (
                        <div className="error" style={{ marginBottom: 20 }}>
                          Could not update your RSVP, please email
                          hello@eric-patrick.wedding for help!
                        </div>
                      )}
                      <div className="question">
                        <h3>Name</h3>
                        <input
                          name="fname"
                          type="text"
                          placeholder="First Name"
                          value={values.fname}
                          onChange={handleChange}
                        ></input>
                        {errors.fname && touched.fname ? (
                          <div className="error">{errors.fname}</div>
                        ) : null}
                        <br />
                        <input
                          name="lname"
                          type="text"
                          placeholder="Last Name"
                          value={values.lname}
                          onChange={handleChange}
                        ></input>
                        {errors.lname && touched.lname ? (
                          <div className="error">{errors.lname}</div>
                        ) : null}
                      </div>
                      <div className="question">
                        <h3>
                          Can {getGuestFName(guest)} make it to the wedding?
                        </h3>
                        <p>Saturday, August 6th at 5pm</p>
                        <ButtonGroup
                          buttons={[
                            { label: "Absolutely!", value: "Yes" },
                            { label: "Sorry, can't make it", value: "No" },
                          ]}
                          guestID={guest.id}
                          value={values.rsvp}
                          onClick={(event) => {
                            setFieldValue("rsvp", event.target.value);
                            setTouched("rsvp");
                          }}
                        />
                        {errors.rsvp && touched.rsvp ? (
                          <div className="error">{errors.rsvp}</div>
                        ) : null}
                      </div>
                      <div className="question">
                        <h3>
                          Can {getGuestFName(guest)} make it to the welcome
                          reception?
                        </h3>
                        <p>Friday, August 5th at 6pm</p>
                        <ButtonGroup
                          buttons={[
                            { label: "Yes", value: "Yes" },
                            { label: "No", value: "No" },
                            { label: "Maybe", value: "Maybe" },
                          ]}
                          value={values.welcomeReception}
                          guestID={guest.id}
                          onClick={(event) => {
                            setFieldValue(
                              "welcomeReception",
                              event.target.value
                            );
                            setTouched("welcomeReception");
                          }}
                        />
                        {errors.welcomeReception && touched.welcomeReception ? (
                          <div className="error">{errors.welcomeReception}</div>
                        ) : null}
                      </div>
                      <div className="question">
                        <h3>{getGuestFName(guest)}'s Proof of Vaccination</h3>
                        {!!getVaccineURL(guest) && (
                          <div>
                            <br />
                            <h3>
                              Good news, we have {getGuestFName(guest)}'s proof
                              on file!{" "}
                            </h3>
                            <iframe
                              title="Vaccine Card"
                              src={getVaccineURL(guest)}
                              height="250px"
                              width="100%"
                            />
                          </div>
                        )}
                        <div className="upload-btn-wrapper">
                          <label>
                            Select a file to{" "}
                            {!!getVaccineURL(guest) ? "re-upload" : "upload"} as
                            your proof of vaccination.
                            <br />
                            Example: CDC Card, EU Digital COVID Certificate,
                            etc.
                          </label>
                          <input
                            id="vaccine_card"
                            name="vaccine_card"
                            type="file"
                            className="upload-btn"
                            onChange={(event) => {
                              setFieldValue("file", event.target.files[0]);
                              setFieldValue("vaccineCard", "new_card");
                              setTouched("vaccineCard");
                            }}
                          />
                        </div>
                        {errors.vaccineCard && touched.vaccineCard ? (
                          <div className="error">{errors.vaccineCard}</div>
                        ) : null}
                      </div>
                      <button class="custom-btn btn-3" type="submit">
                        <span>Submit {values.fname}'s RSVP</span>
                      </button>
                      {isSubmitting && (
                        <ThreeDots color="#6c0e23" height={80} width={80} />
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            );
          })}
        </div>
      )}
      {loading && <ThreeDots color="#6c0e23" height={80} width={80} />}
      {formErrors && (
        <div className="error">Are you sure you completed all RSVPs?</div>
      )}
      <div className="next-btn">
        <button
          class="custom-btn btn-3"
          onClick={() => {
            if (complete) {
              setComplete(false);
              closeModal();
            } else {
              setLoading(true);
              for (let i = 0; i < formRefs.current.length; i++) {
                formRefs.current[i].current.submitForm();
                console.log(formRefs.current[i].current);
                if (!isEmpty(formRefs.current[i].current.errors)) {
                  setFormErrors(true);
                  setLoading(false);
                  return;
                }
              }
              setComplete(true);
              setFormErrors(false);
              setLoading(false);
            }
          }}
        >
          {complete && <span>Close</span>}
          {!complete && <span>Next</span>}
        </button>
      </div>
    </div>
  );
};

export default RSVPModal;
