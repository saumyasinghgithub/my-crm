import { useEffect, useContext, useState } from 'react';
import { Form, Alert, Spinner, Row, Col, Button, Modal } from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';
import Utils from './../../Utils';

const CouponForm = (props) => {
    const [mode, setMode] = useState('Add');
    const [mycoupon, setMycoupon] = useState({});
    const [saving, setSaving] = useState(false);
    const [response, setResponse] = useState({success: false, message: ""});
    const onSave = (e) => {
        const frm = e.currentTarget;
        e.preventDefault();
        let frmdata = new FormData(frm);
    }
    const renderForm = () => <Form onSubmit={onSave}>
        <Row>
            <Col md={6} className="mt-3">
                <Form.Label>Coupon Code: </Form.Label>
                <Form.Control type="text" name="coupon_code" placeholder="Enter coupon code"  />
            </Col>
            <Col md={6} className="mt-3">
                <Form.Label>Usage Limit: </Form.Label>
                <Form.Control type="number" name="usage_limit" placeholder="Enter usage limit"  />
            </Col>
        </Row>
        <Row>
            <Col md={6} className="mt-3">
                <Form.Label>Select Course: </Form.Label>
                <Form.Control type="date" name="expiry_date" placeholder="Enter expiry date"  />
            </Col>
            <Col md={6} className="mt-3">
                <Form.Label>Expiry Date: </Form.Label>
                <Form.Control type="date" name="expiry_date" placeholder="Enter expiry date"  />
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

    const renderModal = () => <Modal show={true} size="xl" onHide={_.get(props, "onClose", "")}>
        <Modal.Header closeButton>
            <Modal.Title>{mode} Coupon</Modal.Title>
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
export default CouponForm;