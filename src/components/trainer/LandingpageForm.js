import React, { useState } from 'react';
import { Form, Alert, Spinner, Row, Col, Button } from 'react-bootstrap';
import { Editor } from "@tinymce/tinymce-react";
const LandingpageForm = () => {
    const [myLandingsettings, setMylandingsettings] = useState({});
    const [saving, setSaving] = useState(false);
    const [response, setResponse] = useState({ success: false, message: "" });
    const onContentChange = (fld) => (value) => {
        let c = { ...myLandingsettings };
        c[fld] = value;
        setMylandingsettings(c);
    }
    return (
        <>
            <h1>Landing Page Settings</h1>
            <Row>
                <Col md={12} className="mt-3">
                    <Form.Label>Trainer Video Embed Code: </Form.Label>
                    <Form.Control type="text" name="firstname" placeholder="Embed Code" defaultValue={_.get(myLandingsettings, 'firstname', '')} />
                </Col>
                <Col md={12}>
                    <Form.Label>Trainer Objective: </Form.Label>
                    <Editor apiKey={process.env.TINYMCE_API_KEY}
                        value={_.isEmpty(_.get(myLandingsettings, 'biography', '')) ? '' : myLandingsettings.biography}
                        init={{
                            height: 200,
                            menubar: false,
                        }}
                        toolbar='undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl | code'
                        menubar="tools"
                        plugins='code'
                        onEditorChange={onContentChange('biography')}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12} className="mt-3 text-right">
                    {saving && <>Saving.. <Spinner animation="border" /></>}
                    {!saving && response.message === "" && <Button type="submit" className="profile-save">Save</Button>}
                    {!saving && response.message !== "" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
                </Col>
            </Row>
        </>
    );
}
export default LandingpageForm;