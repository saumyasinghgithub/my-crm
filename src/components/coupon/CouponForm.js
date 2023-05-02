import { useEffect, useContext, useState } from "react";
import { Form, Alert, Spinner, Row, Col, Button, Modal } from "react-bootstrap";
import UserContext from "./../../contexts/UserContext";
import { Editor } from "@tinymce/tinymce-react";
import _ from "lodash";
import Utils from "./../../Utils";
import axios from "axios";
import trainer from "../trainer";

const CouponForm = (props) => {
  const [mode, setMode] = useState("Add");
  const [mycoupon, setMycoupon] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { getServerData, setServerData } = useContext(UserContext);
  const [mycourse, setMycourse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [trainerdata,setTrainerdata] = useState(Utils.getUserData());
  //console.log(trainerdata);

  useEffect(() => {
    const slug = Utils.subdomain();
    getServerData(`trainer/profile/${slug}`, true)
      .then((tData) => {
        console.log(tData.courses);
        setMycourse(tData.courses);
      })
      .catch((msg) => {});
  }, []);

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    frmdata.append("item_id", selectedOptions);
    console.log(selectedOptions);
    axios
      .post(Utils.apiUrl(`coupons/add`), frmdata, Utils.apiHeaders())
      .then((res) => {
        console.log(res);
        setResponse({});
      })
      .catch((err) => {
        setResponse(err);
        console.log(err);
      });
  };
  const currentDate = new Date();
  const handleOnclickOption = (event) => {
    selectedOptions.push(parseInt(event.target.value));
    setSelectedOptions(selectedOptions);
  };
  const courseList = [];
  for (let i = 0; i < mycourse.length; i++) {
    courseList.push(
      <>
        <option key={mycourse[i].id} value={mycourse[i].id}>
          {mycourse[i].name}
        </option>
      </>
    );
  }

  const renderForm = () => (
    <Form onSubmit={onSave}>
      <Form.Control
        type="hidden"
        name="created_at"
        defaultValue={
          currentDate.getFullYear() +
          "-" +
          currentDate.toLocaleString(undefined, { month: "2-digit" }) +
          "-" +
          currentDate.getDate()
        }
      />
      <Form.Control
        type="hidden"
        name="trainer_id"
        defaultValue={trainer.id}
      />
      <Form.Control
        type="hidden"
        name="user_id"
        defaultValue="0"
      />
      <Row>
        <Col md={6} className="mt-3">
          <Form.Label>Coupon Code: </Form.Label>
          <Form.Control
            type="text"
            name="coupon_code"
            placeholder="Enter coupon code"
          />
          <p>* Mandatory Field</p>
        </Col>
        <Col md={6} className="mt-3">
          <Form.Label>Usage Limit: </Form.Label>
          <Form.Control
            type="number"
            name="usage_limit"
            placeholder="Enter usage limit"
          />
          <p>Note - If not set it is set for unlimited period</p>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mt-3">
          <Form.Label>Select Course: </Form.Label>
          <select
            value={selectedOptions}
            onChange={handleOnclickOption}
            multiple="multiple"
            className="form-control"
          >
            <option value=""> - Select Course - </option>
            {courseList}
          </select>
          <p>Note - If not set it is for all courses</p>
        </Col>
        <Col md={6} className="mt-3">
          <Form.Label>Expiry Date: </Form.Label>
          <Form.Control
            type="date"
            name="expiry_date"
            placeholder="Enter expiry date"
          />
          <p>Note - If not set it is set for unlimited period</p>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mt-3">
          <Form.Label>Coupon Type: </Form.Label>
          <Form.Control as="select" name="coupon_type" required>
            <option value=""> - Select Type - </option>
            <option value="1">Total cart percentage</option>
            <option value="2">Total cart value</option>
          </Form.Control>
          <p>* Mandatory Field</p>
        </Col>
        <Col md={6} className="mt-3">
          <Form.Label>Set Value:</Form.Label>
          <Form.Control
            type="text"
            name="discount_value"
            placeholder="Enter discount value."
            required
          />
          <p>* Mandatory Field</p>
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
            <Alert
              variant={response.success ? "info" : "danger"}
              className="p-3 mt-2 text-center"
            >
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
