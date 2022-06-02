import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';
import Utils from './../../Utils';


const CourseResources = (props) => {

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
    frmdata.append('short_description',_.get(mycourse,'short_description',''));
    frmdata.append('description',_.get(mycourse,'description',''));
    frmdata.append('learn_brief',_.get(mycourse,'learn_brief',''));
    frmdata.append('requirements',_.get(mycourse,'requirements',''));
    setSaving(true);
    setServerData('trainer/my-courses ',frmdata)
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
    <Form.Control type="hidden" name="old_product_image" defaultValue={_.get(mycourse,'product_image','')} />
    
    <h1>Course Create</h1>
    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Course Title: </Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter course Title" defaultValue={_.get(mycourse,'name','')} />
      </Col>
    </Row>
    <Row> 
      <Col md={6} className="mt-3">  
        <Form.Label>Price: </Form.Label>
        <Form.Control type="text" name="price" placeholder="Enter course price" defaultValue={_.get(mycourse,'price','')} />
      </Col> 

      <Col md={6} className="mt-3">  
      <Form.Label>Stock Quantity: </Form.Label>
      <Form.Control type="text" name="stock_qnty" placeholder="Enter stock quantity" defaultValue={_.get(mycourse,'stock_qnty','')} />
      </Col>
    </Row>
    <Row>
      <Col md={6} className="mt-3">
          <Form.Control as="select" name="level" defaultValue={_.get(setMycourse,`level`,'')}>
            <option value=""> - Select Level - </option>
            {Utils.courseLevel.map(v => <option key={v} value={v}>{v}</option>)}
          </Form.Control>
      </Col> 
      <Col md={6} className="mt-3">
          <Form.Control as="select" name="language" defaultValue={_.get(setMycourse,`language`,'')}>
            <option value=""> - Select Language - </option>
            {Utils.country.map(v => <option key={v} value={v} >{v}</option>)}
          </Form.Control>
      </Col> 
    </Row>
    <Row>
      <Col md={4} className="mt-3">
      <Form.Control type="text" name="duration" placeholder="Enter course duration" defaultValue={_.get(mycourse,'duration','')} />
      </Col> 
      <Col md={4} className="mt-3">
      <Form.Control type="text" name="lectures" placeholder="Enter no. of lecture in course" defaultValue={_.get(mycourse,'lectures','')} />
      </Col> 
      <Col md={4} className="mt-3">
      <Form.Control type="text" name="media" placeholder="Enter type" defaultValue={_.get(mycourse,'media','')} />
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