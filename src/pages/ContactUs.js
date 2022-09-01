import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import Utils from './../Utils';
import axios from 'axios';
import _ from 'lodash';
import validator from 'validator';

const ContactUs = (props) => {
    const frmRef = useRef('ContactForm');
 
    const [showMessage,setShowMessage] = useState(false);
    const $ = window.$;
    const [error,setError] = useState(false);

    const submitForm = (e) => {
        
        const frm = frmRef.current;
        e.preventDefault();
        frm.classList.add('was-validated');
        if (frm.checkValidity() === false) {
         return false;
       }
        setError(false);
        setShowMessage(false);
        let frmdata = new FormData(frm);
        axios.post(Utils.apiUrl(`contact/add`),frmdata,Utils.apiHeaders())     
        .then(res => {
           if(res.data.success){
              setShowMessage(true);
           }else{
              throw(res.data);
           }
           
        }).catch(err  => {
            setError(err.message)
            //console.log(err);
        }
            ) 
    
      };  

    useEffect(window.scrollEffect, []);

    return (<>
        <Container className="h-100 ">
            <div className="help-wrapper">
                <nav>
                    <ol className="cd-breadcrumb">
                        <li><a href="/">Home</a></li>
                        <li className="current"><em>Contact Us</em></li>
                    </ol>
                </nav>
                <div className="">
                    <img src="assets/images/contact.jpg" className='img-fluid' alt="" />
                    <h1 className="slideInUp wow animated pt-4 pb-4 mb-0">Contact us</h1>
                    <p className="slideInUp wow animated pb-4">Reach out to us, if you have questions, requests or simply want to talk, <a href='mailto:dropamessage@ad.com'>dropamessage@ad.com</a></p>
                </div>
                <form ref={frmRef} className="form contact needs-validation" id="contact-form" method="post" noValidate onSubmit={submitForm}>
                    { showMessage &&  
                        <div className='alert alert-info p-3'>                    
                            <strong>Record saved successfully!</strong>
                        </div>
                    }
                    { error !== false && 
                        <div className='alert alert-danger p-3'>
                            <strong>{error}</strong>
                        </div>
                    }
                    <fieldset className="fieldset">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="field name required">
                                    <div className="control">
                                        <input name="name" id="name" placeholder="Name" title="Name" className="input-text form-control" type="text" required />
                                        <div className="invalid-feedback">Full name is required!</div>
                                    </div>
                                </div>
                                <div className="field telephone">
                                    <div className="control">
                                        <input name="phone" id="telephone" placeholder="Phone Number" title="Phone Number" className="input-text form-control" type="number" required />
                                        <div className="invalid-feedback">Phone number is required!</div>
                                    </div>
                                </div>
                                <div className="field email required">
                                    <div className="control">
                                        <input name="email" id="email" placeholder="Email" title="Email"  className="input-text form-control" type="email" required />
                                        <div className="invalid-feedback">Email address is required!</div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="field comment required">
                                    <div className="control">
                                        <textarea placeholder="What’s on your mind?" name="message" id="message" title="What’s on your mind?" className="input-text" cols="5" rows="3" data-validate="{required:true}" aria-required="true" spellcheck="false"></textarea>
                                    </div>
                                </div>
                                <div className="actions-toolbar">
                                    <div className="primary">
                                        <button type="submit" title="Submit" className="action submit submitbtn">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                </form>
            </div>
        </Container>
    </>);
};

export default ContactUs;