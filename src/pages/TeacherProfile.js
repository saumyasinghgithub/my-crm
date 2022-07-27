import React, { useEffect, useState, useContext} from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';

import {useParams} from "react-router-dom";

import Utils from './../Utils';

import _ from 'lodash';

import UserContext from './../contexts/UserContext';

const TeacherProfile = (props) => {
    
    const { slug } = useParams();

    const [trainer, setTrainer] = useState({});

    const [loading, setLoading] = useState(true);

    const {getServerData} = useContext(UserContext);

    useEffect(()=>{
        getServerData(`trainer/profile/${slug}`,true)
        .then(tData => {
            setTrainer(tData);
            setLoading(false);
        })
        .catch(msg=> {
            setTrainer({success: false, message: msg});
            setLoading(false);
        });
    },[]);

    useEffect(window.scrollEffect, [trainer]);

    return (<>
        <Container fluid className="h-100 p-0">
            
            {loading && <>
                <div className="profile-wrapper">
                    <div className='container'>
                        <h1>Trainer</h1>
                        <Alert variant="warning"><div className="m-5">Looking for trainer details <Spinner animation="border" size="sm" /></div></Alert>
                    </div>
                </div>
            </>}

            {!loading && <>
                {_.get(trainer,'success',false)===false && <>
                    <div className="profile-wrapper">
                        <div className='container'>
                            <h1>Trainer</h1>
                            <Alert variant="danger"><div className="m-5">{trainer.message}</div></Alert>
                        </div>
                    </div>
                </>}

                {_.get(trainer,'success',false)!==false && <>
                    <div className="profile-wrapper">
                        <div className='container'>
                        <nav>
                                <ol class="cd-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li class="current"><em>{trainer.about.firstname} {trainer.about.lastname}</em></li>
                                </ol>
                            </nav>
                            <div className='row'>
                                <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>
                                    <div className="profiletabBox">
                                    <ul className="profileTab slideInUp wow">
                                        <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/about`} >01 About</a></li>
                                        <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/service`}>02 Services</a></li>
                                        <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/knowledge`}>03 Knowledge</a></li>
                                        <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/community`}>04 Community</a></li>
                                        <li className="lineANimation"><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/library`}trainer-library>05 Library</a></li>
                                    </ul>   
                                    </div>
                                    <div className="slideInUp wow ">
                                        <div className="teacherdetails">
                                            <p>Joined 26/04/2018<br />
                                                Students 145<br />
                                                Courses 21</p>
                                            <div className="profileFollowList">
                                                <h5>Follow Ben on</h5>
                                                <ul>
                                                    <li><a target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li><a target="_blank"><i className="fab fa-instagram"></i></a></li>
                                                    <li><a href="" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="" target="_blank"><i className="fab fa-pinterest-p"></i></a></li>
                                                    <li><a href="" target="_blank"><i className="fab fa-twitter"></i></a></li>
                                                    <li><a href="" target="_blank"><i className="fab fa-youtube"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-9 col-md-9 col-12 pt-2 pb-1'>
                                <div className="profileHeading teacherheading">
                                        <h1 className="headingtext wow zoomIn">{trainer.about.firstname} {trainer.about.lastname}</h1>
                                        <ul className="profile-socail-icon">
                                            <li className='mr-2'><a href=""><img src="assets/images/share-icon.png" alt="icons" /></a></li>
                                            <li><a href=""><img src="assets/images/link-icon.png" alt="icons" /></a></li>
                                        </ul>
                                        <div className="sendMsg">Send Message <img src="assets/images/send-icon.png" alt="icons" /></div>
                                    </div>
                                    <img className="img-fluid imgTransfer pt-3" src="assets/images/umesh_1.jpeg" alt='profile' />
                                
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="aboutMe-pr0fle slideInUp wow ">
                                <h1 className="headingtext mt-4">01 About me</h1>
                                <div className="awardTextInner awardwithoutLine">
                                    <div className="awadText">
                                        <p>Omnis et atet labo. Nem quiamus, voloribus et omnihicatque volorpor accaeprat dolupta tibus, venimus
                                            dolorroris dollandam et aut di ne quaspis ea debitatur aute. Vit fugias dus aut reratiis ent eos ape... </p>
                                        <p className="italicText">“As ea perisque aut quibusamet as recto maximet ut ex excepere nobitatum consenes debis dolupta audit que volupta
                                            sitintorro et, nosandit mos estrunt.”  </p>
                                    </div>
                                </div>
                            </div>

                            <div className="profileTabQu slideInUp wow ">
                                <ul className="nav">
                                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#academicContent">Academic Qualification</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#experienceContent">Experiences</a></li>
                                </ul>
                                <div className="tab-content pt-4">
                                    <div className="profileContent tab-pane active" id="academicContent">
                                        <div className="input-flex-container">
                                            <div className="input">
                                            </div>
                                            <div className="input">
                                                <span data-year="2000" data-info="10th"></span>
                                            </div>
                                            <div className="input">
                                                <span data-year="2002" data-info="12th"></span>
                                            </div>
                                            <div className="input">
                                                <span data-year="2005" data-info="BCA"></span>
                                            </div>
                                            <div className="input">
                                                <span data-year="2008" data-info="MCA"></span>
                                            </div>
                                            <div className="input">
                                                <span data-year="2012" data-info="PHD"></span>
                                            </div>
                                            <div className="input">
                                                <span data-year="Year Degree" data-info=""></span>
                                            </div>
                                            <div className="input">
                                                <span data-year="Year Degree" data-info=""></span>
                                            </div>
                                            <div className="input">
                                                <span data-year="Year Degree" data-info=""></span>
                                            </div>
                                            <div className="input">
                                                <span data-year="Year Degree" data-info=""></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profileContent tab-pane fade" id="experienceContent">
                                        <img className="img-fluid" src="assets/images/experience.png" alt='exp' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="awradwrapper">
                        <div className="container pt-5">
                            <img className="img-fluid inline-photo show-on-scroll" src="assets/images/bannerProfile.jpg" alt="profile" />
                        </div>
                        <div className="container">
                            <div className="awardTextWrapper">
                                <h1 className="headingtext slideInUp wow">Award <br /> Certifications </h1>
                                <div className="awardTextInner">
                                    <div className="awadText slideInUp wow ">
                                        <span className="awardYear">Year</span>      <span className="boldText">Certification/Award Name</span> | Issuing of Organization | Date  and Experiation Date
                                        Credential ID | Credential URL
                                    </div>
                                    <div className="awadText slideInUp wow ">
                                        <span className="awardYear">Year</span>      <span className="boldText">Certification/Award Name</span> | Issuing of Organization | Date  and Experiation Date
                                        Credential ID | Credential URL
                                    </div>
                                    <div className="awadText slideInUp wow ">
                                        <span className="awardYear">Year</span>      <span className="boldText">Certification/Award Name</span> | Issuing of Organization | Date  and Experiation Date
                                        Credential ID | Credential URL
                                    </div>
                                    <div className="awadText slideInUp wow ">
                                        <span className="awardYear">Year</span>      <span className="boldText">Certification/Award Name</span> | Issuing of Organization | Date  and Experiation Date
                                        Credential ID | Credential URL
                                    </div>
                                    <div className="awadText slideInUp wow ">
                                        <span className="awardYear">Year</span>      <span className="boldText">Certification/Award Name</span> | Issuing of Organization | Date  and Experiation Date
                                        Credential ID | Credential URL
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trainingWrapper">
                        <div className="container">
                            <div className="awardTextWrapper">
                                <h1 className="headingtext slideInUp wow ">Trainings Conducted</h1>
                                <div className="awardTextInner awardwithoutLine">
                                    <div className="awadText slideInUp wow ">
                                        <p className="boldText">Training Name       Duration    Start -/ End date       Location </p>
                                        <p>Nis volut errovidem quam haris nisinve rempor ad modi volore nam nonsed molut velent, sequis ma in estintiatint velest adi od magnimi litaepr eicidus simodipis.</p>
                                    </div>
                                    <div className="awadText slideInUp wow ">
                                        <p className="boldText">Training Name       Duration    Start -/ End date       Location </p>
                                        <p>Nis volut errovidem quam haris nisinve rempor ad modi volore nam nonsed molut velent, sequis ma in estintiatint velest adi od magnimi litaepr eicidus simodipis.</p>
                                    </div>
                                    <div className="awadText slideInUp wow ">
                                        <p className="boldText">Training Name       Duration    Start -/ End date       Location </p>
                                        <p>Nis volut errovidem quam haris nisinve rempor ad modi volore nam nonsed molut velent, sequis ma in estintiatint velest adi od magnimi litaepr eicidus simodipis.</p>
                                    </div>
                                    <div className="awadText slideInUp wow ">
                                        <p className="boldText">Training Name       Duration    Start -/ End date       Location </p>
                                        <p>Nis volut errovidem quam haris nisinve rempor ad modi volore nam nonsed molut velent, sequis ma in estintiatint velest adi od magnimi litaepr eicidus simodipis.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}

            </>}
        </Container>
    </>);
};

export default TeacherProfile;