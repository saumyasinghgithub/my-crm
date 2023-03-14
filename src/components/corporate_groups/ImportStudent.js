import { useEffect, useContext, useState } from "react";
import { Form, Alert, Spinner, Row, Col, Button, Modal } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import { Editor } from "@tinymce/tinymce-react";
import _ from "lodash";
import Utils from "../../Utils";

const ImportStudent = (props) => {
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { setServerData } = useContext(UserContext);

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    setServerData("corporate/import", frmdata).then((res) => {
      setSaving(false);
      //setResponse(res);
      props.onSave();
      props.onClose();
    });
  };

  const renderForm = () => (
    <Form onSubmit={onSave}>
      <Form.Control type="hidden" name="cg_id" value={_.get(props, "id", "")} />

      <Form.Label>Import Students:</Form.Label>

      <div className="alert alert-warning p-4">
        Only CSV file should be uploaded for processing. <br />
        <a
          target="_blank"
          className="text-info mx-2"
          href="/assets/sample-data/student-import.csv"
        >
          Download Sample file <i className="fa fa-download"></i>
        </a>
      </div>

      <Form.Control type="file" name="csv" accept="text/csv" />

      <Row>
        <Col md={12} className="mt-3 text-right">
          {saving && (
            <>
              Saving.. <Spinner animation="border" />
            </>
          )}
          {!saving && response.message === "" && (
            <Button type="submit" className="profile-save">
              Import
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
    <Modal show={true} size="lg" onHide={_.get(props, "onClose", "")}>
      <Modal.Header closeButton>
        <Modal.Title>Import into {props.name}</Modal.Title>
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

export default ImportStudent;
