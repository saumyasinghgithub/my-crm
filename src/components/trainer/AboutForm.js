import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import TrainerContext from './../../contexts/TrainerContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';


const AboutForm = (props) => {

  
  const [pa,setPA] = useState([]);
  const [myc, setMyc] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getProfileAttributes} = useContext(UserContext);
  const {myCalibs,saveCalibs} = useContext(TrainerContext);
  const [content,setContent] = useState("");
  
  const onContentChange = (e) => {
    setContent(e.target.value);
  }

  useEffect(() => {
    getProfileAttributes()
    .then(setPA)
    .then(myCalibs)
    .then(setMyc)
    .catch(err => console.log(err));
  },[]);
  useEffect(window.scrollEffect,[]);

  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);
  

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    saveCalibs(frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }

  return <Form onSubmit={onSave}>
    
    <Row>
      <Col md={12} className="mt-3"><h1>Trainer Attribute Details</h1></Col>
      <Col md={6} className="mt-3"><Form.Control type="name" placeholder="Enter your name" /></Col>
      <Col md={6} className="mt-3"><Form.Control type="email" placeholder="Enter your email" /></Col>
    </Row>
    <Row>  
      <Col md={12} className="mt-3">  
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={content}
        init={{
        height: 200,
        menubar: false,
        }}
        onChange={onContentChange}
        />
        <br />
        </Col>
    </Row>
    <Row>  
      <Col md={12} className="mt-3">  
      <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Upload Profile Pic</Form.Label>
            <Form.Control type="file" size="lg" name="profile"/>
      </Form.Group>
      </Col>
    </Row>
    <Row>  
      <Col md={12} className="mt-3">  
      <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Upload Award Certifications </Form.Label>
            <Form.Control type="file" size="lg" name="awards"/>
      </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md={12} className="text-right">
        {saving && <>Saving.. <Spinner animation="border" /></>}
        {!saving && response.message==="" && <Button type="submit" variant="warning">Save</Button>}
        {!saving && response.message!=="" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
      </Col>
    </Row>
  
  </Form>

};

export default AboutForm;