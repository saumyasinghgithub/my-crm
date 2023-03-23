import React, { useRef, useState } from "react";
import Utils from '../../Utils';
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { useParams } from "react-router-dom";
import { Col } from 'react-bootstrap';

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

    const handleSubmit = (event) => {
        const frm = frmRef.current;
        event.preventDefault();
        let frmdata = new FormData(frm);
        console.log(`Email: ${email}, trainerUrl: ${trainerUrl}`);

        let params = `?email=${email}&trainerUrl=${trainerUrl}`;
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
    };

    return (<div>
        {inLine ? (
            // <div className="landingSubBlock">
            //     <h3 className="landingAlign">Subscribe to Our Rescue RN™ Newsletter</h3>
            //     <Col md={8} className="subsCol">
            //         <form ref={frmRef} onSubmit={handleSubmit} method="post">
            //             <Col md={8} className="formItems">
            //                 <label>Email*</label>
            //                 <input type="hidden" name="trainerUrl" value={trainerUrl} />
            //                 <input placeholder="Please enter your email here for subscription" type="email" className="input-text form-control landingpageInput" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            //                 <p><b>{message}</b></p>
            //             </Col>
            //             <Col md={8} className="formBtn">
            //                 <Button className="btnSubmitSubs" color="secondary" type="submit" onClick={handleSubmit}>Submit</Button>{' '}
            //             </Col>                        
            //         </form>
            //     </Col>
            // </div>
            <div class="landingUpEvent">
                {/* <div class="landingSubsBox"> */}
                <div class="SubsTextBox">
                    {/* <div class="subText">Subscribe to Our Rescue RN™ Newsletter</div> */}
                    <div class="SubsInputBox">
                        <form ref={frmRef} onSubmit={handleSubmit} method="post">
                            <div className="row">
                                <div className="col-md-5 col-md-offset-3">
                                    <input type="hidden" name="trainerUrl" value={trainerUrl} />
                                    <input placeholder="Please enter your email here for subscription" type="email" className="input-text form-control landingpageInput p-3" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <p className="mt-4 text-left subsmessage">{message}</p>
                                </div>
                                <div className="col-md-2 col-md-offset-2">
                                    <div class="HomeRegister SubmitHomeSubscribe"> <Button className="" color="secondary" type="submit" onClick={handleSubmit}>SUBSCRIBE</Button>{' '}</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* </div> */}
            </div>
        ) : (
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Subscription</ModalHeader>
                <ModalBody>
                    <p>Subscribe to our newsletter and be the first to know about new courses, special offers, and events! from {trainerFullName}</p>
                    <p>To sign up, simply enter your email address below and click "Subscribe".</p>
                    <p>By subscribing, you agree to receive occasional marketing emails from us. We promise not to spam you, and you can unsubscribe at any time.</p>
                    <p><b>{message}</b></p>
                    <form ref={frmRef} onSubmit={handleSubmit} method="post">
                        <FormGroup>
                            <input type="hidden" name="trainerUrl" value={trainerUrl} />
                            <input placeholder="Please enter your email here for subscription" type="email" className="input-text form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" type="submit" onClick={handleSubmit}>Subscribe</Button>{' '}
                </ModalFooter>
            </Modal>
        )
        }

    </div >);
}

export default TeacherSubscribe;