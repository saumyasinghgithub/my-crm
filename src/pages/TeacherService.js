import React,{useEffect} from 'react';
import {Container} from 'react-bootstrap';

const TeacherService = (props) => {
    useEffect(window.scrollEffect,[]);

    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper">
    <div className="container100">
        <div className="profiletabBox">
            <ul className="profileTab slideInUp wow ">
                <li><a href={`${process.env.PUBLIC_URL}/view-profile`} >01 About</a></li>
                <li><a href={`${process.env.PUBLIC_URL}/trainer-service`}>02 Services</a></li>
                <li><a href={`${process.env.PUBLIC_URL}/trainer-knowledge`}>03 Knowledge</a></li>
                <li><a href="">04 Community</a></li>
                <li className="lineANimation"><a href={`${process.env.PUBLIC_URL}/trainer-library`}trainer-library>05 Library</a></li>
            </ul>            
        </div> 
        <div className="serviceWrapper container">
            <div className="profileHeading">
                <img className="img-fluid imgTransfer" src="assets/images/service-img.jpg" alt="service" />
            </div>  
            <div className="serviceHeading">                
                <h1 className="headingtext slideInUp wow ">02 What I offer <ul className="profile-socail-icon">
                    <li><a href=""><img src="assets/images/share-icon.png" alt="service" /></a></li>
                    <li><a href=""><img src="assets/images/link-icon.png" alt="service" /></a></li>
                </ul></h1>
            </div>
            <div className="serviceBody">
                <div className="awardTextInner awardwithoutLine">
                    <div className="awadText slideInUp wow ">
                        <p>Omnis et atet labo. Nem quiamus, voloribus et omnihicatque volorpor accaeprat dolupta tibus, venimus 
                                dolorroris dollandam et aut di ne quaspis ea debitatur aute. Vit fugias dus aut reratiis ent eos ape... </p>
                        <p className="italicText">“As ea perisque aut quibusamet as recto maximet ut ex excepere nobitatum consenes debis dolupta audit que volupta 
                                sitintorro et, nosandit mos estrunt.”  </p>
                    </div>
                </div>
                <div className="servicesTextBox slideInUp wow ">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="Sheading">Consultancy</div>
                        </div>
                        <div className="col-sm-10">
                            <p>Omnis et atet labo. Nem quiamus, voloribus et omnihicatque vol-
                                orpor accaeprat dolupta tibus, venimus. Rovid quia doluptatur as 
                                et, corem ent inversp.</p>
                            <div className="dropMsg lineANimation" data-toggle="modal" data-target="#dropMsgModal">Drop a message!</div>
                        </div>
                    </div>
                </div>
                <div className="servicesTextBox slideInUp wow ">
                    <div className="row">
                        <div className="col-sm-2">                            
                            <div className="Sheading">Coaching </div>
                        </div>
                        <div className="col-sm-10">
                            <p>Omnis et atet labo. Nem quiamus, voloribus et omnihicatque vol-
                                orpor accaeprat dolupta tibus, venimus. Rovid quia doluptatur as 
                                et, corem ent inversp.</p>
                            <div className="dropMsg lineANimation" data-toggle="modal" data-target="#dropMsgModal">Drop a message!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>              
    </div>

</div>
    </Container>
</>);
};

export default TeacherService;