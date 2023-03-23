import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Utils from "../../Utils";
import { Button, Modal, Form, Alert, Spinner } from "reactstrap";
import _ from "lodash";
const RegisterForm = (props) => {
  const slug = Utils.subdomain();
  const { setServerData } = useContext(UserContext);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { eventData, formType } = props;

  console.log(props);

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    frmdata.append("type", formType);
    if (formType === "event") {
      frmdata.append("trainer_event_id", eventData.id);
    }
    setSaving(true);
    setServerData("trainer/event-participant", frmdata, "post").then((res) => {
      setSaving(false);
      setResponse(res);
    });
  };
  return (
    <>
      <Modal.Header className="justify-content-center" closeButton>
        <Modal.Title>
          <div className="UpEventText text-center">
            <h3>EVENT PARTICIPATION</h3>
            <h4 dangerouslySetInnerHTML={{ __html: eventData.event_short_desc }}></h4>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mt-3">
        Please complete the form to register for the event.
        <br></br>
        <Form onSubmit={onSave}>
          <Form.Group className="mt-3 mb-2">
            <Form.Control name="name" type="text" placeholder="Enter Name *" required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control name="email" type="email" placeholder="Enter Email *" required />
          </Form.Group>
          <div className="HomeRegister JoinButtonModal">
            {!saving && response.message === "" && (
              <Button type="submit" className="mt-5 w-100 text-left">
                Register
              </Button>
            )}

            {!saving && response.message !== "" && (
              <Alert variant={response.success ? "info" : "danger"} className="p-3 mt-2 text-center">
                {response.message}
              </Alert>
            )}

            {saving && (
              <>
                Saving.. <Spinner animation="border" />
              </>
            )}
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};
export default RegisterForm;
