import { useEffect, useContext, useState } from "react";
import { Form, Alert, Spinner, Container, Row, Col, Button } from "react-bootstrap";
import _ from "lodash";
import { Editor } from "@tinymce/tinymce-react";
import UserContext from "../contexts/UserContext";
const SiteSettings = () => {
  const [mysitesettings, setMysitesettings] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { getServerData, setServerData } = useContext(UserContext);

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    frmdata.append("contact_address", _.get(mysitesettings, "contact_address", ""));
    setServerData("settings/add-site-settings", frmdata).then((res) => {
      setSaving(false);
      setResponse(res);
      setTimeout(() => window.location.reload(), 3000);
    });
  };

  useEffect(() => {
    getServerData("settings/site-settings").then((data) => {
      if (data.type === "default") {
        setMysitesettings({});
      } else {
        setMysitesettings(data.data[0]);
      }
    });
  }, []);

  const onContentChange = (fld) => (value) => {
    let c = { ...mysitesettings };
    c[fld] = value;
    setMysitesettings(c);
  };
  const photoUploader = (fld, title) => {
    return (
      <>
        <Form.Label>{title}</Form.Label>
        <Form.Control type="file" size="lg" name={fld} accept=".jpeg,.png,.PNG,.jpg;" />
        <div className="text-center">
          {!_.isEmpty(_.get(mysitesettings, fld, "")) && (
            <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${mysitesettings[fld]}`} className="thumbnail mt-3" />
          )}
        </div>
      </>
    );
  };
  return (
    <Container fluid className="h-100 p-0">
      <div className="profile-wrapper">
        <div className="container">
          <h1>Site Settings</h1>
          <p className="alert alert-warning disclaimer mt-3 mb-3">
            All fields are optional and can override default settings. Please use your judgment when filling them out. Leaving a field blank uses the
            default setting. Your completion of any field acknowledges acceptance of overriding the default settings. Thank you.
          </p>
          <Col md={12}>
            <Form onSubmit={onSave}>
              <Form.Control type="hidden" name="id" defaultValue={_.get(mysitesettings, "id", "")} />
              <Form.Control type="hidden" name="old_logo" defaultValue={_.get(mysitesettings, "logo", "")} />
              <Row>
                <Col md={6} className="mt-3">
                  <Form.Label>Company Name: </Form.Label>
                  <Form.Control
                    type="text"
                    name="company_name"
                    placeholder="Enter name of your company"
                    defaultValue={_.get(mysitesettings, "company_name", "")}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <Form.Label>Page Title: </Form.Label>
                  <Form.Control
                    type="text"
                    name="site_title"
                    placeholder="Enter your site title"
                    defaultValue={_.get(mysitesettings, "site_title", "")}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mt-3">
                  <Form.Label>Contact Phone: </Form.Label>
                  <Form.Control
                    type="number"
                    name="contact_phone"
                    placeholder="Enter your contact phone"
                    defaultValue={_.get(mysitesettings, "contact_phone", "")}
                  />
                </Col>
                <Col md={6} className="mt-3">
                  <Form.Label>Contact Email: </Form.Label>
                  <Form.Control
                    type="text"
                    name="contact_email"
                    placeholder="Enter your contact email"
                    defaultValue={_.get(mysitesettings, "contact_email", "")}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mt-3">
                  {photoUploader("logo", "Upload logo (Image dimension should be 88cm x 40cm)")}
                </Col>
                <Col md={6} className="mt-3">
                  <Form.Label>Contact Address: </Form.Label>
                  <Editor
                    apiKey={process.env.TINYMCE_API_KEY}
                    value={_.isEmpty(_.get(mysitesettings, "contact_address", "")) ? "" : mysitesettings.contact_address}
                    init={{
                      height: 200,
                      menubar: false,
                    }}
                    toolbar="undo redo | bold italic underline strikethrough | code | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl"
                    menubar="tools"
                    plugins="code"
                    onEditorChange={onContentChange("contact_address")}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mt-3">
                  <Form.Label>Copywrite Text: </Form.Label>
                  <Form.Control
                    type="text"
                    name="copywrite_text"
                    placeholder="Enter your copywrite text"
                    defaultValue={_.get(mysitesettings, "copywrite_text", "")}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mt-3 text-right">
                  {saving && (
                    <>
                      Saving.. <Spinner animation="border" />
                    </>
                  )}
                  {!saving && response.message === "" && (
                    <Button type="submit" className="profile-save">
                      Save
                    </Button>
                  )}
                  {!saving && response.message !== "" && (
                    <Alert variant={response.success ? "info" : "danger"} className="p-3 mt-2 text-center">
                      {response.success && (
                        <>
                          <p>Your Site Data have been submitted successfully ! </p>
                          <p>This page will reload automatically !</p>
                        </>
                      )}
                      {/*response.message*/}
                    </Alert>
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
        </div>
      </div>
    </Container>
  );
};

export default SiteSettings;
