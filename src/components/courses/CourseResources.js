import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';
import Utils from './../../Utils';


const CourseResources = (props) => {

  const [mycourse, setMycourse] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);

  const onContentChange = (fld) => (value) => {
    let c = {...mycourse};
    c[fld] = value;
    setMycourse(c);
  }
  useEffect(() =>{
    getServerData('courses')
    .then(mycourse)
    .then(() => getServerData('trainer/my-courses'))
    .then(setMycourse)
    .catch(err => console.log(err));
  },[]);

  useEffect(() => {
    getServerData('trainer/my-courses')
    .then(setMycourse)
    .catch(err => console.log(err));
  },[]);
  useEffect(window.scrollEffect,[]);

  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);
  

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    setServerData('trainer/my-courses ',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }
  const isMyc = (cid, cval) => {
    return _.get(_.find(mycourse, r => r.ca_id && r.ca_value),'id',false) !== false;
  }
  const renderCL = () => {
    return ca.map(c => <Col md={12} key={c.title} className="mt-3">
      <Form.Label>{c.title}</Form.Label>
      <Form.Control as="select" name={`course[${c.id}][]`}>
        {_.get(c,'children.length',0) > 0 && c.children.map(pc => <option key={pc.id} value={pc.id} selected={isMyc(c.id,pc.id)}>{pc.title}</option>)}
      </Form.Control>
    </Col>)
  };

  return <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(mycourse,'id','')} />
  
   <h1>Course Resources</h1>
    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Course Title: </Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter course Title" defaultValue={_.get(mycourse,'name','')} />
      </Col>
    </Row>
    <Row>
      {renderCL()}
    </Row>
    <Row> 
      <Col md={12} className="mt-3">  
        <Form.Label>Price: </Form.Label>
        <Form.Control type="text" name="price" placeholder="Enter course price" defaultValue={_.get(mycourse,'price','')} />
      </Col>
    </Row>
    <Row>   
      <Col md={12} className="mt-3">
          <Form.Control as="select" name="type" defaultValue={_.get(setMycourse,`type`,'')}>
            <option value=""> - Select Course Type - </option>
            {Utils.courseType.map(v => <option key={v} value={v}>{v}</option>)}
          </Form.Control>
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

export default CourseResources;