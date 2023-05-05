import React, { useEffect, useRef, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import Utils from "./../Utils";
import { useParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import validator from "validator";
import UserContext from "./../contexts/UserContext";

const ResetPassword = (props) => {
  const { apiHeaders } = useContext(UserContext);
  const frmRef = useRef("ResetPassForm");
  const { token } = useParams();
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
    if (_.get(frm, "password.value", false)) {
      if (frm.password.value !== frm.conf_password.value) {
        setError("Password verification failed, please verify your password correctly!");
        return false;
      }
    }
    axios
      .post(Utils.apiUrl(`user/resetpass`), frmdata, apiHeaders({ token: token }))
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
      $(frm.password).next().html("Please use Upper case, lower case");
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
                <em>Reset Password</em>
              </li>
            </ol>
  </nav>*/}
          <div className="">
            <img src="assets/images/contact.jpg" className="img-fluid" alt="" />
            <h1 className="slideInUp wow animated pt-4 pb-4 mb-0">Reset Password</h1>
            <p>
              if you have questions, requests or simply want to talk,
              <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>{process.env.REACT_APP_CONTACT_EMAIL}</a>
            </p>

            <div className="row">
              <div className="col-sm-8">
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
                    Passwords must have at least 1 non-alphanumeric character(s) such as as *, -, or #.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form ref={frmRef} className="form forgotPassword needs-validation" id="contact-form" method="post" noValidate onSubmit={submitForm}>
            {showMessage && (
              <div className="alert alert-info p-3">
                <strong>
                  Your password has been updated successfully! Please
                  <a href={`${Utils.getTrainerURL("login")}`}> login again </a>
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
                <div className="col-sm-8">
                  <div className="field name required">
                    <div className="control">
                      <input
                        className="input-text form-control"
                        name="password"
                        onKeyUp={validatePassword}
                        placeholder="Password"
                        type="password"
                        required
                      />
                      <div className="invalid-feedback">Invalid Password</div>
                    </div>
                  </div>
                  <div className="field telephone">
                    <div className="control">
                      <input
                        className="input-text form-control"
                        name="conf_password"
                        onKeyUp={validatePassword}
                        placeholder="Re-enter Password"
                        type="password"
                        required
                      />
                      <div className="invalid-feedback">Passwords Don't Match</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8 text-right">
                  <div className="actions-toolbar">
                    <div className="primary">
                      <button type="submit" title="Submit" className="action submit submitbtn">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
