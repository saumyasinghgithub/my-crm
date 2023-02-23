import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';

function Preview({ formData }) {
  return (
    <div>
      <h2>Preview</h2>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Message: {formData.message}</p>
    </div>
  );
}

const AboutForm = (props) => {

  const [myabout, setMyabout] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);
  const [showPreview, setShowPreview] = useState(false);

  const onContentChange = (fld) => (value) => {
    let c = {...myabout};
    c[fld] = value;
    setMyabout(c);
  }

  useEffect(() => {
    getServerData('trainer/my-about')
    .then(setMyabout)
    .catch(err => console.log(err));
  },[]);
  useEffect(window.scrollEffect,[]);

  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);
  
  

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    frmdata.append('biography',_.get(myabout,'biography',''));
    frmdata.append('trainings',_.get(myabout,'trainings',''));
    alert(JSON.stringify(frmdata));
    setSaving(true);
    setServerData('trainer/my-about',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }

  const photoUploader = (fld,title) => {
    return <>
      <Form.Label>{title}</Form.Label>
      <Form.Control type="file" size="lg" name={fld+'_image'} accept=".jpeg,.png,.PNG,.jpg;" />
      <div className="text-center">{!_.isEmpty(_.get(myabout,fld+'_image','')) && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${myabout[fld+'_image']}`} className="thumbnail mt-3" />}</div>
    </>;
  }

  return <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(myabout,'id','')} />
    <Form.Control type="hidden" name="old_award_image" defaultValue={_.get(myabout,'award_image','')} />
    <Form.Control type="hidden" name="old_profile_image" defaultValue={_.get(myabout,'profile_image','')} />
    <Form.Control type="hidden" name="old_base_image" defaultValue={_.get(myabout,'base_image','')} />
    <h1>About Me</h1>
    <Row>
      <Col md={4} className="mt-3">
        <Form.Label>First Name: </Form.Label>
        <Form.Control type="text" name="firstname" placeholder="Enter your first name" defaultValue={_.get(myabout,'firstname','')} />
      </Col>
      <Col md={4} className="mt-3">
        <Form.Label>Middle Name: </Form.Label>
        <Form.Control type="text" name="middlename" placeholder="Enter your middle name" defaultValue={_.get(myabout,'middlename','')} />
      </Col>
      <Col md={4} className="mt-3">
        <Form.Label>last Name: </Form.Label>
        <Form.Control type="text" name="lastname" placeholder="Enter your last name" defaultValue={_.get(myabout,'lastname','')} />
      </Col>
    </Row>
    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Trainer Profile URL: </Form.Label>
        <Form.Control type="text" name="slug" placeholder="Enter your slug" defaultValue={_.get(myabout,'slug','')} />
      </Col>
     
    </Row>

    <Row>  
      <Col md={6} className="mt-3">  
        {photoUploader('profile','Upload Large Profile Pic (Image dimension should be 360cm x 260cm)')}
      </Col>
      <Col md={6} className="mt-3">  
      <Form.Label>Biography: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.isEmpty(_.get(myabout,'biography','')) ? '' : myabout.biography}
        init={{
        height: 200,
        menubar: false,
        }}
        toolbar= 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl | code'
        menubar= "tools"
        plugins='code'
        onEditorChange={onContentChange('biography')}
        />
        </Col>
    </Row>
    
    <Row>  
      <Col md={6} className="mt-3">  
        {photoUploader('award','Upload Award Certifications (Image dimension should be 1900cm x 900cm)')}
      </Col>
      <Col md={6} className="mt-3">  
        {photoUploader('base','Upload Base Profile Pic (Image dimension should be 100cm x 100cm)')}
        </Col>
    </Row>

    <Row>  
      <Col md={12} className="mt-3">  
      <Form.Label>Trainings Conducted: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(myabout,'trainings','')}
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

export default AboutForm;