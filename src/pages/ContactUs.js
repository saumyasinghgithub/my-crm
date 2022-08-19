import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const ContactUs = (props) => {
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
                <form className="form contact" action="http://demo.knowledgesynonyms.com/adnew/index.php/default/contact/index/post/" id="contact-form" method="post" data-hasrequired="* Required Fields" novalidate="novalidate">
                    <fieldset className="fieldset">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="field name required">
                                    <div className="control">
                                        <input name="name" id="name" placeholder="Name" title="Name" className="input-text" type="text" data-validate="{required:true}" aria-required="true"></input>
                                    </div>
                                </div>
                                <div className="field telephone">
                                    <div className="control">
                                        <input name="telephone" id="telephone" placeholder="Phone Number" title="Phone Number" className="input-text" type="number"></input>
                                    </div>
                                </div>
                                <div className="field email required">
                                    <div className="control">
                                        <input name="email" id="email" placeholder="Email" title="Email"  className="input-text" type="email" data-validate="{required:true, 'validate-email':true}" aria-required="true"></input>
                                    </div>
                                </div>
                                <div className="field 	address required">
                                    <div className="control">
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="field comment required">
                                    <div className="control">
                                        <textarea placeholder="What’s on your mind?" name="comment" id="comment" title="What’s on your mind?" className="input-text" cols="5" rows="3" data-validate="{required:true}" aria-required="true" spellcheck="false"></textarea>
                                    </div>
                                </div>
                                <div className="actions-toolbar">
                                    <div className="primary">
                                        <input type="hidden" name="hideit" id="hideit" value=""></input>
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