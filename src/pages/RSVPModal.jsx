import React, { useState } from "react";

// 3rd party imports
import axios from "axios";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { isEmpty } from "lodash";

// Our Imports
import "../App.css";
import "./rsvp.css";
import ButtonGroup from "../components/buttonGroup";

const guestSchema = Yup.object().shape({
  fname: Yup.string().when("rsvp", {
    is: "Yes",
    then: Yup.string()
      .min(1, "Enter at least 1 character")
      .required("First Name Required")
      .typeError("First Name Required"),
    otherwise: Yup.string().nullable(),
  }),
  lname: Yup.string().when("rsvp", {
    is: "Yes",
    then: Yup.string()
      .min(1, "Enter at least 1 character")
      .required("Last Name Required")
      .typeError("Last Name Required"),
    otherwise: Yup.string().nullable(),
  }),
  rsvp: Yup.string()
    .required("RSVP to Wedding Required")
    .typeError("RSVP to Wedding Required"),
  welcomeReception: Yup.string()
    .required("RSVP to Reception Required")
    .typeError("RSVP to Reception Required"),
  vaccineCard: Yup.string().when("rsvp", {
    is: "Yes",
    then: Yup.string()
      .required("Vaccine Card Upload Required")
      .typeError("Vaccine Card Upload Required"),
    otherwise: Yup.string().nullable(),
  }),
});

const rsvpSchema = Yup.object().shape({
  group: Yup.array().of(guestSchema),
});

const RSVPModal = ({ group, updateGroup }) => {
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="modal-content">
      {complete && (
        <div style={{ fontSize: 20 }}>
          <h1>
            {loading
              ? "Submitting your RSVP(s)..."
              : `Thanks for submitting your RSVP, ${group[0].groupName}!`}
          </h1>
          {loading && <ThreeDots color="#6c0e23" height={80} width={80} />}
          <br />
          <p>Here's what you submitted:</p>
          {group.map((guest) => {
            return (
              <div key={guest.id}>
                <p style={{ fontWeight: "bold" }}>
                  {guest.fname} {guest.lname}
                </p>
                <p>Wedding RSVP: {guest.rsvp}</p>
                <p>Welcome Reception: {guest.welcomeReception}</p>
                <br />
              </div>
            );
          })}
          <p></p>
        </div>
      )}
      {!complete && (
        <div>
          <h1>Welcome {group[0].groupName}!</h1>
          <p>
            Please complete the RSVP below for each individual in your group.
            You can re-visit this page at any time to update your RSVP.
          </p>
          <br />
          <Formik
            initialValues={{
              group: group,
            }}
            onSubmit={(values, actions) => {
              setLoading(true);
              for (let idx in values.group) {
                let guest = values.group[idx];
                // Handle case where we need to send something to the backend
                if (
                  guest.fname === null ||
                  guest.fname === undefined ||
                  guest.fname === " " ||
                  guest.fname === ""
                ) {
                  guest.fname = `${group[0].fname}'s Guest`;
                }

                const formData = new FormData();
                // Hacky trick to handle getting a new vaccination card
                if (guest.vaccineCard === "new_card") {
                  // add file
                  formData.append("vaccineCard", guest.file, guest.file.name);
                }

                // get all existing data as JSON
                const jsonData = JSON.stringify(guest);
                formData.append("data", jsonData);
                axios
                  .put("/.netlify/functions/rsvp", formData, {
                    validateStatus: false,
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      if (!guest.fname.toLowerCase().includes("guest")) {
                        updateGroup(guest.fname, guest.lname);
                      }
                      if (parseInt(idx) === parseInt(values.group.length - 1)) {
                        setLoading(false);
                        actions.setStatus(true);
                        setComplete(true);
                      }
                    }
                  })
                  // eslint-disable-next-line no-loop-func
                  .catch((err) => {
                    console.log(
                      `Error updating ${guest.fname} ${guest.lname}'s RSVP:`
                    );
                    console.log(err);
                    actions.setSubmitting(false);
                    setLoading(false);
                  });
              }
            }}
            validationSchema={rsvpSchema}
          >
            {({
              values,
              errors,
              touched,
              status,
              setFieldValue,
              setTouched,
              handleChange,
            }) => (
              <Form className="modal-form">
                <FieldArray
                  name="group"
                  render={() => {
                    return (
                      <div>
                        {group && group.length > 0 ? (
                          group.map((guest, index) => {
                            if (guest.fname.toLowerCase().includes("guest")) {
                              values.group[index].fname = "";
                            }
                            return (
                              <div key={guest.id} className="guest-wrapper">
                                <h2>{guest.title}</h2>
                                <div className="question">
                                  <h3>Name</h3>
                                  <input
                                    name={`group[${index}].fname`}
                                    type="text"
                                    placeholder="First Name"
                                    value={values.group[index].fname}
                                    onChange={handleChange}
                                    tabindex="-1"
                                  ></input>
                                  {errors.group &&
                                  errors.group[index] &&
                                  errors.group[index].fname &&
                                  touched.group &&
                                  touched.group[index] &&
                                  touched.group[index].fname ? (
                                    <div className="error">
                                      {errors.group[index].fname}
                                    </div>
                                  ) : null}
                                  <br />
                                  <input
                                    name={`group[${index}].lname`}
                                    type="text"
                                    placeholder="Last Name"
                                    value={values.group[index].lname}
                                    onChange={handleChange}
                                    tabindex="-1"
                                  ></input>
                                  {errors.group &&
                                  errors.group[index] &&
                                  errors.group[index].lname &&
                                  touched.group &&
                                  touched.group[index] &&
                                  touched.group[index].lname ? (
                                    <div className="error">
                                      {errors.group[index].lname}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="question">
                                  <h3>
                                    Can {guest.title} make it to the wedding?
                                  </h3>
                                  <p>Brasserie - Saturday, August 6th at 5pm</p>
                                  <ButtonGroup
                                    buttons={[
                                      { label: "Absolutely!", value: "Yes" },
                                      {
                                        label: "Sorry, can't make it",
                                        value: "No",
                                      },
                                    ]}
                                    name={`group[${index}].rsvp`}
                                    guestID={guest.id}
                                    value={values.group[index].rsvp}
                                    onClick={(event) => {
                                      setFieldValue(
                                        `group[${index}].rsvp`,
                                        event.target.value
                                      );
                                      setTouched(`group[${index}].rsvp`);
                                    }}
                                  />
                                  {errors.group &&
                                  errors.group[index] &&
                                  errors.group[index].rsvp &&
                                  touched.group &&
                                  touched.group[index] &&
                                  touched.group[index].rsvp ? (
                                    <div className="error">
                                      {errors.group[index].rsvp}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="question">
                                  <h3>
                                    Can {guest.title} make it to the welcome
                                    reception?
                                  </h3>
                                  <p>Clerys - Friday, August 5th at 6pm</p>
                                  <ButtonGroup
                                    buttons={[
                                      { label: "Yes", value: "Yes" },
                                      { label: "No", value: "No" },
                                      { label: "Maybe", value: "Maybe" },
                                    ]}
                                    value={values.group[index].welcomeReception}
                                    guestID={guest.id}
                                    onClick={(event) => {
                                      setFieldValue(
                                        `group[${index}].welcomeReception`,
                                        event.target.value
                                      );
                                      setTouched(
                                        `group[${index}].welcomeReception`
                                      );
                                    }}
                                  />
                                  {errors.group &&
                                  errors.group[index] &&
                                  errors.group[index].welcomeReception &&
                                  touched.group &&
                                  touched.group[index] &&
                                  touched.group[index].welcomeReception ? (
                                    <div className="error">
                                      {errors.group[index].welcomeReception}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="question">
                                  <h3>{guest.title}'s Proof of Vaccination</h3>
                                  {!!guest.vaccineCard && (
                                    <div>
                                      <br />
                                      <h3>
                                        Good news, we have {guest.title}
                                        's proof on file!{" "}
                                      </h3>
                                      <iframe
                                        title="Vaccine Card"
                                        src={guest.vaccineCard}
                                        height="250px"
                                        width="100%"
                                      />
                                    </div>
                                  )}
                                  <div className="upload-btn-wrapper">
                                    <label>
                                      Select a file to{" "}
                                      {!!guest.vaccineCard
                                        ? "re-upload"
                                        : "upload"}{" "}
                                      as your proof of vaccination.
                                      <br />
                                      Example: CDC Card, EU Digital COVID
                                      Certificate, etc.
                                    </label>
                                    <input
                                      id="vaccine_card"
                                      name={`group[${index}].vaccineCard`}
                                      type="file"
                                      className="upload-btn"
                                      onChange={(event) => {
                                        setFieldValue(
                                          `group[${index}].file`,
                                          event.target.files[0]
                                        );
                                        setFieldValue(
                                          `group[${index}].vaccineCard`,
                                          "new_card"
                                        );
                                        setTouched(
                                          `group[${index}].vaccineCard`
                                        );
                                      }}
                                      tabindex="-1"
                                    />
                                  </div>
                                  {errors.group &&
                                  errors.group[index] &&
                                  errors.group[index].vaccineCard &&
                                  touched.group &&
                                  touched.group[index] &&
                                  touched.group[index].vaccineCard ? (
                                    <div className="error">
                                      {errors.group[index].vaccineCard}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div>Loading...</div>
                        )}
                      </div>
                    );
                  }}
                />
                {!isEmpty(errors) && touched.group && (
                  <div className="error">
                    One or more of your RSVPs have errors
                  </div>
                )}
                {!!status && (
                  <div className="error" style={{ marginBottom: 20 }}>
                    Sorry, something went wrong while submitting your RSVP,
                    please try again in a minute!
                  </div>
                )}
                {loading && (
                  <ThreeDots color="#6c0e23" height={80} width={80} />
                )}
                <button
                  className="custom-btn btn-3"
                  type="submit"
                  tabindex="-1"
                >
                  <span>Submit RSVPs</span>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default RSVPModal;
