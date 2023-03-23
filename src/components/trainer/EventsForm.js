import { useEffect, useContext, useState } from "react";
import _ from "lodash";
import { Form, Alert, Spinner, Row, Col, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import UserContext from "../../contexts/UserContext";
import Utils from "./../../Utils";
import { Editor } from "@tinymce/tinymce-react";
const EventsForm = (props) => {
    const [eventData, setEventData] = useState([]);
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
                    data = [...data, { id: 0, event_img: "", event_short_desc: "",featured:"" }];
                }
                console.log(data);
                setEventData(data);
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
        let newdata = [...eventData, { id: 0, event_img: "", event_short_desc: "",featured:"" }];
        setEventData(newdata);
    };
    const removeAData = (pos) => (e) => {
        let newdata = [...eventData];
        newdata.splice(pos, 1);
        setEventData(newdata);
    };
    const saveAData = (pos, attr) => (e) => {
        let newdata = [...eventData];
        _.set(newdata, `${pos}${attr}`, attr === "year" ? parseInt(e.currentTarget.value) : e.currentTarget.value);
        setEventData(newdata);
    };
    const renderEventFields = () => {
        return (
            <>
                {eventData.map((v, k) => (
                    <Accordion defaultActiveKey={[eventData.length - 1]} alwaysOpen={true}>
                        <Row>
                            <Accordion.Item eventKey={k} className="my-1 hide" style={{ backgroundColor: k % 2 === 0 ? "#ddf4f4" : "#f8f8f8" }}>
                                <Accordion.Header className="mb-0">
                                    <strong>Event {k + 1} </strong>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col className="col-3 py-3">
                                            <Form.Check                                                
                                                type="checkbox"
                                                label={`Featured Event`}
                                                name={`featured`}
                                                value={_.get(eventData, `${k}.featured`, "")}
                                            />
                                        </Col>
                                        <Col className="col-3 py-9">
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Control type="hidden" name={`id`} value={_.get(eventData, `${k}.id`, "")} />
                                        <Col className="col-6 py-3">{photoUploader("event", "Upload Large Event Image (1236px by 450px)", k)}</Col>

                                        <Col className="col-6 py-3">
                                            <Form.Label>Event Text</Form.Label>
                                            <Editor apiKey={process.env.TINYMCE_API_KEY}
                                                value={_.get(eventData, `${k}.event_short_desc`, "")}
                                                init={{
                                                    height: 200,
                                                    menubar: false,
                                                }}
                                                onEditorChange={saveAData(_.get(eventData, `${k}.event_short_desc`, ""))}
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
    const onSave = (e) => {
        const frm = e.currentTarget;
        e.preventDefault();
        let frmdata = new FormData(frm);
        setSaving(true);
        setServerData("trainer/imageevents", frmdata).then((res) => {
            setSaving(false);
            setResponse(res);
            setLastinsertid(res.insertId);
        });
    };
    return (
        <>
            <Form onSubmit={onSave}>
                <Form.Control type="hidden" name="user_id" value={trainerDetails.id} />
                <Form.Control type="hidden" name="created_at" value={Date().toLocaleString()} />
                <h1>
                    Manage Events<i className="fa fa-plus-circle text-success Adddetails" onClick={addAData} />
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
