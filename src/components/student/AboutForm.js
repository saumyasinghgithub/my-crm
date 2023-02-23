import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import Utils from './../../Utils';
import _ from 'lodash';


const AboutForm = (props) => {

  const [myabout, setMyabout] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);

  const onContentChange = (fld) => (value) => {
    let c = {...myabout};
    c[fld] = value;
    setMyabout(c);
  }

  useEffect(() => {
    getServerData('student/my-about')
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
    setSaving(true);
    setServerData('student/my-about',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }

  const photoUploader = (fld,title) => {
    return <>
      <Form.Label>{title}</Form.Label>
      <Form.Control type="file" size="lg" name={fld+'_image'} accept=".jpeg,.png,.PNG,.jpg;" />
      <div className="text-center">{!_.isEmpty(_.get(myabout,fld+'_image','')) && <img src={`${process.env.REACT_APP_API_URL}/uploads/student/${fld}/${myabout[fld+'_image']}`} className="thumbnail mt-3" />}</div>
    </>;
  }

  return <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(myabout,'id','')} />
    <Form.Control type="hidden" name="old_profile_image" defaultValue={_.get(myabout,'profile_image','')} />
    <Form.Control type="hidden" name="old_base_image" defaultValue={_.get(myabout,'base_image','')} />
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
        <Form.Label>Industry: </Form.Label>
        <Form.Control as="select" name="industry">
            <option value=""> - Select Industry - </option>
            {Utils.industries.map(v => <option key={v} value={v} selected={_.get(myabout, 'industry','')===v}>{v}</option>)}
          </Form.Control>
      </Col> 
      <Col md={6} className="mt-3">
        <Form.Label>Qualification: </Form.Label>
        <Form.Control as="select" name="qualification">
            <option value=""> - Select Qualification - </option>
            {Utils.academicQualifications.map(v => <option key={v} value={v} selected={_.get(myabout,`qualification`,'')===v}>{v}</option>)}
          </Form.Control>
      </Col> 
    </Row>

    <Row>
      <Col md={6} className="mt-3">
        <Form.Label>Interested Field: </Form.Label>
        <Form.Control as="select" name="interested_field">
            <option value=""> - Select Interested Field - </option>
            {Utils.interestedField.map(v => <option key={v} value={v} selected={_.get(myabout,`interested_field`,'')===v}>{v}</option>)}
          </Form.Control>
      </Col> 
      <Col md={6} className="mt-3">
        <Form.Label>Country: </Form.Label>
        <Form.Control as="select" name="country">
            <option value=""> - Select Country - </option>
            {Utils.countryList.map(v => <option key={v} value={v} selected={_.get(myabout,`country`,'')===v}>{v}</option>)}
          </Form.Control>
      </Col> 
    </Row>
    

    <Row>  
      <Col md={6} className="mt-3">  
        {photoUploader('profile','Upload Large Profile Pic (Image dimension should be 360cm x 260cm)')}
      </Col>
      <Col className="mt-3">{photoUploader('base','Upload Base Profile Pic (Image dimension should be 100cm x 100cm)')}</Col>
      </Row>
      <Row>
      <Col md={12} className="mt-3">  
      <Form.Label>Student Profile Details: </Form.Label>
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
        <Form.Label>LinkedIn Profile URL: </Form.Label>
        <Form.Control type="text" name="linkedin" placeholder="Enter your LinkedIn Profile URL" defaultValue={_.get(myabout,'linkedin','')} />
      </Col>
      <Col md={6} className="mt-3">
        <Form.Label>Facebook Profile URL: </Form.Label>
        <Form.Control type="text" name="facebook" placeholder="Enter your Facebook Profile URL" defaultValue={_.get(myabout,'facebook','')} />
      </Col>
    </Row>
    <Row>
      <Col md={6} className="mt-3">
        <Form.Label>Youtube Profile URL: </Form.Label>
        <Form.Control type="text" name="youtube" placeholder="Enter your Youtube Profile URL" defaultValue={_.get(myabout,'youtube','')} />
      </Col>
      <Col md={6} className="mt-3">
        <Form.Label>Twitter Profile URL: </Form.Label>
        <Form.Control type="text" name="twitter" placeholder="Enter your Twitter Profile URL" defaultValue={_.get(myabout,'twitter','')} />
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