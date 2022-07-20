import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const ContactUs = (props) => {
    useEffect(window.scrollEffect, []);

    return (<>
        <Container className="h-100 ">
            <div className="help-wrapper">
                <nav>
                    <ol class="cd-breadcrumb">
                        <li><a href="/">Home</a></li>
                        <li class="current"><em>Contact Us</em></li>
                    </ol>
                </nav>
                <div className="">
                    <img src="assets/images/contact.jpg" className='img-fluid' alt="" />
                    <h1 class="slideInUp wow animated pt-4 pb-4 mb-0">Contact us</h1>
                    <p class="slideInUp wow animated pb-4">Reach out to us, if you have questions, requests or simply want to talk, <a href='mailto:dropamessage@ad.com'>dropamessage@ad.com</a></p>
                </div>
                <form class="form contact" action="http://demo.knowledgesynonyms.com/adnew/index.php/default/contact/index/post/" id="contact-form" method="post" data-hasrequired="* Required Fields" novalidate="novalidate">
                    <fieldset class="fieldset">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="field name required">
                                    <div class="control">
                                        <input name="name" id="name" placeholder="Name" title="Name" class="input-text" type="text" data-validate="{required:true}" aria-required="true"></input>
                                    </div>
                                </div>
                                <div class="field telephone">
                                    <div class="control">
                                        <input name="telephone" id="telephone" placeholder="Phone Number" title="Phone Number" class="input-text" type="number"></input>
                                    </div>
                                </div>
                                <div class="field email required">
                                    <div class="control">
                                        <input name="email" id="email" placeholder="Email" title="Email"  class="input-text" type="email" data-validate="{required:true, 'validate-email':true}" aria-required="true"></input>
                                    </div>
                                </div>
                                <div class="field 	address required">
                                    <div class="control">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="field comment required">
                                    <div class="control">
                                        <textarea placeholder="What’s on your mind?" name="comment" id="comment" title="What’s on your mind?" class="input-text" cols="5" rows="3" data-validate="{required:true}" aria-required="true" spellcheck="false"></textarea>
                                    </div>
                                </div>
                                <div class="actions-toolbar">
                                    <div class="primary">
                                        <input type="hidden" name="hideit" id="hideit" value=""></input>
                                        <button type="submit" title="Submit" class="action submit submitbtn">
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