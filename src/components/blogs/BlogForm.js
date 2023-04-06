import { useEffect, useContext, useState } from 'react';
import { Form, Alert, Spinner, Row, Col, Button, Modal } from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';
import Utils from './../../Utils';


const BlogForm = (props) => {

  const [mode, setMode] = useState('Add');

  const [myblog, setMyBlog] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { getServerData, setServerData } = useContext(UserContext);

  const onContentChange = (fld) => (value) => {
    let c = { ...myblog };
    c[fld] = value;
    setMyBlog(c);
  }

  useEffect(() => {
    if (_.get(props, 'id', false)) {
      getServerData('trainer/my-blogs?where[id]=' + props.id)
        .then(setMyBlog)
        .then(() => setMode('Update'))
        .catch(err => console.log(err));
    }
  }, []);
  useEffect(window.scrollEffect, []);

  useEffect(() => { window.setTimeout(() => setResponse({ message: "" }), 5000) }, [response]);


  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    frmdata.append('short_description', _.get(myblog, 'short_description', ''));
    frmdata.append('description', _.get(myblog, 'description', ''));
    setSaving(true);
    setServerData('trainer/my-blogs ', frmdata)
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
      <Form.Control type="file" size="lg" name={fld + '_image'} accept=".jpeg,.png,.jpg,JPEG;" />
      <div className="text-center">{!_.isEmpty(_.get(myblog, fld + '_image', '')) && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${myblog[fld + '_image']}`} className="thumbnail mt-3" alt="blog" />}</div>
    </>;
  }

  const renderForm = () => <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(myblog, 'id', '')} />
    <Form.Control type="hidden" name="old_blog_image" defaultValue={_.get(myblog, 'blog_image', '')} />
    <Form.Control type="hidden" name="old_banner_image" defaultValue={_.get(myblog, 'banner_image', '')} />

    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Blog Title: </Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter blog Title" defaultValue={_.get(myblog, 'name', '')} />
      </Col>
    </Row>
    <Row>
      <Col md={6} className="mt-4">
        <Form.Label>Blog URL / Slug: </Form.Label>
        <Form.Control type="text" name="slug" placeholder="Enter blog slug/url" defaultValue={_.get(myblog, 'slug', '')} />
      </Col>
      <Col md={6} className="mt-3">
        {photoUploader('banner', 'Upload blog Banner image (Image dimension should be 1000cm x 323cm)')}
      </Col>
    </Row>

    <Row>
      <Col md={3} className="mt-3">
        {photoUploader('blog', 'Upload blog thumbnail image (Image dimension should be 1000cm x 667cm)')}
      </Col>
      <Col md={9} className="mt-3">
        <Form.Label>Short Description: </Form.Label>
        <Editor apiKey={process.env.TINYMCE_API_KEY}
          value={_.get(myblog, 'short_description', '')}
          init={{
            height: 200,
            menubar: false,
          }}
          toolbar="undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | code | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl "
          plugins="code"
          onEditorChange={onContentChange('short_description')}
        />
      </Col>
    </Row>

    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Description: </Form.Label>
        <Editor apiKey={process.env.TINYMCE_API_KEY}
          value={_.get(myblog, 'description', '')}
          init={{
            height: 200,
            menubar: false,
          }}
          toolbar="undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl | code"
          plugins="code"
          onEditorChange={onContentChange('description')}
        />
      </Col>
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
      <Modal.Title>{mode} Blog </Modal.Title>
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

export default BlogForm;