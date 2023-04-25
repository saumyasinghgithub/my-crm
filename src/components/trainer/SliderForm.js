import { useEffect, useContext, useState } from "react";
import _ from "lodash";
import { Form, Alert, Spinner, Row, Col, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import UserContext from "../../contexts/UserContext";
import Utils from "./../../Utils";
const SliderForm = (props) => {
  const [sliderData, setSliderData] = useState([]);
  const { getServerData, setServerData } = useContext(UserContext);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const [lastinsertid, setLastinsertid] = useState();

  const trainerDetails = Utils.getUserData();

  useEffect(() => {
    getServerData("trainer/sliders")
      .then((data) => {
        console.log("fetching data" + data);
        while (data.length < 2) {
          data = [...data, { id: 0, slider_image: "", slider_text: "", cta_link: "" }];
        }
        console.log(data);
        setSliderData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(window.scrollEffect, []);

  useEffect(() => {
    window.setTimeout(() => setResponse({ message: "" }), 5000);
  }, [response]);

  const photoUploader = (fld, title, k) => {
    const old_image = sliderData[k].slider_image;
    return (
      <>
        <Form.Label>{title}</Form.Label>
        <Form.Control type="file" size="lg" name={`${fld}_image_${k}`} accept=".jpeg,.png,.PNG,.jpg;" required={_.isEmpty(old_image)} />
        <Form.Control type="hidden" name={`old_${fld}_image`} value={old_image} />
        <div className="text-center">
          {!_.isEmpty(old_image) && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${old_image}`} className="thumbnail mt-3" />}
        </div>
      </>
    );
  };

  const addAData = (e) => {
    let newdata = [...sliderData, { id: 0, slider_image: "", slider_text: "", cta_link: "" }];
    setSliderData(newdata);
  };
  const removeAData = (pos) => (e) => {
    let newdata = [...sliderData];
    newdata.splice(pos, 1);
    setSliderData(newdata);
  };
  const saveAData = (pos, attr) => (e) => {
    let newdata = [...sliderData];
    _.set(newdata, `${pos}${attr}`, attr === "year" ? parseInt(e.currentTarget.value) : e.currentTarget.value);
    setSliderData(newdata);
  };
  const renderSliderFields = () => {
    return (
      <>
        {sliderData.map((v, k) => (
          <Accordion defaultActiveKey={[sliderData.length - 1]} alwaysOpen={true}>
            <Row>
              <Col className="col-11">
                <Accordion.Item eventKey={k} className="my-1 hide" style={{ backgroundColor: k % 2 === 0 ? "#ddf4f4" : "#f8f8f8" }}>
                  <Accordion.Header className="mb-0">
                    <strong>Landing Page Slide {k + 1} </strong>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Form.Control type="hidden" name={`id`} value={_.get(sliderData, `${k}.id`, "")} />
                      <Col className="col-6 py-3">{photoUploader("slider", "Upload Large Slider Image (1236px by 450px)", k)}</Col>

                      <Col className="col-6 py-3">
                        <Form.Label>Slider Text</Form.Label>
                        <Form.Control
                          type="text"
                          name={`slider_text`}
                          placeholder="Slider Text"
                          defaultValue={_.get(sliderData, `${k}.slider_text`, "")}
                          onChange={saveAData(k, "slider_text")}
                        />
                        <Form.Label className="pt-3">Call to action button link</Form.Label>
                        <Form.Control
                          type="text"
                          name={`cta_link`}
                          placeholder="Call to action button link."
                          defaultValue={_.get(sliderData, `${k}.cta_link`, "")}
                          onChange={saveAData(k, "cta_link")}
                        />
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
              <Col className="col-1">
                {k > 1 && <i className="position-relative fa fa-minus-circle fa-lg mt-2 cursor-pointer text-danger remove-award" onClick={removeAData(k)} />}
              </Col>
            </Row>
          </Accordion>
        ))}
      </>
    );
  };
  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    setServerData("trainer/imagesliders", frmdata).then((res) => {
      setSaving(false);
      setResponse(res);
      setLastinsertid(res.insertId);
    });
  };
  return (
    <>
      <Form onSubmit={onSave}>
        <Form.Control type="hidden" name="user_id" value={trainerDetails.id} />
        <Form.Control type="hidden" name="created_at" value={Date().toLocaleString()} />
        <h1>
          Landing Page Slider <i className="fa fa-plus-circle text-success Adddetails" onClick={addAData} />
        </h1>
        {renderSliderFields()}
        <Row>
          <Col md={12} className="m-3 text-right">
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
                {response.message}
              </Alert>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default SliderForm;
