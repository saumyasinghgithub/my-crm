import { useEffect, useContext, useState, useRef } from 'react';
import { Form, Alert, Spinner, Row, Col, Button, Modal } from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';
import Utils from './../../Utils';
import { useForm } from "react-hook-form";


const CourseForm = (props) => {

  const [mode, setMode] = useState('Add');

  const [mycourse, setMycourse] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { getServerData, setServerData } = useContext(UserContext);
  const frmRef = useRef('courseform');

  const onContentChange = (fld) => (value) => {
    let c = { ...mycourse };
    c[fld] = value;
    setMycourse(c);
  }

  useEffect(() => {
    if (_.get(props, 'id', false)) {
      getServerData('trainer/my-courses?where[id]=' + props.id)
        .then(setMycourse)
        .then(() => setMode('Update'))
        .catch(err => console.log(err));
    }
  }, []);
  useEffect(window.scrollEffect, []);

  useEffect(() => { window.setTimeout(() => setResponse({ message: "" }), 5000) }, [response]);


  const onSave = (e) => {
    const frm = frmRef.current;
    e.preventDefault();
    frm.classList.add("was-validated");
    /*if(((_.get(mycourse,'short_description','')) === '')){
      const element = document.querySelector('.short_description');
      element.style.display = 'block';
      return false;
    }
    if(((_.get(mycourse,'description','')) === '')){
      const element = document.querySelector('.description');
      element.style.display = 'block';
      return false;
    }*/
    if (frm.checkValidity() === false) {
      return false;
    }
    let frmdata = new FormData(frm);

    frmdata.append('old_courses_image', _.get(mycourse, 'course_image', ''));
    frmdata.append('short_description', _.get(mycourse, 'short_description', ''));
    frmdata.append('description', _.get(mycourse, 'description', ''));
    frmdata.append('learn_brief', _.get(mycourse, 'learn_brief', ''));
    frmdata.append('requirements', _.get(mycourse, 'requirements', ''));
    setSaving(true);
    setServerData('trainer/my-courses', frmdata)
      .then(res => {
        setSaving(false);
        setResponse(res);
        props.onSave();
        props.onClose();
      })
  }

  const photoUploader = (fld, title) => {
    return <>
      <Form.Label>{title}</Form.Label>
      <Form.Control type="file" size="lg" name={fld} accept=".jpeg,.png,.jpg,JPEG;" />
      {_.get(mycourse, 'course_image', '') !== '' && <img className="thumbnail mt-3" src={`${process.env.REACT_APP_API_URL}/uploads/courses/${mycourse.course_image}`} />}
    </>;
  }

  const renderForm = () => <Form noValidate ref={frmRef} id="course-form" onSubmit={onSave} method="post" className="form contact alertdesign needs-validation">
    <Form.Control type="hidden" name="id" defaultValue={_.get(mycourse, 'id', '')} />
    <Form.Control type="hidden" name="mid" defaultValue={_.get(mycourse, 'moodle_id', '')} />
    <Form.Control type="hidden" name="old_product_image" defaultValue={_.get(mycourse, 'product_image', '')} />
    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Course Title * : </Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter course Title" defaultValue={_.get(mycourse, 'name', '')} required />
        <div className="invalid-feedback">Course Title is required!</div>
      </Col>
    </Row>
    <Row>
  
        <Form.Control type="hidden" name="sku" defaultValue={_.get(mycourse,'sku','')} />

      <Col md={8} className="mt-4">
        <Form.Label>Course URL / Slug: </Form.Label>
        <Form.Control type="text" name="slug" placeholder="Enter course slug" defaultValue={_.get(mycourse, 'slug', '')} />
      </Col>
    </Row>

    <Row>
      <Col md={3} className="mt-3">
        {photoUploader('course_image', 'Upload product image (Image dimension should be 1000cm x 667cm)')}
      </Col>
      <Col md={9} className="mt-3">
        <Form.Label>Short Description * : </Form.Label>
        <Editor id="short_description" name="short_description" required apiKey={process.env.TINYMCE_API_KEY}
          value={_.get(mycourse, 'short_description', '')}
          init={{
            height: 200,
            menubar: false,
          }}
          toolbar="undo redo | bold italic underline strikethrough | code | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
          plugins="code"
          onEditorChange={onContentChange('short_description')}
        />
        <div className="short_description invalid-feedback">Short description is required!</div>
      </Col>
    </Row>

    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Description * : </Form.Label>
        <Editor id="description" name="description" apiKey={process.env.TINYMCE_API_KEY}
          value={_.get(mycourse, 'description', '')}
          init={{
            selector: 'textarea',
            height: 200,
            menubar: false,
          }}
          toolbar="undo redo | bold italic underline strikethrough | code | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
          plugins="code"
          onEditorChange={onContentChange('description')} required />
        <div className="description invalid-feedback">Description is required!</div>
      </Col>
    </Row>
    <Row>
      <Col md={6} className="mt-3">
        <Form.Label>Learn brief guide to student: </Form.Label>
        <Editor id="learn_brief" name="learn_brief" apiKey={process.env.TINYMCE_API_KEY}
          value={_.get(mycourse, 'learn_brief', '')}
          init={{
            height: 200,
            menubar: false,
          }}
          toolbar="undo redo | bold italic underline strikethrough | code | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
          plugins="code"
          onEditorChange={onContentChange('learn_brief')}
        />
      </Col>
      <Col md={6} className="mt-3">
        <Form.Label>Requirements for course access: </Form.Label>
        <Editor id="requirements" name="requirements" apiKey={process.env.TINYMCE_API_KEY}
          value={_.get(mycourse, 'requirements', '')}
          init={{
            height: 200,
            menubar: false,
          }}
          toolbar="undo redo | bold italic underline strikethrough | code | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
          plugins="code"
          onEditorChange={onContentChange('requirements')}
        />
      </Col>
    </Row>
    <Row>
      <Col md={4} className="mt-3">
        <Form.Label>Course Level * : </Form.Label>
        <Form.Control as="select" name="level" defaultValue={_.get(mycourse, `level`, '')} required>
          <option value=""> - Select Level - </option>
          {Utils.courseLevel.map(v => <option key={v} selected={v == _.get(mycourse, `level`, '')} value={v}>{v}</option>)}
        </Form.Control>
        <div className="invalid-feedback">Level is required!</div>
      </Col>
      <Col md={4} className="mt-3">
        <Form.Label>Course language * : </Form.Label>
        <Form.Control as="select" name="language" defaultValue={_.get(mycourse, `language`, '')} required>
          <option value=""> - Select Language - </option>
          {Utils.country.map(v => <option key={v} selected={v == _.get(mycourse, `language`, '')} value={v} >{v}</option>)}
        </Form.Control>
        <div className="invalid-feedback">Language is required!</div>
      </Col>
    </Row>
    <Row>
      {/*<Col md={4} className="mt-3">  
        <Form.Label>Stock Quantity: </Form.Label>
        <Form.Control type="number" name="stock_qnty" placeholder="Enter stock quantity" defaultValue={_.get(mycourse,'stock_qnty','')} />
      </Col>*/}
      <Col md={4} className="mt-3">
        <Form.Label>Course Duration (In Hours): </Form.Label>
        <Form.Control type="number" name="duration" placeholder="Enter course duration" defaultValue={_.get(mycourse, 'duration', '')} />
      </Col>
      {/*<Col md={4} className="mt-3">
        <Form.Label>Number of Lectures: </Form.Label>
        <Form.Control type="number" name="lectures" placeholder="Enter no. of lecture in course" defaultValue={_.get(mycourse,'lectures','')} />
    </Col>*/}
    </Row>
    <Row>
      <Col md={12} className="mt-3 text-right">
        {saving && <>Saving.. <Spinner animation="border" /></>}
        {!saving && response.message === "" && <Button type="submit" className="profile-save">Save</Button>}
        {!saving && response.message !== "" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
      </Col>
    </Row>

  </Form>;

  const renderModal = () => <Modal show={true} size="xl" onHide={_.get(props, "onClose", "")}>
    <Modal.Header closeButton>
      <Modal.Title>{mode} Course</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {renderForm()}
    </Modal.Body>

  </Modal>

  return <>
    {props.type !== "modal" && renderForm()}
    {props.type === "modal" && renderModal()}
  </>;

};

export default CourseForm;