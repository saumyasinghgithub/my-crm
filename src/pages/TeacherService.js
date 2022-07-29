import React, { useEffect, useState, useContext} from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import {useParams} from "react-router-dom";

import Utils from './../Utils';

import _ from 'lodash';
import UserContext from './../contexts/UserContext';

const TeacherService = (props) => {
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
            <div className="container100">
            <div className="profiletabBox">
            <ul className="profileTab slideInUp wow">
                <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/about`} >01 About</a></li>
                <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/service`}>02 Services</a></li>
                <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/knowledge`}>03 Knowledge</a></li>
                <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/community`}>04 Community</a></li>
                <li className="lineANimation"><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/library`}trainer-library>05 Library</a></li>
            </ul>           
            </div> 
            <div className="serviceWrapper container">
                <div className="profileHeading">
                    <img className="img-fluid imgTransfer" src={`${process.env.REACT_APP_API_URL}/uploads/service/${encodeURI(trainer.services[0].service_image)}`} alt="service" />
                </div>  
                <div className="serviceHeading">                
                    <h1 className="headingtext slideInUp wow ">02 What I offer <ul className="profile-socail-icon">
                        <li><a href=""><img src="/assets/images/share-icon.png" alt="service" /></a></li>
                        <li><a href=""><img src="/assets/images/link-icon.png" alt="service" /></a></li>
                    </ul></h1>
                </div>
                <div className="serviceBody">
                    <div className="awardTextInner awardwithoutLine">
                        <div className="awadText slideInUp wow " dangerouslySetInnerHTML={{__html:trainer.services[0].service_offer}}></div>
                    </div>
                    <div className="servicesTextBox slideInUp wow ">
                        <div className="row">
                            <div className="col-sm-2">
                                <div className="Sheading">Consultancy</div>
                            </div>
                            <div className="col-sm-10" >
                            <div dangerouslySetInnerHTML={{__html:trainer.services[0].consultancy}}></div>    
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
                            <div dangerouslySetInnerHTML={{__html:trainer.services[0].coaching}}></div> 
                                <div className="dropMsg lineANimation" data-toggle="modal" data-target="#dropMsgModal">Drop a message!</div>
                            </div>
                        </div>
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

export default TeacherService;