import { useEffect, useContext, useState } from "react";
import { Form, Alert, Spinner, Row, Col, Button, Modal } from "react-bootstrap";
import UserContext from "./../../contexts/UserContext";
import _ from "lodash";
import moment from "moment";

const CouponForm = (props) => {
  const [mode, setMode] = useState(props.mode === 2 ? "Update" : "Add");
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { getUserData, isTrainer, getServerData, setServerData } = useContext(UserContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (isTrainer() && props.mode === 2 && props.id > 0) {
      getServerData(`coupons/edit/${props.id}`)
        .then((data) => {
          console.log("cdet", data);
          setData(data);
        })
        .catch((msg) => {});
    }
  }, []);

  useEffect(() => {
    if (isTrainer()) {
      const slug = getUserData().slug;
      getServerData(`trainer/profile/${slug}?mode[]=courses`, true)
        .then((tData) => {
          setCourses(tData.courses);
        })
        .catch((msg) => {});
    }
  }, []);

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setServerData(props.mode === 2 ? `coupons/${props.id}` : "coupons/", frmdata, props.mode === 2 ? "put" : "post")
      .then((res) => {
        props.onSave();
        props.onClose();
        setResponse({ success: res.data.success, message: res.data.message });
      })
      .catch((err) => {
        setResponse({ success: false, message: err });
      });
  };

  const renderForm = () => (
    <Form onSubmit={onSave}>
      <Row>
        <Col md={4} className="mt-3">
          <Form.Label>Coupon Code: </Form.Label>
          <Form.Control type="text" name="coupon_code" placeholder="Enter coupon code" defaultValue={_.get(data, "coupon_code", "")} />
          <p className="text-danger">* Mandatory Field</p>
        </Col>
        <Col md={4} className="mt-3">
          <Form.Label>Usage Limit per user: </Form.Label>
          <Form.Control
            type="number"
            name="usage_limit"
            min="1"
            placeholder="Enter usage limit"
            defaultValue={parseInt(_.get(data, "usage_limit", "0")) > 0 ? data.usage_limit : ""}
          />
          <p className="text-info">If left blank, it is set for unlimited usage</p>
        </Col>
        <Col md={4} className="mt-3">
          <Form.Label>Expiry Date: </Form.Label>
          <Form.Control
            type="date"
            name="expiry_date"
            placeholder="Enter expiry date"
            defaultValue={_.get(data, "expiry_date", "") === "" ? "" : moment(data.expiry_date).format("YYYY-MM-DD")}
          />
          <p className="text-info">If left blank, it is set for unlimited</p>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mt-3">
          <Form.Label>Select Course: </Form.Label>
          <select multiple="multiple" name="course_ids" className="form-control">
            {courses.map((c) => (
              <option key={c.id} value={c.id} selected={!_.isEmpty(data.course_ids) && _.get(data, "course_ids", []).includes(c.id)}>
                {c.name}
              </option>
            ))}
          </select>
          <p className="text-info">If no course is seleted, it is applicable for all courses</p>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mt-3">
          <Form.Label>Coupon Type: </Form.Label>
          <Form.Control as="select" name="coupon_type" required>
            <option value=""> - Select Type - </option>
            <option value="1" selected={parseInt(_.get(data, "coupon_type", 0)) === 1}>
              Total cart percentage
            </option>
            <option value="2" selected={parseInt(_.get(data, "coupon_type", 0)) === 2}>
              Total cart value
            </option>
          </Form.Control>
          <p className="text-danger">* Mandatory Field</p>
        </Col>
        <Col md={6} className="mt-3">
          <Form.Label>Set Value:</Form.Label>
          <Form.Control
            type="text"
            name="discount_value"
            placeholder="Enter discount value."
            required
            defaultValue={_.get(data, "discount_value", "")}
          />
          <p className="text-danger">* Mandatory Field</p>
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
              {response.message}
            </Alert>
          )}
        </Col>
      </Row>
    </Form>
  );

  const renderModal = () => (
    <Modal show={true} size="xl" onHide={_.get(props, "onClose", "")}>
      <Modal.Header closeButton>
        <Modal.Title>{mode} Coupon</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm()}</Modal.Body>
    </Modal>
  );

  return (
    <>
      {props.type !== "modal" && renderForm()}
      {props.type === "modal" && renderModal()}
    </>
  );
};
export default CouponForm;
