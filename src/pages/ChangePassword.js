import React, { useEffect, useRef, useState,useContext } from "react";
import { Alert, Container, ProgressBar } from "react-bootstrap";
import Utils from "./../Utils";
import { useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import validator from "validator";
import UserContext from "../contexts/UserContext";

const ChangePassword = (props) => {
  const frmRef = useRef("ResetPassForm");
  const { token } = useParams();
  const [showMessage, setShowMessage] = useState(false);
  const $ = window.$;
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [trainer, setTrainer] = useState({ email: "" });
  const slug = Utils.subdomain();
  const { getServerData } = useContext(UserContext);
  const [userData, setUserData] = useState(Utils.getUserData());

  useEffect(() => {
    getServerData(`trainer/about/${slug}`, true)
      .then((tData) => {
        setTrainer(tData);
      })
      .catch((msg) => {
        setTrainer({ success: false, message: msg });
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
    if (_.get(frm, "password.value", false)) {
      if (frm.password.value !== frm.conf_password.value) {
        setError(
          "Password verification failed, please verify your password correctly!"
        );
        return false;
      }
    }
    setProcessing(true);
    axios
      .post(
        Utils.apiUrl(`user/chgpwd`),
        frmdata,
        Utils.apiHeaders({ token: token })
      )
      .then((res) => {
        if (res.data.success) {
          setShowMessage(true);
          Utils.setUserData(false); 
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        setError(err.message);
        //console.log(err);
      })
      .finally(() => setProcessing(false));
  };

  const validatePassword = () => {
    const frm = frmRef.current;
    if (
      !validator.isStrongPassword(frm.password.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      frm.password.setCustomValidity("Passwords Don't Match");
      $(frm.password)
        .next()
        .html("Please enter appropriate password as per above instructions.");
    } else {
      frm.password.setCustomValidity("");
      $(frm.password).next().html("");
    }
    if (frm.password.value !== frm.conf_password.value) {
      frm.conf_password.setCustomValidity("Passwords Don't Match");
      $(frm.conf_password).next().html("Passwords Don't Match!!!");
    } else {
      frm.conf_password.setCustomValidity("");
      $(frm.conf_password).next().html("");
    }
  };

  useEffect(window.scrollEffect, []);

  const openLoginModal = (e) => {
    e.preventDefault();
    $("#loginModal").modal("show");
  };
  console.log(trainer);
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
                <em>Change Password</em>
              </li>
            </ol>
  </nav>*/}
          <div className="">
            <h1 className="slideInUp wow animated pt-4 pb-4 mb-0">
              Change your account password
            </h1>
            <p>
              if you have questions, requests or simply want to talk, <a href={`mailto:${trainer.email ? trainer.email : process.env.REACT_APP_CONTACT_EMAIL}`}>
              {trainer.email ? trainer.email : process.env.REACT_APP_CONTACT_EMAIL}
              </a>
            </p>
          </div>
          {processing && (
            <Alert variant="info">
              <div className="pt-2">Please wait..</div>
              <div className="progress-bar bg-info progress-bar-striped progress-bar-animated m-3">
                <b>Processing change password</b>
              </div>
            </Alert>
          )}
          {!processing && (
            <form
              ref={frmRef}
              className="form forgotPassword needs-validation"
              id="contact-form"
              method="post"
              noValidate
              onSubmit={submitForm}
            >
              {showMessage && (
                <div className="alert alert-info p-3">
                  <strong>
                    Your password has been updated successfully! Please
                    <a href={`${Utils.getTrainerURL('login')}`} className="px-2">
                      login again
                    </a>
                    with new password.
                  </strong>
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
                    <label>
                      <b>Old Password</b>
                    </label>
                    <div className="field name required">
                      <div className="control">
                        <input
                          className="input-text form-control"
                          name="current_password"
                          onKeyUp={validatePassword}
                          placeholder="Old Password"
                          type="password"
                          required
                        />
                        <div className="invalid-feedback my-2">
                          Invalid Password
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <label>
                      <b>New Password</b>
                    </label>

                    <div className="field name required">
                      <div className="control">
                        <input
                          className="input-text form-control"
                          name="password"
                          onKeyUp={validatePassword}
                          placeholder="New Password"
                          type="password"
                          required
                        />
                        <div className="invalid-feedback my-2">
                          Invalid Password
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <label>
                      <b>Confirm new Password</b>
                    </label>
                    <input
                      className="input-text form-control"
                      name="conf_password"
                      onKeyUp={validatePassword}
                      placeholder="Confirm new Password"
                      type="password"
                      required
                    />
                    <div className="invalid-feedback my-2">
                      Passwords Don't Match
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <div className="bg-light p-3 mb-3">
                      <div>
                        <i className="fas fa-exclamation-circle mr-2 text-info"></i>
                        Passwords must be at least 8 characters long.
                      </div>
                      <div>
                        <i className="fas fa-exclamation-circle mr-2 text-info"></i>
                        Passwords must have at least 1 digit(s).
                      </div>
                      <div>
                        <i className="fas fa-exclamation-circle mr-2 text-info"></i>
                        Passwords must have at least 1 non-alphanumeric
                        character(s) such as as *, -, or #.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 text-right">
                    <div className="actions-toolbar">
                      <div className="primary">
                        <button
                          type="submit"
                          title="Submit"
                          className="action submit submitbtn"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          )}
        </div>
      </Container>
    </>
  );
};

export default ChangePassword;
