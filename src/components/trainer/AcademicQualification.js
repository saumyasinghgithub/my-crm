import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import TrainerContext from './../../contexts/TrainerContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';


const AcademicQualification = (props) => {


  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {myCalibs,saveCalibs} = useContext(TrainerContext);
  const [content,setContent] = useState("");
  let curYear = new Date().getFullYear();
  const onContentChange = (e) => {
    setContent(e.target.value);
  }


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
  let yesrList = (new Array(50)).fill(1).map((v,k) => <option value={2022-50+k}>{2022-50+k}</option>);

  console.log(yesrList);
  return <Form onSubmit={onSave}>
    
    <Row>
      <Col md={12} className="mt-3"><h1>Academic Qualification</h1></Col>
      <Col md={6} className="mt-3"><Form.Control type="name" placeholder="Enter your name" /></Col>
      <Col md={6} className="mt-3"><Form.Control type="email" placeholder="Enter your email" /></Col>
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

export default AcademicQualification;