import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Utils from "./../Utils";
import axios from "axios";
import _ from "lodash";
import validator from "validator";
import { Row, Col } from "react-bootstrap";
import { TeacherSubscribe } from "../components/teacher";

const ContactUs = (props) => {
  const frmRef = useRef("ContactForm");

  const [showMessage, setShowMessage] = useState(false);
  const $ = window.$;
  const [error, setError] = useState(false);

  const submitForm = (e) => {
    const frm = frmRef.current;
    e.preventDefault();
    frm.classList.add("was-validated");
    if (frm.checkValidity() === false) {
      return false;
    }
    setError(false);
    setShowMessage(false);
    let frmdata = new FormData(frm);
    axios
      .post(Utils.apiUrl(`contact/add`), frmdata, Utils.apiHeaders())
      .then((res) => {
        if (res.data.success) {
          setShowMessage(true);
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        setError(err.message);
        //console.log(err);
      });
  };

  useEffect(window.scrollEffect, []);

  return (
    <>
      <Container className="h-100 ">
        <div className="help-wrapper">
          {/*<nav>
            <ol className="cd-breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li className="current">
                <em>Contact Us</em>
              </li>
            </ol>
  </nav>*/}
          <div className="contactPage">
            <img src="assets/images/contact.png" className="img-fluid" alt="" />
            <h1 className="slideInUp wow animated pt-4 pb-4 mb-0 Contactus">
              Contact us
            </h1>
            <p className="slideInUp wow animated pb-4">
              Reach out to us, if you have questions, requests or simply want to
              talk,{" "}
              <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>
                {process.env.REACT_APP_CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <p className="ContactForm">INQUIRY FORM</p>

          <Row className="ContactForm">
            <Col lg={6} md={12} className="mt-2 mb-2">
              <form
                ref={frmRef}
                className="form contact alertdesign needs-validation"
                id="contact-form"
                method="post"
                noValidate
                onSubmit={submitForm}
              >
                {showMessage && (
                  <div className="alert alert-info p-3">
                    <strong>Record saved successfully!</strong>
                  </div>
                )}
                {error !== false && (
                  <div className="alert alert-danger p-3">
                    <strong>{error}</strong>
                  </div>
                )}
                <fieldset className="fieldset">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="field name required">
                        <div className="control">
                          <input
                            name="name"
                            id="name"
                            placeholder="Name"
                            title="Name"
                            className="input-text form-control"
                            type="text"
                            required
                          />
                          <div className="invalid-feedback">
                            Full name is required!
                          </div>
                        </div>
                      </div>
                      <div className="field email required">
                        <div className="control">
                          <input
                            name="email"
                            id="email"
                            placeholder="Email"
                            title="Email"
                            className="input-text form-control"
                            type="email"
                            required
                          />
                          <div className="invalid-feedback">
                            Email address is required!
                          </div>
                        </div>
                      </div>
                      <div className="field telephone">
                        <div className="control">
                          <input
                            name="phone"
                            id="telephone"
                            placeholder="Phone"
                            title="Phone Number"
                            className="input-text form-control"
                            type="number"
                            required
                          />
                          <div className="invalid-feedback">
                            Phone number is required!
                          </div>
                        </div>
                      </div>

                      <div className="field comment required">
                        <div className="control">
                          <textarea
                            placeholder="What’s on your mind?"
                            name="message"
                            id="message"
                            title="What’s on your mind?"
                            className="input-text"
                            cols="5"
                            rows="3"
                            data-validate="{required:true}"
                            aria-required="true"
                            spellcheck="false"
                          ></textarea>
                        </div>
                      </div>
                      <div className="actions-toolbar">
                        <div className="primary HomeRegister">
                          <button
                            type="submit"
                            title="Submit"
                            className="action submit w-100 text-right mt-4"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </Col>
            <Col lg={6} md={12} className="mt-2 mb-2">
              <Container>
                <div className="ContactDetails">
                  <ul className="d-flex mb-4">
                    <li className="ContactLogo"><img src="assets/images/resc.png" className="img-fluid" alt=""></img></li>
                    <li className="ContactLogos"><img src="assets/images/rescuern.png" className="img-fluid" alt=""></img></li>
                  </ul>
                  <p className="mt-5 mb-2">+1(863) 445-0911</p>
                  <p className="mb-3 mt-1 Contactemail"><a href="mailto:susan@rescuern.com">susan@rescuern.com</a></p>
                  <p className="text-left ContactSubscribe mt-4">Subscribe to Our Rescue RN™ Newsletter</p>
                  <TeacherSubscribe type="inLine" />
                </div>
              </Container>
            </Col>
          </Row>

        </div>
      </Container>
    </>
  );
};

export default ContactUs;
