import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button, Modal} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';


const ContentForm = (props) => {

    const [mode, setMode] = useState('Add');

    const [mycourse, setMycourse] = useState({});
    const [saving, setSaving] = useState(false);
    const [response, setResponse] = useState({success: false, message: ""});
    const {getServerData,setServerData} = useContext(UserContext);

    const onContentChange = (fld) => (value) => {
      let c = {...mycourse};
      c[fld] = value;
      setMycourse(c);
    }
  
    useEffect(() => {
      getServerData('trainer/course-content')
      .then(setMycourse)
      .catch(err => console.log(err));
    },[]);


    useEffect(() => {
        if(_.get(props,'id',false)){
          getServerData('trainer/my-courses?id='+props.id)
          .then(setMycourse)
          .then(() => setMode('Update'))
          .catch(err => console.log(err));
        }
      },[]);
      useEffect(window.scrollEffect,[]);
    
      useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);

      const onSave = (e) => {
        const frm = e.currentTarget;
        e.preventDefault();
        let frmdata = new FormData(frm);
        setSaving(true);
        setServerData('trainer/course-content ',frmdata)
        .then(res => {
          setSaving(false);
          setResponse(res);
          props.onSave();
          props.onClose();
        })
      }
      const photoUploader = (fld,title) => {
        return <>
          <Form.Label>{title}</Form.Label>
          <Form.Control type="file" size="lg" name={fld} accept=".mp4,.fly,.MP4;" />
        </>;
      }
    const renderForm = () => <Form onSubmit={onSave}>
      <Form.Control type="hidden" name="course_id" defaultValue={_.get(mycourse,'id','')} />
      <Form.Control type="hidden" name="old_video" defaultValue={_.get(mycourse,'video','')} />
      
      <h1>Course Create</h1>
      <Row>
        <Col md={12} className="mt-3">
          <Form.Label>Course Title: </Form.Label>
          <Form.Control type="text" name="title" placeholder="Enter course Title" defaultValue={_.get(mycourse,'title','')} />
        </Col>
      </Row>
      <Row> 
        <Col md={12} className="mt-3">  
        <Form.Label>Description: </Form.Label>
          <Editor apiKey={process.env.TINYMCE_API_KEY}
            value={_.get(mycourse,'description','')}
            init={{
            height: 200,
            menubar: false,
            }}
            onEditorChange={onContentChange('description')}
            />
        </Col> 
       </Row> 
       <Row>  
        <Col md={3} className="mt-3">  
          {photoUploader('video','Upload course lecture video')}
        </Col>
        <Col md={1} className="mt-3">  
          <strong>OR</strong>
        </Col>
        <Col md={8} className="mt-3">  
        <Form.Label>Embeded video: </Form.Label>
          <Editor apiKey={process.env.TINYMCE_API_KEY}
            value={_.get(mycourse,'embed_resource','')}
            init={{
            height: 200,
            menubar: false,
            }}
            onEditorChange={onContentChange('embed_resource')}
            />
          </Col>
      </Row>
  
      <Row>
        <Col md={6} className="mt-3">
          <Form.Label>Duration: </Form.Label>
          <Form.Control type="text" name="duration" placeholder="Enter course duration" defaultValue={_.get(mycourse,'duration','')} />
        </Col> 
        <Col md={6} className="mt-3">
          <Form.Label>lecture</Form.Label>
          <Form.Control type="text" name="lecture" placeholder="Enter no. of lecture in course" defaultValue={_.get(mycourse,'lecture','')} />
        </Col> 
      </Row>
      <Row>
        <Col md={12} className="mt-3 text-right">
          {saving && <>Saving.. <Spinner animation="border" /></>}
          {!saving && response.message==="" && <Button type="submit" className="profile-save">Save</Button>}
          {!saving && response.message!=="" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
        </Col>
      </Row>
    
    </Form>;

const renderModal = () => <Modal show={true} size="lg" onHide={_.get(props,"onClose","")}>
<Modal.Header closeButton>
  <Modal.Title>{mode} Course</Modal.Title>
</Modal.Header>

<Modal.Body>
  {renderForm()}
</Modal.Body>

</Modal>

    return <>
    {props.type!=="modal" && renderForm()}
    {props.type==="modal" && renderModal()}
  </>;
};

export default ContentForm;