import React, { useEffect, useRef, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import Utils from "./../Utils";
import _ from "lodash";
import UserContext from "./../contexts/UserContext";
import { Row, Col } from "react-bootstrap";
import { TeacherSubscribe } from "../components/teacher";

const ContactUs = (props) => {
  const frmRef = useRef("ContactForm");
  const [trainer, setTrainer] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { getServerData, setServerData } = useContext(UserContext);
  const $ = window.$;
  const [error, setError] = useState(false);
  const slug = Utils.subdomain();

  useEffect(() => {
    setLoading(true);
    getServerData(`trainer/about/${slug}`, true)
      .then((tData) => {
        getServerData(`settings/trainer/${tData.id}`).then((res) => {
          setTrainer({ ...tData, ..._.omit(res.data, ["id"]) });
          setLoading(false);
        });
      })
      .catch((msg) => {
        setTrainer({ success: false, message: msg });
        setLoading(false);
      });
  }, []);

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
    frmdata.append("slug", slug);
    setServerData(`contact/add`, frmdata, "post")
      .then((res) => setShowMessage(res.message))
      .catch(setError);
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
            <h1 className="slideInUp wow animated pt-4 pb-4 mb-0 Contactus">Contact us</h1>
            <p className="slideInUp wow animated pb-4">
              Reach out to us, if you have questions, requests or simply want to talk,{" "}
              {!_.isEmpty(_.get(trainer, "contact_email", "")) && <a href={`mailto:${trainer.contact_email}`}>{trainer.contact_email}</a>}
              {_.isEmpty(_.get(trainer, "contact_email", "")) && (
                <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>{process.env.REACT_APP_CONTACT_EMAIL}</a>
              )}
            </p>
          </div>
          <p className="ContactForm">ENQUIRY FORM</p>

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
                {showMessage !== false && (
                  <div className="alert alert-info p-3">
                    <strong>{showMessage}</strong>
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
                          <input name="name" id="name" placeholder="Name" title="Name" className="input-text form-control" type="text" required />
                          <div className="invalid-feedback">Full name is required!</div>
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
                          <div className="invalid-feedback">Email address is required!</div>
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
                          <div className="invalid-feedback">Phone number is required!</div>
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
                          <button type="submit" title="Submit" className="action submit w-100 text-right mt-4">
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
              <div className="ContactDetails">
                <a href={`${_.get(trainer, "company_url", "")}`} target="_blank">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/logo/${_.get(trainer, "logo", "../../logo-default.png")}`}
                    className="img-fluid w-50 ml-0"
                    alt={_.get(trainer, "company_name", process.env.REACT_APP_CONTACT_NAME)}
                  />
                </a>
                {_.get(trainer, "contact_address", "") !== "" && (
                  <div className="mt-5 mb-2" dangerouslySetInnerHTML={{ __html: _.get(trainer, "contact_address", "") }}></div>
                )}
                <p className="mt-5 mb-2">Phone: {_.get(trainer, "contact_phone", process.env.REACT_APP_CONTACT_PHONE)}</p>
                <p className="mb-3 mt-1 Contactemail">
                  Email:{" "}
                  <a href={`mailto:${_.get(trainer, "contact_email", process.env.REACT_APP_CONTACT_EMAIL)}`}>
                    {_.get(trainer, "contact_email", process.env.REACT_APP_CONTACT_EMAIL)}
                  </a>
                </p>
                <p className="text-left ContactSubscribe mt-4">
                  Subscribe to Our {_.get(trainer, "company_name", process.env.REACT_APP_CONTACT_NAME)} Newsletter
                </p>
                <TeacherSubscribe type="inLine" />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default ContactUs;
