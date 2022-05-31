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
    <Form.Control type="hidden" name="old_product_image" defaultValue={_.get(mycourse,'product_image','')} />
    
    <h1>Course Create</h1>
    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Course Title: </Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter course title" defaultValue={_.get(mycourse,'title','')} />
      </Col>
    </Row>
    <Row>
      <Col md={4} className="mt-4">
        <Form.Label>SKU: </Form.Label>
        <Form.Control type="text" name="sku" placeholder="Enter course sku" defaultValue={_.get(mycourse,'sku','')} />
      </Col>
      <Col md={8} className="mt-4">
        <Form.Label>Course URL / Slug: </Form.Label>
        <Form.Control type="text" name="slug" placeholder="Enter course slug" defaultValue={_.get(mycourse,'lastname','')} />
      </Col>
    </Row>

    <Row>  
      <Col md={3} className="mt-3">  
        {photoUploader('product_image','Upload product image')}
      </Col>
      <Col md={9} className="mt-3">  
      <Form.Label>Short Description: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(mycourse,'short_description','')}
        init={{
        height: 200,
        menubar: false,
        }}
        onEditorChange={onContentChange('biography')}
        />
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
      <Col md={6} className="mt-3">  
      <Form.Label>Learn brief guide to student: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(mycourse,'learn_brief','')}
        init={{
        height: 200,
        menubar: false,
        }}
        onEditorChange={onContentChange('learn_brief')}
        />
        </Col>
        <Col md={6} className="mt-3">  
      <Form.Label>Requirements for course access: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(mycourse,'requirements','')}
        init={{
        height: 200,
        menubar: false,
        }}
        onEditorChange={onContentChange('requirements')}
        />
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
      <Col md={12} className="mt-3">  
      <Form.Label>Stock Quantity: </Form.Label>
      <Form.Control type="text" name="stock_qnty" placeholder="Enter stock quantity" defaultValue={_.get(mycourse,'stock_qnty','')} />
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