import React, { useEffect, useState, useContext, useRef } from "react";
import UserContext from "./../contexts/UserContext";
import Utils from "../Utils";

const Login = (props) => {
  const hasSubdomain = Utils.hasSubdomain();
  const [mode, setMode] = useState(1); // 1 = login ; 2 = forgot pass 
  //add loader on login page
  //new line for building code 
  //setting
  const searchParams = new URLSearchParams(window.location.search);

  const [fPassing, setFPassing] = useState({
    loading: false,
    success: true,
    message: "",
  });
  const [loginResp, setLoginResp] = useState({ success: false, message: "" });
  const [logining, setLogining] = useState(false);
  const { goLogin, goForgotPassword } = useContext(UserContext);

  const moodleFrm = useRef();

  const $ = window.$;

  useEffect(() => {
    $(".modal").on("show.bs.modal", function (e) {
      $(".modal .modal-dialog").attr(
        "class",
        "modal-dialog modal-full  zoomIn  animated"
      );
    });
    $(".modal").on("hide.bs.modal", function (e) {
      $(".modal .modal-dialog").attr(
        "class",
        "modal-dialog  zoomOut modal-full  animated"
      );
    });

    if (window.location.href.endsWith("/login") && !Utils.isLoggedIn()) {
      $("#loginModal").modal("show");
    }
  }, []);

  const onFPass = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    frm.classList.add("was-validated");
    if (frm.checkValidity() === false) {
      return false;
    }

    setFPassing({ ...fPassing, loading: true, message: "" });

    goForgotPassword(frm.email.value, ({ success, message }) => {
      setFPassing({ loading: false, success: success, message: message });
    });
    return false;
  };

  const onLogin = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    frm.classList.add("was-validated");
    if (frm.checkValidity() === false) {
      return false;
    }
    setLogining(true);

    setLoginResp({ ...loginResp, message: "" });

    const data = {
      email: frm.email.value,
      pass: frm.pass.value,
    };

    goLogin(data, (success, message) => {
      setLogining(false);
      setLoginResp({ success: success, message: message });
      if (success) {
        //loginToMoodle(data).then(() => window.location.reload());
        if (hasSubdomain) {
          var win = document.getElementById("mainDomainIframe").contentWindow;
          win.postMessage(Utils.getUserData(), "*");
        }
        var path = document.referrer;
        if (path) {
          window.location.replace(path);
        } else {
          var trainpath = Utils.getTrainerURL("");
          window.location.replace(trainpath);
        }
      }
    });
    return false;
  };

  const loginToMoodle = ({ email, pass }) => {
    return new Promise((resolve, reject) => {
      var frm = moodleFrm.current;
      frm.username.value = email;
      frm.password.value = pass;
      var options = "left=200000,top=0,width=0,height=0,visible=none";
      var wopen = window.open("", "_moodlewin", options);
      frm.setAttribute("target", "_moodlewin");
      frm.submit();
      window.setTimeout(() => {
        wopen.close();
        resolve();
      }, 2000);
    });
  };

  const toogleMode = (e) => {
    e.preventDefault();
    setMode(mode === 1 ? 2 : 1);
    setFPassing({ ...fPassing, message: "" });
  };

  return (
    <>
      <div className="modal-dialog modal-full">
        <div className="modal-content">
          <div className="overlay"></div>
          <form
            ref={moodleFrm}
            method="post"
            action={`${process.env.REACT_APP_MOODLE_URL}/login/index.php`}
          >
            <input type="hidden" name="username" />
            <input type="hidden" name="password" />
          </form>
          {logining && (
            <div className="alert alert-info p-5 m-5">
              Trying to login...
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="100"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          )}

          {fPassing.loading === true && (
            <div className="alert alert-info p-5 m-5">
              Sending your request to reset password...
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="100"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
          )}
          {!logining && !fPassing.loading && (
            <div className="loginWrapper">
              {mode === 1 && (
                <h3>
                  Log In to see <br /> the latest updates
                </h3>
              )}
              {mode === 2 && (
                <>
                  <h3>Forgot your password?</h3>
                  <h4>Fill your registered email with us to reset it!</h4>
                </>
              )}
              {loginResp.message !== "" && (
                <div
                  className={`alert alert-${
                    loginResp.success ? "info" : "danger"
                  } p-5`}
                >
                  {loginResp.message}
                  {loginResp.success && (
                    <div className="pt-3">Redirecting to your login area..</div>
                  )}
                </div>
              )}

              {fPassing.message !== "" && (
                <div
                  className={`alert alert-${
                    fPassing.success ? "warning" : "danger"
                  } p-5 m-5`}
                >
                  {fPassing.message}
                </div>
              )}

              {fPassing.message === "" && (
                <form
                  onSubmit={mode === 1 ? onLogin : onFPass}
                  className="needs-validation"
                  noValidate
                >
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      type="email"
                      required
                    />
                    <div className="invalid-feedback">
                      Enter your valid email address!
                    </div>
                  </div>
                  {mode === 1 && (
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="pass"
                        placeholder="Password"
                        type="password"
                      />
                    </div>
                  )}
                  <button type="submit" className="btn btnSubmit">
                    {mode === 1 && <>Log In</>}
                    {mode === 2 && <>Forgot Password</>}
                  </button>
                </form>
              )}

              {mode === 1 && (
                <>
                  <p>
                    Forgot password ?{" "}
                    <a href="" onClick={toogleMode}>
                      Click here!
                    </a>
                  </p>
                  <p>
                    By signing up, you agree to our Terms of Use and Privacy
                    Policy.
                  </p>
                  <ul>
                    <li>
                      <a
                        href="#signUpStudent"
                        data-toggle="modal"
                        data-dismiss="modal"
                      >
                        Join as a Student
                      </a>
                    </li>
                  </ul>
                </>
              )}
              {mode === 2 && (
                <p>
                  <a href="" onClick={toogleMode}>
                    Click here
                  </a>{" "}
                  to Login!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
