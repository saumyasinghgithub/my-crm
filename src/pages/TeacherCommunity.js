import React, { useEffect, useState, useContext} from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import {useParams} from "react-router-dom";

import Utils from './../Utils';

import _ from 'lodash';
import UserContext from './../contexts/UserContext';

const TeacherCommunity = (props) => {
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
    <div className="container">
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
        </div>
            <div className='col-lg-9 col-md-9 col-12 pt-2 pb-1'>
            <img className="img-fluid imgTransfer" src={`${process.env.REACT_APP_API_URL}/uploads/community/${encodeURI(trainer.community[0].community_image)}`} alt="service" />
            </div>
        </div>

        <div className="serviceWrapper container"> 
            <div className="serviceHeading">                
                <h1 className="headingtext slideInUp wow ">03 Knowledge<ul className="profile-socail-icon">
                    <li><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li>
                    <li><a href=""><img src="/assets/images/link-icon.png" alt="ad eyes" /></a></li>
                </ul></h1>
                <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{__html:trainer.community[0].about_community}}></div>
            </div>
            <div className="knowledgBody">
               <div className="freeResouces lineANimation slideInUp wow ">Free Resources</div>
               <div className="row">
                   <div className="col-sm-6 col-md-4">
                       <div className="knowledgeBox slideInUp wow ">
                           <div className="knowledgeImg">
                                <img className="img-fluid" src="/assets/images/knowledge_1.jpg" alt="ad blog" />
                           </div>
                           <div className="knowledgeTitle">
                            Personal Financial Well-Being Understanding Your Financial Life
                           </div>
                           <div className="knowledgeBody">
                            By Ben Jacobs | Publish Date
                           </div>
                           <div className="knowledgeFooter clearfix">
                               <div className="FText">Blog</div>
                               <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="/assets/images/share-icon.png" alt="ad share" /></a></li></ul>
                           </div>
                       </div>
                   </div>
                   <div className="col-sm-6 col-md-4">
                        <div className="knowledgeBox slideInUp wow ">
                            <div className="knowledgeImg">
                                <img className="img-fluid" src="/assets/images/knowledge_2.jpg" alt="ad blog" />
                            </div>
                            <div className="knowledgeTitle">
                            Personal Financial Well-Being Understanding Your Financial Life
                            </div>
                            <div className="knowledgeBody">
                            By Ben Jacobs | Publish Date
                            </div>
                            <div className="knowledgeFooter clearfix">
                                <div className="FText">Blog</div>
                                <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li></ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="knowledgeBox slideInUp wow ">
                            <div className="knowledgeImg">
                                    <img className="img-fluid" src="/assets/images/knowledge_3.jpg" alt="ad blog"/>
                            </div>
                            <div className="knowledgeTitle">
                                Personal Financial Well-Being Understanding Your Financial Life
                            </div>
                            <div className="knowledgeBody">
                                By Ben Jacobs | Publish Date
                            </div>
                            <div className="knowledgeFooter clearfix">
                                <div className="FText">Video</div>
                                <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li></ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="knowledgeBox slideInUp wow ">
                            <div className="knowledgeImg">
                                <img className="img-fluid" src="/assets/images/knowledge_4.jpg" alt="ad blog"/>
                            </div>
                            <div className="knowledgeTitle">
                                Personal Financial Well-Being Understanding Your Financial Life
                            </div>
                            <div className="knowledgeBody">
                                By Ben Jacobs | Publish Date
                            </div>
                            <div className="knowledgeFooter clearfix">
                                <div className="FText">Book</div>
                                <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="/assets/images/share-icon.png" alt="ad share" /></a></li></ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="knowledgeBox slideInUp wow ">
                            <div className="knowledgeImg">
                                    <img className="img-fluid" src="/assets/images/knowledge_5.jpg" alt="ad blog"/>
                            </div>
                            <div className="knowledgeTitle">
                                Personal Financial Well-Being Understanding Your Financial Life
                            </div>
                            <div className="knowledgeBody">
                                By Ben Jacobs | Publish Date
                            </div>
                            <div className="knowledgeFooter clearfix">
                                <div className="FText">Book</div>
                                <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="/assets/images/share-icon.png"  alt=""/></a></li></ul>
                            </div>
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

export default TeacherCommunity;