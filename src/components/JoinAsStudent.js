import React, { useState, useEffect, useRef, useContext } from "react";
import Utils from "./../Utils";
import _ from "lodash";
import validator from "validator";
import UserContext from "./../contexts/UserContext";

const JoinAsStudent = (props) => {
  const frmRef = useRef("trainerForm");
  const { setServerData } = useContext(UserContext);
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
    console.log(frm);
    if (_.get(frm, "password.value", false)) {
      if (frm.password.value !== frm.conf_password.value) {
        setError("Password verification failed, please verify your password correctly!");
        return false;
      }
    }
    setServerData("user/add", frmdata, "post")
      .then((res) => {
        setShowMessage(true);
      })
      .catch(setError);
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
    if (frm.password.value != frm.conf_password.value) {
      frm.conf_password.setCustomValidity("Passwords Don't Match");
      $(frm.conf_password).next().html("Passwords Don't Match!!!");
    } else {
      frm.conf_password.setCustomValidity("");
      $(frm.conf_password).next().html("");
    }
  };
  useEffect(() => {
    $(".modal").on("show.bs.modal", function (e) {
      $(".modal .modal-dialog").attr("class", "modal-dialog modal-full  zoomIn  animated");
    });
    $(".modal").on("hide.bs.modal", function (e) {
      $(".modal .modal-dialog").attr("class", "modal-dialog  zoomOut modal-full  animated");
    });
  }, []);

  return (
    <>
      <div className="modal" id="signUpStudent" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-full" role="document">
          <div className="modal-content">
            <div className="overlay"></div>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <img className="img-fluid" src="/assets/images/close-circle.png" alt="AD closed" />
            </button>
            <div className="modal-body p-4">
              <div className="container">
                <div className="loginWrapper signupWrapper">
                  <h3>
                    Join in <span className="joinastrainer"> NOW TO CONNECT with </span> <br />
                    the world's top branded trainers
                  </h3>
                  <form ref={frmRef} method="post" className="needs-validation" noValidate onSubmit={submitForm}>
                    {showMessage && (
                      <div className="alert alert-success p-3">
                        <strong className="d-inline-flex">
                          Congrats for successfully submitting your information. To continue, kindly click the button
                          <a href={Utils.getTrainerURL(`login`)}>
                            <div className="LoginStudent ml-3">login</div>
                          </a>
                          {/* <div className="trainersignup"> login
                                                    <a href={Utils.getTrainerURL(`login`)}><div className="icon">
                                                    </div></a>
                                                </div> */}
                        </strong>
                      </div>
                    )}
                    {error !== false && (
                      <div className="alert alert-danger p-3">
                        <strong>{error}</strong>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input className="form-control" name="firstname" placeholder="First name*" type="text" required />
                          <div className="invalid-feedback">First Name is required!</div>
                        </div>
                        <div className="form-group">
                          <input className="form-control" name="middlename" placeholder="Middle name" type="text" />
                        </div>
                        <div className="form-group">
                          <input className="form-control" name="lastname" placeholder="Last name*" type="text" required />
                          <div className="invalid-feedback">Last name is required!</div>
                        </div>
                        <div className="form-group downArrow">
                          <input className="form-control" name="country" placeholder="country*" type="text" required />
                          <div className="invalid-feedback">Country name is required!</div>
                        </div>
                        <div className="form-group">
                          <input className="form-control" name="address" placeholder="Address" type="text" />
                        </div>
                        <div className="form-group width50">
                          <input className="form-control" name="zipcode" placeholder="Pin Code" type="text" />
                        </div>
                        <div className="form-group width50 width50R downArrow">
                          <input className="form-control" name="state" placeholder="State" type="text" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <input className="form-control" name="mobile" placeholder="Phone*" type="number" required />
                          <div className="invalid-feedback">Phone number is required!</div>
                        </div>
                        <div className="form-group">
                          <input className="form-control" name="email" placeholder="Email*" type="email" required />
                          <div className="invalid-feedback">Enter your valid email address!</div>
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="password"
                            onKeyUp={validatePassword}
                            placeholder="Password*"
                            type="password"
                            required
                          />
                          <div className="invalid-feedback">Invalid Password</div>
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="conf_password"
                            onKeyUp={validatePassword}
                            placeholder="Re-enter Password"
                            type="password"
                            required
                          />
                          <div className="invalid-feedback">Passwords Don't Match</div>
                        </div>
                        <div className="form-group">
                          <input type="hidden" name="role" value="3" />
                        </div>
                        <button type="submit" className="trainersignup">
                          {" "}
                          Sign Up
                          <div className="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24">
                              <path d="M0 0h24v24H0z" fill="none"></path>
                              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                            </svg>
                          </div>
                        </button>
                        <p>By signing up, you agree to our Terms of Use and Privacy Policy.</p>
                        <p>
                          Already have an account?{" "}
                          <a href="" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">
                            Log In
                          </a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinAsStudent;
