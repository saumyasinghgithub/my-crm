import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const About = (props) => {
    useEffect(window.scrollEffect, []);

    return (<>
        <Container className="h-100 p-0">
            <div className="profile-wrapper">

                <div className="container">
                    {/*<nav>
                        <ol className="cd-breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li className="current"><em>About Us</em></li>
                        </ol>
    </nav>*/}
                    <div className="headingBold text-center text-uppercase">About us</div>

                    <div className='pt-5'>
                        <div className='row'>
                            <div className='col-lg-7 col-md-12 col-12'>
                                <div className="slideInUp wow aboutcontent">
                                    <p>Autodidact was launched with the vision to provide a digital marketplace for both Trainers and Learners worldwide.</p>
                                    <p>It is the first global trainers and instructors listing with an elaborated and scientific rating and filtration engine. These filters will help corporates and executives look for and reach out to the most appropriate trainers for their content training, coaching and consulting needs.</p>
                                    <p>It allows Trainers to create a free digital presence and identity, that will help them market themselves to prospective trainees, students, executives and organisations looking for professional engagement beyond content.</p>
                                </div>
                            </div>
                            <div className='col-lg-5 col-md-12 col-12'>
                            <div className="slideInUp wow">
                <img src="assets/images/404-banner.jpg" className="img-fluid imgTransfer" alt="AD About" />
            </div>
                            </div>
                        </div>
                        <div className="slideInUp wow aboutcontent pt-4">
                        <p>They can create their own digital learning asset catalogue along with services portfolio. Trainers can create a digital presence and sell (Modes of training) Training and Performance improvement tools, assets, curriculums and services to anyone anywhere in the world.</p>
                <p>Its advanced filter system helps Learners find trainers or performance improvement consultants whose programs will help them improve their business relevancy.</p>
                </div>
                    </div>


                    {/* <div className="flex404 pt-2">
            <div className="flexItem40 slideInUp wow">
                <p>Autodidact was launched with the vision to provide a digital marketplace for both Trainers and Learners worldwide.</p>
                <p>It is the first global trainers and instructors listing with an elaborated and scientific rating and filtration engine. These filters will help corporates and executives look for and reach out to the most appropriate trainers for their content training, coaching and consulting needs.</p>
                <p>It allows Trainers to create a free digital presence and identity, that will help them market themselves to prospective trainees, students, executives and organisations looking for professional engagement beyond content.</p>
                <p>They can create their own digital learning asset catalogue along with services portfolio. Trainers can create a digital presence and sell (Modes of training) Training and Performance improvement tools, assets, curriculums and services to anyone anywhere in the world.</p>
                <p>Its advanced filter system helps Learners find trainers or performance improvement consultants whose programs will help them improve their business relevancy.</p>
            </div>
            <div className="flexItem60 slideInUp wow">
                <img src="assets/images/404-banner.jpg" className="img-fluid imgTransfer" alt="AD About" />
            </div>
        </div> */}
                </div>
            </div>
        </Container>
    </>);
};

export default About;