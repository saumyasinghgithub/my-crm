import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import CourseContext from './../../contexts/CourseContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';


const CourseForm = (props) => {

  const [mycourse, setMycourse] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getMyData,setMyData} = useContext(CourseContext);

  const onContentChange = (fld) => (value) => {
    let c = {...mycourse};
    c[fld] = value;
    setMycourse(c);
  }

  useEffect(() => {
    getMyData('trainer/my-course')
    .then(setMycourse)
    .catch(err => console.log(err));
  },[]);
  useEffect(window.scrollEffect,[]);

  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);
  

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    frmdata.append('biography',_.get(mycourse,'biography',''));
    frmdata.append('certificate',_.get(mycourse,'certificates',''));
    frmdata.append('trainings',_.get(mycourse,'trainings',''));
    setSaving(true);
    setMyData('trainer/my-course',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }

  const photoUploader = (fld,title) => {
    return <>
      <Form.Label>{title}</Form.Label>
      <Form.Control type="file" size="lg" name={fld} accept=".jpeg,.png,.jpg;" />
    </>;
  }

  return <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(mycourse,'id','')} />
    <Form.Control type="hidden" name="old_award_image" defaultValue={_.get(mycourse,'award_image','')} />
    <Form.Control type="hidden" name="old_profile_image" defaultValue={_.get(mycourse,'profile_image','')} />
    <h1>Course Create</h1>
    <Row>
      <Col md={4} className="mt-3">
        <Form.Label>First Name: </Form.Label>
        <Form.Control type="text" name="firstname" placeholder="Enter your first name" defaultValue={_.get(mycourse,'firstname','')} />
      </Col>
      <Col md={4} className="mt-3">
        <Form.Label>Middle Name: </Form.Label>
        <Form.Control type="text" name="middlename" placeholder="Enter your middle name" defaultValue={_.get(mycourse,'middlename','')} />
      </Col>
      <Col md={4} className="mt-3">
        <Form.Label>last Name: </Form.Label>
        <Form.Control type="text" name="lastname" placeholder="Enter your last name" defaultValue={_.get(mycourse,'lastname','')} />
      </Col>
    </Row>

    <Row>  
      <Col md={3} className="mt-3">  
        {photoUploader('profile_image','Upload Profile Pic')}
      </Col>
      <Col md={9} className="mt-3">  
      <Form.Label>Biography: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(mycourse,'biography','')}
        init={{
        height: 200,
        menubar: false,
        }}
        onEditorChange={onContentChange('biography')}
        />
        </Col>
    </Row>
    
    <Row>  
      <Col md={3} className="mt-3">  
        {photoUploader('award_image','Upload Award Certifications')}
      </Col>
      <Col md={9} className="mt-3">  
      <Form.Label>Describe your awards: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(mycourse,'certificates','')}
        init={{
        height: 200,
        menubar: false,
        }}
        onEditorChange={onContentChange('certificates')}
        />
        </Col>
    </Row>

    <Row>  
      <Col md={12} className="mt-3">  
      <Form.Label>Trainings Conducted: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(mycourse,'trainings','')}
        init={{
        height: 200,
        menubar: false,
        }}
        onEditorChange={onContentChange('trainings')}
        />
        </Col>
    </Row>

    <Row>
      <Col md={12} className="mt-3 text-right">
        {saving && <>Saving.. <Spinner animation="border" /></>}
        {!saving && response.message==="" && <Button type="submit" className="profile-save">Save</Button>}
        {!saving && response.message!=="" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
      </Col>
    </Row>
  
  </Form>

};

export default CourseForm;