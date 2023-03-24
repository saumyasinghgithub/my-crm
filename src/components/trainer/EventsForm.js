import { useEffect, useContext, useState } from "react";
import _ from "lodash";
import { Form, Alert, Spinner, Row, Col, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import UserContext from "../../contexts/UserContext";
import Utils from "./../../Utils";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
const EventsForm = (props) => {
  const [eventData, setEventData] = useState([]);
  const [featured, setFeatured] = useState(-1);
  const { getServerData, setServerData } = useContext(UserContext);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const [lastinsertid, setLastinsertid] = useState();

  const trainerDetails = Utils.getUserData();

  useEffect(() => {
    getServerData("trainer/events")
      .then((data) => {
        console.log("fetching data" + data);
        while (data.length < 2) {
          data = [...data, { id: 0, heading: "", sub_heading: "", event_on: "", event_img: "", event_short_desc: "", featured: 0, participants: 0 }];
        }
        setEventData(data);
        setFeatured(eventData.findIndex((v) => v.featured));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(window.scrollEffect, []);

  useEffect(() => {
    window.setTimeout(() => setResponse({ message: "" }), 5000);
  }, [response]);

  const photoUploader = (fld, title, k) => {
    const old_image = eventData[k].event_img;
    return (
      <>
        <Form.Label>{title}</Form.Label>
        <Form.Control type="file" size="lg" name={`${fld}_img_${k}`} accept=".jpeg,.png,.PNG,.jpg;" required={_.isEmpty(old_image)} />
        <Form.Control type="hidden" name={`old_${fld}_img`} value={old_image} />
        <div className="text-center">
          {!_.isEmpty(old_image) && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${old_image}`} className="thumbnail mt-3" />}
        </div>
      </>
    );
  };

  const addAData = (e) => {
    let newdata = [
      ...eventData,
      { id: 0, heading: "", sub_heading: "", event_on: "", event_img: "", event_short_desc: "", featured: 0, participants: 0 },
    ];
    setEventData(newdata);
  };
  const removeAData = (pos) => (e) => {
    let newdata = [...eventData];
    newdata.splice(pos, 1);
    setEventData(newdata);
  };

  const onContentChange = (pos, attr) => (value) => {
    let newdata = [...eventData];
    _.set(newdata, `${pos}.${attr}`, value);
    setEventData(newdata);
  };

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    eventData.forEach((d) => frmdata.append("event_short_desc", d.event_short_desc));

    setSaving(true);
    setServerData("trainer/events", frmdata).then((res) => {
      setSaving(false);
      setResponse(res);
      setLastinsertid(res.insertId);
    });
  };

  const exportParticipants = (type, id = "") => {};

  const renderEventFields = () => {
    return (
      <>
        {eventData.map((v, k) => (
          <Accordion defaultActiveKey={[eventData.length - 1]} alwaysOpen={true}>
            <Row>
              <Accordion.Item eventKey={k} className="my-1 hide" style={{ backgroundColor: k % 2 === 0 ? "#ddf4f4" : "#f8f8f8" }}>
                <Accordion.Header className="mb-0">
                  <strong>Event {k + 1} </strong>
                  {v.participants > 0 && (
                    <button className="btn btn-sm btn-info ml-2 p-1" onClick={exportParticipants("event", v.id)}>
                      Export Participants ({v.participants}) <span className="fa fa-file-excel"></span>
                    </button>
                  )}
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col className="col-3 py-3">
                      <Form.Check
                        type="radio"
                        label={`Featured Event`}
                        name="featured"
                        value={k}
                        defaultChecked={_.get(eventData, `${k}.featured`, 0)}
                      />
                    </Col>
                    <Col className="col-3 py-9"></Col>
                  </Row>
                  <Row>
                    <Form.Control type="hidden" name={`id`} value={_.get(eventData, `${k}.id`, "")} />
                    <Col className="col-12 py-3">
                      <Form.Label>Event Heading *</Form.Label>
                      <Form.Control
                        type="text"
                        name={`heading`}
                        defaultValue={_.get(eventData, `${k}.heading`, "")}
                        placeholder="Enter Heading *"
                        required
                      />
                    </Col>
                    <Col className="col-8 py-3">
                      <Form.Label>Event Sub Heading *</Form.Label>
                      <Form.Control
                        type="text"
                        name={`sub_heading`}
                        defaultValue={_.get(eventData, `${k}.sub_heading`, "")}
                        placeholder="Enter Sub-Heading *"
                        required
                      />
                    </Col>

                    <Col className="col-4 py-3">
                      <Form.Label>Event Date *</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name={`event_on`}
                        defaultValue={moment(_.get(eventData, `${k}.event_on`, "")).format("YYYY-MM-DD HH:mm")}
                        required
                      />
                    </Col>

                    <Col className="col-6 py-3">{photoUploader("event", "Upload Large Event Image (1236px by 450px)", k)}</Col>

                    <Col className="col-6 py-3">
                      <Form.Label>Event Text</Form.Label>
                      <Editor
                        apiKey={process.env.TINYMCE_API_KEY}
                        value={_.get(eventData, `${k}.event_short_desc`, "")}
                        init={{
                          height: 200,
                          menubar: false,
                        }}
                        onEditorChange={onContentChange(k, "event_short_desc")}
                      />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              {k > 1 && <i className="fa fa-minus-circle fa-lg mt-2 cursor-pointer text-danger remove-award" onClick={removeAData(k)} />}
            </Row>
          </Accordion>
        ))}
      </>
    );
  };

  return (
    <>
      <Form onSubmit={onSave}>
        <Form.Control type="hidden" name="user_id" value={trainerDetails.id} />
        <Form.Control type="hidden" name="created_at" value={Date().toLocaleString()} />
        <h1>
          Manage Events
          <i className="fa fa-plus-circle text-success Adddetails" onClick={addAData} />
        </h1>
        {renderEventFields()}
        <Row>
          <Col md={12} className="m-3 text-right">
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
              <Alert variant={response.success ? "info" : "danger"} className="p-3 mt-2 text-center">
                {response.message}
              </Alert>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default EventsForm;
