import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button, Modal} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';
import Utils from './../../Utils';


const CourseForm = (props) => {

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
    if(_.get(props,'id',false)){
      getServerData('trainer/my-courses?where[id]='+props.id)
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
    frmdata.append('short_description',_.get(mycourse,'short_description',''));
    frmdata.append('description',_.get(mycourse,'description',''));
    frmdata.append('learn_brief',_.get(mycourse,'learn_brief',''));
    frmdata.append('requirements',_.get(mycourse,'requirements',''));
    setSaving(true);
    setServerData('trainer/my-courses ',frmdata)
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
      <Form.Control type="file" size="lg" name={fld} accept=".jpeg,.png,.jpg,JPEG;" />
    </>;
  }

  const renderForm = () => <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(mycourse,'id','')} />
    <Form.Control type="hidden" name="old_product_image" defaultValue={_.get(mycourse,'product_image','')} />
    
    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Course Title: </Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter course Title" defaultValue={_.get(mycourse,'name','')} />
      </Col>
    </Row>
    <Row>
      <Col md={4} className="mt-4">
        <Form.Label>SKU: </Form.Label>
        <Form.Control type="text" name="sku" placeholder="Enter course sku" defaultValue={_.get(mycourse,'sku','')} />
      </Col>
      <Col md={8} className="mt-4">
        <Form.Label>Course URL / Slug: </Form.Label>
        <Form.Control type="text" name="slug" placeholder="Enter course slug" defaultValue={_.get(mycourse,'slug','')} />
      </Col>
    </Row>

    <Row>  
      <Col md={3} className="mt-3">  
        {photoUploader('course_image','Upload product image')}
      </Col>
      <Col md={9} className="mt-3">  
      <Form.Label>Short Description: </Form.Label>
      <Editor apiKey={process.env.TINYMCE_API_KEY}
        value={_.get(mycourse,'short_description','')}
        init={{
        height: 200,
        menubar: false,
        }}
        onEditorChange={onContentChange('short_description')}
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
      <Col md={6} className="mt-3">
          <Form.Control as="select" name="level" defaultValue={_.get(mycourse,`level`,'')}>
            <option value=""> - Select Level - </option>
            {Utils.courseLevel.map(v => <option key={v} selected={v==_.get(mycourse,`level`,'')} value={v}>{v}</option>)}
          </Form.Control>
      </Col> 
      <Col md={6} className="mt-3">
          <Form.Control as="select" name="language" defaultValue={_.get(mycourse,`language`,'')}>
            <option value=""> - Select Language - </option>
            {Utils.country.map(v => <option key={v} selected={v==_.get(mycourse,`language`,'')} value={v} >{v}</option>)}
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
      <Form.Control as="select" name="media">
            <option value=""> - Select Course Type - </option>
            {Utils.courseType.map(v => <option key={v} value={v} selected={mycourse.media===v}>{v}</option>)}
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
  
  </Form>;

  const renderModal = () => <Modal show={true} size="xl" onHide={_.get(props,"onClose","")}>
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

export default CourseForm;