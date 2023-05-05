import React, { useRef, useState, useContext } from "react";
import Utils from "../../Utils";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import UserContext from "./../../contexts/UserContext";

const TeacherSubscribe = (props) => {
  const { apiHeaders } = useContext(UserContext);
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  const frmRef = useRef("SubscribeForm");
  const { token } = useParams();
  const inLine = props.type;
  const [error, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const trainerSlug = Utils.getUserData().slug;
  const trainerUrl = Utils.getTrainerURL("", trainerSlug);

  const onSave = (event) => {
    const frm = frmRef.current;
    event.preventDefault();
    frm.classList.add("was-validated");
    if (frm.checkValidity() === false) {
      return false;
    }
    setError(false);
    setShowMessage(false);
    let frmdata = new FormData(frm);
    axios.post(Utils.apiUrl("trainer/subscribers"), frmdata, apiHeaders({ token: token })).then((res) => {
      if (res.data.success) {
        setShowMessage(res.data.message);
      } else {
        axios
          .post(Utils.apiUrl(`trainer/subscribe`), frmdata, apiHeaders({ token: token }))
          .then((res) => {
            if (res.data.success) {
              setShowMessage(res.data.message);
            } else {
              throw res.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      {inLine ? (
        <div class="container landingUpEvent">
          <div class="SubsTextBox">
            <div class="SubsInputBox">
              <form
                noValidate
                ref={frmRef}
                id="subscription-form"
                onSubmit={onSave}
                method="post"
                className="form contact alertdesign needs-validation"
              >
                <div className="row">
                  <div className="col-md-5 col-md-offset-3 contactSubs">
                    <input type="hidden" name="trainerUrl" value={trainerUrl} />
                    <input
                      name="email"
                      id="email"
                      placeholder="Please enter your email here for subscription"
                      title="Email"
                      className="input-text form-control landingpageInput p-3"
                      type="email"
                      required
                    />
                    <div className="invalid-feedback">Email address is required!</div>
                    <p>
                      <b>{showMessage}</b>
                    </p>
                  </div>
                  <div className="col-md-2 col-md-offset-2 contactSubs">
                    <div class="HomeRegister SubmitHomeSubscribe">
                      {" "}
                      <Button color="secondary" type="submit">
                        SUBSCRIBE
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Subscription</ModalHeader>
          <form
            noValidate
            id="subscription-form-modal"
            ref={frmRef}
            onSubmit={onSave}
            method="post"
            className="form contact alertdesign needs-validation"
          >
            <ModalBody>
              <p>Subscribe to our newsletter and be the first to know about new courses, special offers, and events!</p>
              <p>To sign up, simply enter your email address below and click "Subscribe".</p>
              <p>
                By subscribing, you agree to receive occasional marketing emails from us. We promise not to spam you, and you can unsubscribe at any
                time.
              </p>
              <p>
                <b>{showMessage}</b>
              </p>
              <FormGroup>
                <input type="hidden" name="trainerUrl" value={trainerUrl} />
                <input
                  name="email"
                  id="email"
                  placeholder="Please enter your email here for subscription"
                  title="Email"
                  className="input-text form-control landingpageInput p-3"
                  type="email"
                  required
                />
                <div className="invalid-feedback">Email address is required!</div>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" type="submit">
                Subscribe
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TeacherSubscribe;
