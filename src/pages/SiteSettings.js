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
    frmdata.append("contact_address", _.get(mysitesettings, "contact_address", ""));
    setSaving(true);
    setServerData("settings", frmdata, "put").then((res) => {
      setSaving(false);
      setResponse(res);
      setTimeout(() => window.location.reload(), 3000);
    });
  };

  useEffect(() => {
    getServerData("settings").then((data) => {
      if (data.type === "default") {
        setMysitesettings({});
      } else {
        setMysitesettings(data.data);
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
              <Form.Control type="hidden" name="old_favicon" defaultValue={_.get(mysitesettings, "favicon", "")} />
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={12} className="mt-3">
                      <Form.Label>Company Name: </Form.Label>
                      <Form.Control
                        type="text"
                        name="company_name"
                        placeholder="Enter name of your company"
                        defaultValue={_.get(mysitesettings, "company_name", "")}
                      />
                    </Col>
                    <Col md={12} className="mt-1">
                      <Form.Label>Company URL: </Form.Label>
                      <Form.Control
                        type="url"
                        name="company_url"
                        placeholder="Enter website url of your company"
                        defaultValue={_.get(mysitesettings, "company_url", "")}
                      />
                    </Col>
                    <Col md={12} className="mt-1">
                      <Form.Label>Contact Phone: </Form.Label>
                      <Form.Control
                        type="number"
                        name="contact_phone"
                        placeholder="Enter your contact phone"
                        defaultValue={_.get(mysitesettings, "contact_phone", "")}
                      />
                    </Col>
                    <Col md={12} className="mt-1">
                      <Form.Label>Contact Email: </Form.Label>
                      <Form.Control
                        type="text"
                        name="contact_email"
                        placeholder="Enter your contact email"
                        defaultValue={_.get(mysitesettings, "contact_email", "")}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col md={6} className="mt-3">
                  <Form.Label>Contact Address: </Form.Label>
                  <Editor
                    apiKey={process.env.TINYMCE_API_KEY}
                    value={_.isEmpty(_.get(mysitesettings, "contact_address", "")) ? "" : mysitesettings.contact_address}
                    init={{
                      height: 250,
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
                <Col md={6} className="mt-3">
                  {photoUploader("logo", "Company logo (Image dimension should be 88cm x 40cm)")}
                  {!_.isEmpty(mysitesettings.logo) && (
                    <div className="text-right">
                      <div className="custom-control custom-switch">
                        <input className="custom-control-input" type="checkbox" id="dellogo" name="deletelogo" value="1" />
                        <label className="custom-control-label" for="dellogo">
                          Delete this Logo
                        </label>
                      </div>
                    </div>
                  )}
                </Col>
                <Col md={6} className="mt-3">
                  {photoUploader("favicon", "Company Favicon (Image dimension should be 30px x 30px)")}
                  {!_.isEmpty(mysitesettings.favicon) && (
                    <div className="text-right">
                      <div className="custom-control custom-switch">
                        <input className="custom-control-input" type="checkbox" id="delficon" name="deletefavicon" value="1" />
                        <label className="custom-control-label" for="delficon">
                          Delete this Favicon
                        </label>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mt-3">
                  <Form.Label>Copyright Text: </Form.Label>
                  <Form.Control
                    type="text"
                    name="copyright_text"
                    placeholder="Enter your copyright text"
                    defaultValue={_.get(mysitesettings, "copyright_text", "")}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mt-3">
                  <div className="custom-control custom-switch">
                    <input
                      className="custom-control-input"
                      type="checkbox"
                      id="preftrainers"
                      name="preferred_trainers"
                      value="1"
                      checked={_.get(mysitesettings, "preferred_trainers", true)}
                      onChange={(e) => setMysitesettings({ ...mysitesettings, preferred_trainers: e.target.checked })}
                    />
                    <label className="custom-control-label" for="preftrainers">
                      Preferred Trainers Feature
                    </label>
                  </div>
                  <p className="alert  border-secondary text-left mt-2">
                    This feature allows you to mark trainer as favorite and enable you to quickly access them via Preferred Trainers page.
                  </p>
                </Col>
                <Col md={6} className="mt-3">
                  <div className="custom-control custom-switch">
                    <input
                      className="custom-control-input"
                      type="checkbox"
                      id="prefcourses"
                      name="preferred_courses"
                      value="1"
                      checked={_.get(mysitesettings, "preferred_courses", true)}
                      onChange={(e) => setMysitesettings({ ...mysitesettings, preferred_courses: e.target.checked })}
                    />
                    <label className="custom-control-label" for="prefcourses">
                      Preferred Courses Feature
                    </label>
                  </div>

                  <p className="alert  border-secondary text-left mt-2">
                    This feature allows you to mark Courses as favorite and enable you to quickly access them via Preferred Courses page.
                  </p>
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
