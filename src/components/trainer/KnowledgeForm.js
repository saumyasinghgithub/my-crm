import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button, Badge} from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';


const KnowledgeForm = (props) => {

  const [myknowledge, setmyknowledge] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);

  const onContentChange = (fld) => (value) => {
    let c = {...myknowledge};
    c[fld] = value;
    setmyknowledge(c);
  }

  useEffect(() => {
    getServerData('trainer/my-knowledge')
    .then(setmyknowledge)
    .catch(err => console.log(err));
  },[]);
  useEffect(window.scrollEffect,[]);

  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);
  

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    frmdata.append('about_knowledge',_.get(myknowledge,'about_knowledge',''));
    setSaving(true);
    setServerData('trainer/my-knowledge',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }

  const photoUploader = (fld,title) => {
    return <>
      <Form.Label>{title}</Form.Label>
      <Form.Control type="file" size="lg" name={fld+'_image'} accept=".jpeg,.png,.jpg;" />
      <div className="text-center">{!_.isEmpty(_.get(myknowledge,fld+'_image','')) && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${myknowledge[fld+'_image']}`} className="thumbnail mt-3" />}</div>
    </>;
  }

  return <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(myknowledge,'id','')} />
    <Form.Control type="hidden" name="old_knowledge_image" defaultValue={_.get(myknowledge,'knowledge_image','')} />
    <h1>Trainer Knowledge</h1>

    <Row>  
      <Col md={3} className="mt-3">  
        {photoUploader('knowledge','Upload image here (Image dimension should be 691cm x 494cm)')}
      </Col>
      <Col md={9} className="mt-3">  
      <Form.Label>Trainer knowledge Details: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(myknowledge,'about_knowledge','')}
        init={{
        height: 200,
        menubar: false,
        }}
        onEditorChange={onContentChange('about_knowledge')}
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

export default KnowledgeForm;