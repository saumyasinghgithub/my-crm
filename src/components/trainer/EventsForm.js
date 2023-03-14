import { useEffect, useContext, useState } from 'react';
import { Form, Alert, Spinner, Row, Col, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';
const EventsForm = (props) => {
    const [eventData, setEventData] = useState([]);
    const [saving, setSaving] = useState(false);
    const [response, setResponse] = useState({ success: false, message: "" });
    const addAData = (e) => {
        let newdata = [...eventData, { year: "", award: "" }];
        setEventData(newdata);
    };
    const removeAData = (pos) => (e) => {
        let newdata = [...eventData];
        newdata.splice(pos, 1);
        setEventData(newdata);
    };
    const photoUploader = (fld, title) => {
        return <>
            <Form.Label>{title}</Form.Label>
            <Form.Control type="file" size="lg" name={fld + '_image'} accept=".jpeg,.png,.PNG,.jpg;" />
            <div className="text-center">{!_.isEmpty(_.get(eventData, fld + '_image', '')) && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${eventData[fld + '_image']}`} className="thumbnail mt-3" />}</div>
        </>;
    }
    const onContentChange = (fld) => (value) => {
        let c = { ...eventData };
        c[fld] = value;
        setEventData(c);
    }
    const renderEventsFields = () => {
        return (
            <>
                {eventData.map((v, k) => (
                    <Accordion defaultActiveKey={[0]} alwaysOpen>
                        <Row>
                            <Accordion.Item eventKey={k}
                                className="my-1"
                                style={{ backgroundColor: k % 2 === 0 ? "#ddf4f4" : "#f8f8f8" }}>
                                <Accordion.Header className="mb-0"><strong>Events {k + 1} </strong></Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col md={12} className="mt-3 mb-3">
                                            {photoUploader('events', 'Upload Large Event Image (Image dimension should be 360cm x 260cm)')}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="mt-3">
                                            <Form.Label>Event Short Description: </Form.Label>
                                            <Editor apiKey={process.env.TINYMCE_API_KEY}
                                                value={_.isEmpty(_.get(eventData, 'event_short_desc', '')) ? '' : eventData.event_short_desc}
                                                init={{
                                                    height: 200,
                                                    menubar: false,
                                                }}
                                                toolbar='undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl | code'
                                                menubar="tools"
                                                plugins='code'
                                                onEditorChange={onContentChange('event_short_desc')}
                                            />
                                        </Col>
                                        <Col md={12} className="mt-3">
                                            <Form.Label>Registration Link: </Form.Label>
                                            <Form.Control type="text" name="registration_link" placeholder="Enter your event registration link" defaultValue={_.get(eventData, 'registration_link', '')} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="mt-3 text-right">
                                            {saving && <>Saving.. <Spinner animation="border" /></>}
                                            {!saving && response.message === "" && <Button type="submit" className="profile-save">Save</Button>}
                                            {!saving && response.message !== "" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                            <i
                                className="fa fa-minus-circle fa-lg mt-2 cursor-pointer text-danger remove-award"
                                onClick={removeAData(k)}
                            />
                        </Row>
                    </Accordion>
                ))}
            </>
        );
    }
    return (
        <>
            <h1>Manage Events<i
                className="fa fa-plus-circle text-success Adddetails"
                onClick={addAData}
            /></h1>
            {renderEventsFields()}
        </>
    );
}
export default EventsForm;