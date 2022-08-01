import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button, Badge} from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';


const CommunityForm = (props) => {

  const [mycommunity, setmycommunity] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);

  const onContentChange = (fld) => (value) => {
    let c = {...mycommunity};
    c[fld] = value;
    setmycommunity(c);
  }

  useEffect(() => {
    getServerData('trainer/my-community')
    .then(setmycommunity)
    .catch(err => console.log(err));
  },[]);
  useEffect(window.scrollEffect,[]);

  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);
  

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    frmdata.append('about_community',_.get(mycommunity,'about_community',''));
    setSaving(true);
    setServerData('trainer/my-community',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }

  const photoUploader = (fld,title) => {
    return <>
      <Form.Label>{title}</Form.Label>
      <Form.Control type="file" size="lg" name={fld+'_image'} accept=".jpeg,.png,.jpg;" />
      <div className="text-center">{!_.isEmpty(_.get(mycommunity,fld+'_image','')) && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${mycommunity[fld+'_image']}`} className="thumbnail mt-3" />}</div>
    </>;
  }

  return <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(mycommunity,'id','')} />
    <Form.Control type="hidden" name="old_community_image" defaultValue={_.get(mycommunity,'community_image','')} />
    <h1>Trainer Services</h1>

    <Row>  
      <Col md={3} className="mt-3">  
        {photoUploader('community','Upload image here')}
      </Col>
      <Col md={9} className="mt-3">  
      <Form.Label>Trainer Service Details: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(mycommunity,'about_community','')}
        init={{
        height: 200,
        menubar: false,
        }}
        onEditorChange={onContentChange('about_community')}
        />
        </Col>
    </Row>
    <Row>  
      <Col md={12} className="mt-3">  
      <Form.Label>Youtube Channel ID: </Form.Label>
        <Form.Control type="text" name="youtube_community" placeholder="Enter your youtube channel ID" defaultValue={_.get(mycommunity,'youtube_community','')} />
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

export default CommunityForm;