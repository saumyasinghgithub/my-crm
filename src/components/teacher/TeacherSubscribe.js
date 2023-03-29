import React, { useRef, useState } from "react";
import Utils from '../../Utils';
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useParams } from "react-router-dom";
import { Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const TeacherSubscribe = (props) => {
    const [modal, setModal] = useState(true);
    const [email, setEmail] = useState('');
    const toggle = () => setModal(!modal);
    const frmRef = useRef('SubscribeForm');
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const inLine = props.type;

    const trainerSlug = Utils.getUserData().slug;
    const trainerUrl = Utils.getTrainerURL("", trainerSlug);
    const trainerFullName = Utils.getUserData().firstname + ' ' + Utils.getUserData().middlename + ' ' + Utils.getUserData().lastname;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSave = (event) => {
        const frm = frmRef.current;
        event.preventDefault();
        let frmdata = new FormData(frm);
        console.log(`Email: ${email}, trainerUrl: ${trainerUrl}`);

        let params = `?email=${email}&trainerUrl=${trainerUrl}`;
        if (email) {
            axios.get(Utils.apiUrl('trainer/subscribers' + params), Utils.apiHeaders()).then(res => {
                if (res.data.length > 0) {
                    setMessage("You have already subscribed for this trainer");
                } else {
                    axios.post(Utils.apiUrl(`trainer/subscribe`), frmdata, Utils.apiHeaders({ token: token }))
                        .then(res => {
                            setMessage("Thank You for subscribing with us !");
                        }).catch(err => {
                            console.log(err);
                        });
                }
            });
        } else {
            setMessage("Please enter your email address !");
        }
    };

    return (<div>
        {inLine ? (
            <div class="landingUpEvent">
                <div class="SubsTextBox">
                    <div class="SubsInputBox">
                        <form ref={frmRef} onSubmit={handleSubmit(onSave)} method="post">
                            <div className="row">
                                <div className="col-md-5 col-md-offset-3 contactSubs">
                                    <input type="hidden" name="trainerUrl" value={trainerUrl} />
                                    <input placeholder="Please enter your email here for subscription" type="email" className="input-text form-control landingpageInput p-3" name="email" id="email" {...register("email", { required: true})} />
                                    <p className="mt-4 text-left subsmessage">{message}</p>
                                </div>
                                <div className="col-md-2 col-md-offset-2 contactSubs">
                                    <div class="HomeRegister SubmitHomeSubscribe"> <Button className="" color="secondary" type="submit" onClick={handleSubmit(onSave)}>SUBSCRIBE</Button>{' '}</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        ) : (
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Subscription</ModalHeader>
                <ModalBody>
                    <p>Subscribe to our newsletter and be the first to know about new courses, special offers, and events!</p>
                    <p>To sign up, simply enter your email address below and click "Subscribe".</p>
                    <p>By subscribing, you agree to receive occasional marketing emails from us. We promise not to spam you, and you can unsubscribe at any time.</p>
                    <p><b>{message}</b></p>
                    <form ref={frmRef} onSubmit={handleSubmit(onSave)} method="post">
                        <FormGroup>
                            <input type="hidden" name="trainerUrl" value={trainerUrl} />
                            <input placeholder="Please enter your email here for subscription" type="email" className="input-text form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} {...register("email", { required: true})}/>
                        </FormGroup>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" type="submit" onClick={handleSubmit(onSave)}>Subscribe</Button>{' '}
                </ModalFooter>
            </Modal>
        )
        }

    </div >);
}

export default TeacherSubscribe;