import React, { useState, useEffect, useRef } from "react";
import Fade from "react-reveal/Fade";

// 3rd party imports
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useScrollSection } from "react-scroll-section";
import { ThreeDots } from "react-loader-spinner";

// Our Imports
import "../App.css";
import "./rsvp.css";
import RSVPModal from "./RSVPModal";

const RSVP = () => {
  const [group, setGroup] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const formRef = useRef();
  const rsvpSection = useScrollSection("rsvp");

  useEffect(() => {
    const queryParamsURL = new URLSearchParams(window.location.search);
    if (!!queryParamsURL.get("fname") && !!queryParamsURL.get("lname")) {
      formRef.current.handleSubmit();
      rsvpSection.onClick();
    }
    // eslint-disable-next-line
  }, []);

  const updateGroup = (fname, lname) => {
    axios
      .get(`/.netlify/functions/rsvp?fname=${fname}&lname=${lname}`, {
        validateStatus: false,
      })
      .then((res) => {
        if (res.status >= 400) {
          return;
        }
        setGroup(res.data.group);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const guestLookupSchema = Yup.object().shape({
    fname: Yup.string()
      .min(3, "Enter at least 3 characters")
      .required("First Name Required")
      .typeError("First Name Required"),
    lname: Yup.string()
      .min(3, "Enter at least 3 characters")
      .required("Last Name Required")
      .typeError("Last Name Required"),
  });

  const queryParams = new URLSearchParams(window.location.search);

  return (
    <div id="rsvp-section">
      <Modal
        open={modalOpen}
        onClose={toggleModal}
        center={true}
        closeOnOverlayClick={false}
      >
        <RSVPModal
          group={group}
          closeModal={toggleModal}
          updateGroup={updateGroup}
        />
      </Modal>
      <Fade top delay={100}>
        <h1>RSVP</h1>

        <p style={{ fontSize: 30 }}>
          Enter your name below to look up your RSVP
        </p>
        <Formik
          initialValues={{
            fname: !!queryParams.get("fname") ? queryParams.get("fname") : "",
            lname: !!queryParams.get("lname") ? queryParams.get("lname") : "",
          }}
          onSubmit={(values, actions) => {
            axios
              .get(
                `/.netlify/functions/rsvp?fname=${values.fname}&lname=${values.lname}`,
                {
                  validateStatus: false,
                }
              )
              .then((res) => {
                if (res.status >= 400) {
                  actions.setStatus(true);
                  actions.setSubmitting(false);
                  return;
                }
                actions.setStatus(false);
                setGroup(res.data.group);
                setModalOpen(true);
                actions.setSubmitting(false);
              })
              .catch((err) => {
                console.log(err);
                actions.setSubmitting(false);
              });
          }}
          validationSchema={guestLookupSchema}
          innerRef={formRef}
        >
          {({ errors, touched, status, setStatus, isSubmitting }) => (
            <Form className="rsvpForm" onChange={() => setStatus(false)}>
              {!!status && (
                <div className="error" style={{ marginBottom: 20 }}>
                  Guest could not be found
                </div>
              )}

              <div>
                <Field
                  id="fname"
                  name="fname"
                  placeholder="First Name"
                  className="form__input"
                />
                {errors.fname && touched.fname ? (
                  <div className="error">{errors.fname}</div>
                ) : null}
              </div>
              <div>
                <Field
                  id="lname"
                  name="lname"
                  placeholder="Last Name"
                  className="form__input"
                  style={{ marginTop: 20 }}
                />
                {errors.lname && touched.lname ? (
                  <div className="error">{errors.lname}</div>
                ) : null}
              </div>
              <br />
              <button type="submit" class="custom-btn btn-3">
                <span>Search for RSVP</span>
              </button>
              {isSubmitting && (
                <ThreeDots color="#6c0e23" height={80} width={80} />
              )}
            </Form>
          )}
        </Formik>
      </Fade>
    </div>
  );
};

export default RSVP;
