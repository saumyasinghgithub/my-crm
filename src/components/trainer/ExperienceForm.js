import { useEffect, useContext, useState } from "react";
import { Form, Alert, Spinner, Row, Col, Button } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import { Editor } from "@tinymce/tinymce-react";
import _ from "lodash";
import Utils from "./../../Utils";
import moment from "moment";

const ExperienceForm = (props) => {
  const [count, setCount] = useState(4);
  const [expData, setExpData] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { getServerData, setServerData } = useContext(UserContext);
  const [content, setContent] = useState("");
  let curYear = new Date().getFullYear();
  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    getServerData("trainer/my-exp")
      .then(setExpData)
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCount(_.max([4, expData.length]));
  }, [expData]);

  useEffect(window.scrollEffect, []);

  useEffect(() => {
    window.setTimeout(() => setResponse({ message: "" }), 5000);
  }, [response]);

  const addEData = (e) => {
    let newdata = [...expData, { company: "", location: "" }];
    setExpData(newdata);
  };

  const removeEData = (pos) => (e) => {
    let newdata = [...expData];
    newdata.splice(pos, 1);
    setExpData(newdata);
  };

  const saveEData = (pos, attr) => (e) => {
    let newdata = [...expData];
    newdata[pos][attr] = e.currentTarget.value;
    setExpData(newdata);
  };

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    setServerData("trainer/my-exp", frmdata).then((res) => {
      setSaving(false);
      setResponse(res);
    });
  };

  const renderExpFields = () => {
    let year = 0;
    return (
      <>
        {new Array(count).fill(1).map((v, k) => (
          <Row key={k}>
            <Col md={8} className="mt-3">
              <Form.Control
                type="text"
                name="company"
                placeholder="Enter your Company Name"
                value={_.get(expData, `${k}.company`, "")}
                onChange={saveEData(k, "company")}
              />
            </Col>
            <Col md={3} className="mt-3">
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter your Company Location"
                value={_.get(expData, `${k}.location`, "")}
                onChange={saveEData(k, "location")}
              />
            </Col>
            <Col md={1} className="mt-3">
              {k > 3 && (
                <i
                  className="fa fa-minus-circle fa-lg text-danger mt-2 cursor-pointer"
                  onClick={removeEData(k)}
                />
              )}
            </Col>
          </Row>
        ))}
      </>
    );
  };

  return (
    <Form onSubmit={onSave}>
      <h1>
        Experience Qualification{" "}
        <i
          className="fa fa-plus-circle text-success Adddetails"
          onClick={addEData}
        />
      </h1>

      {count > 0 && renderExpFields()}

      <Row>
        <Col md={12} className="text-right">
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
};

export default ExperienceForm;
