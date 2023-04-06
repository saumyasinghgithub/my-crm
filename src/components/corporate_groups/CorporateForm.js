import { useEffect, useContext, useState } from "react";
import { Form, Alert, Spinner, Row, Col, Button, Modal } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import { Editor } from "@tinymce/tinymce-react";
import _ from "lodash";
import Utils from "../../Utils";

const CorporateForm = (props) => {
  const [mode, setMode] = useState("Add");

  const [myCG, setMyCG] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { getServerData, setServerData } = useContext(UserContext);

  const onContentChange = (fld) => (value) => {
    let c = { ...myCG };
    c[fld] = value;
    setMyCG(c);
  };

  useEffect(() => {
    if (_.get(props, "id", false)) {
      getServerData("corporate/my-corporates?where[id]=" + props.id)
        .then(setMyCG)
        .then(() => setMode("Update"))
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(window.scrollEffect, []);

  useEffect(() => {
    window.setTimeout(() => setResponse({ message: "" }), 5000);
  }, [response]);

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    frmdata.append("details", _.get(myCG, "details", ""));
    setSaving(true);
    setServerData("corporate/my-corporate", frmdata).then((res) => {
      setSaving(false);
      setResponse(res);
      props.onSave();
      props.onClose();
    });
  };

  const renderForm = () => (
    <Form onSubmit={onSave}>
      <Form.Control
        type="hidden"
        name="id"
        defaultValue={_.get(myCG, "id", "")}
      />

      <Row>
        <Col md={12} className="mt-3">
          <Form.Label>Corporate Name: </Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Corporate Name"
            defaultValue={_.get(myCG, "name", "")}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mt-3">
          <Form.Label>Details: </Form.Label>
          <Editor
            apiKey={process.env.TINYMCE_API_KEY}
            value={_.get(myCG, "details", "")}
            init={{
              height: 200,
              menubar: false,
            }}
            toolbar="undo redo | bold italic underline strikethrough | code | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
            plugins="code"
            onEditorChange={onContentChange("details")}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mt-3 text-right">
          {saving && (
            <>
              Saving.. <Spinner animation="border" />
            </>
          )}
          {!saving && response.message === "" && (
            <Button type="submit" className="profile-save">
              Save
            </Button>
          )}
          {!saving && response.message !== "" && (
            <Alert
              variant={response.success ? "info" : "danger"}
              className="p-3 mt-2 text-center"
            >
              {response.message}
            </Alert>
          )}
        </Col>
      </Row>
    </Form>
  );

  const renderModal = () => (
    <Modal show={true} size="xl" onHide={_.get(props, "onClose", "")}>
      <Modal.Header closeButton>
        <Modal.Title>{mode} Corporate </Modal.Title>
      </Modal.Header>

      <Modal.Body>{renderForm()}</Modal.Body>
    </Modal>
  );

  return (
    <>
      {props.type !== "modal" && renderForm()}
      {props.type === "modal" && renderModal()}
    </>
  );
};

export default CorporateForm;
