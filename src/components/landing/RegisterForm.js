import React, { useEffect, useState, useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import UserContext from "../../contexts/UserContext";
import Utils from "../../Utils";
import { Button } from 'reactstrap';
import _ from "lodash";
const RegisterForm = (props) => {
    const slug = Utils.subdomain();
    const [modal, setModal] = useState(true);
    const toggle = () => setModal(!modal);
    const { getServerData,setServerData} = useContext(UserContext);
    const [saving, setSaving] = useState(false);
    const [response, setResponse] = useState({ success: false, message: "" });
    const [trainer, setTrainer] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getServerData(`trainer/landing/${slug}`, true)
          .then((tData) => {
            console.log(tData);
            setTrainer(tData);
            setLoading(false);
          })
          .catch((msg) => {
            setTrainer({ success: false, message: msg });
            setLoading(false);
          });
      }, []);
    const onSave = (e) => {
        const frm = e.currentTarget;
        e.preventDefault();
        let frmdata = new FormData(frm);
        console.log('frmdata'+JSON.stringify(frmdata));
        setSaving(true);
        setServerData('trainer/addevent-participant', frmdata,'post')
          .then(res => {
            setSaving(false);
            setResponse(res);
          });
      }
    return (<>        
        <Modal.Header className="justify-content-center" closeButton>
            <Modal.Title>
                <div className="UpEventText text-center">
                    <h3>KICKSTART MY HEART</h3>
                    <h4>Virtual Event - A Podcast Series</h4>
                </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-3">Please complete the form to register for the event.
            <br></br>
            <Form onSubmit={onSave}>
                {_.get(trainer, "events", []).map((event, idx) => (
                    <Form.Control name="trainer_event_id" type="hidden" value={event.id} required />
                ))}
                <Form.Group className="mt-3 mb-2">
                    <Form.Control name="name" type="text" placeholder="Enter Name" required />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control name="email" type="email" placeholder="Enter Email" required />
                </Form.Group>
                <div className="HomeRegister JoinButtonModal">
                    <Button type="submit" className="mt-5 w-100 text-left">
                        Register
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    </>);
};
export default RegisterForm;