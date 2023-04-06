import { useEffect, useContext, useState } from 'react';
import { Form, Alert, Spinner, Row, Col, Button, Badge } from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';


const ServiceForm = (props) => {

  const [myservices, setMyservices] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { getServerData, setServerData } = useContext(UserContext);

  const onContentChange = (fld) => (value) => {
    let c = { ...myservices };
    c[fld] = value;
    setMyservices(c);
  }

  useEffect(() => {
    getServerData('trainer/my-services')
      .then(setMyservices)
      .catch(err => console.log(err));
  }, []);
  useEffect(window.scrollEffect, []);

  useEffect(() => { window.setTimeout(() => setResponse({ message: "" }), 5000) }, [response]);


  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    frmdata.append('service_offer', _.get(myservices, 'service_offer', ''));
    frmdata.append('consultancy', _.get(myservices, 'consultancy', ''));
    frmdata.append('coaching', _.get(myservices, 'coaching', ''));
    setSaving(true);
    setServerData('trainer/my-services', frmdata)
      .then(res => {
        setSaving(false);
        setResponse(res);
      })
  }

  const photoUploader = (fld, title) => {
    return <>
      <Form.Label>{title}</Form.Label>
      <Form.Control type="file" size="lg" name={fld + '_image'} accept=".jpeg,.png,.jpg;" />
      <div className="text-center">{!_.isEmpty(_.get(myservices, fld + '_image', '')) && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${myservices[fld + '_image']}`} className="thumbnail mt-3" />}</div>
    </>;
  }

  return <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(myservices, 'id', '')} />
    <Form.Control type="hidden" name="old_service_image" defaultValue={_.get(myservices, 'service_image', '')} />
    <h1>Trainer Services</h1>

    <Row>
      <Col md={3} className="mt-3">
        {photoUploader('service', 'Upload image here (Image dimension should be 691cm x 494cm)')}
      </Col>
      <Col md={9} className="mt-3">
        <Form.Label>Trainer Service Details: </Form.Label>
        <Editor apiKey={process.env.TINYMCE_API_KEY}
          value={_.get(myservices, 'service_offer', '')}
          init={{
            height: 200,
            menubar: false,
          }}
          toolbar="undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | code | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
          plugins="code"
          onEditorChange={onContentChange('service_offer')}
        />
      </Col>
    </Row>

    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Describe your Consultancy: </Form.Label>
        <Editor apiKey={process.env.TINYMCE_API_KEY}
          value={_.get(myservices, 'consultancy', '')}
          init={{
            height: 200,
            menubar: false,
          }}
          toolbar="undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | code | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
          plugins="code"
          onEditorChange={onContentChange('consultancy')}
        />
      </Col>
    </Row>

    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Describe your Coaching: </Form.Label>
        <Editor apiKey={process.env.TINYMCE_API_KEY}
          value={_.get(myservices, 'coaching', '')}
          init={{
            height: 200,
            menubar: false,
          }}
          toolbar="undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | code | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
          plugins="code"
          onEditorChange={onContentChange('coaching')}
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

  </Form>

};

export default ServiceForm;