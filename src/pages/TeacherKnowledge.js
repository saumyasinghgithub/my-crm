import React,{useEffect} from 'react';
import {Container} from 'react-bootstrap';

const TeacherKnowledge = (props) => {
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
        <div className="knowledgeWrapper container">
            <div className="knowledgHeading">                
                <h1 className="headingtext slideInUp wow ">03 Knowledge<ul className="profile-socail-icon">
                    <li><a href=""><img src="assets/images/share-icon.png" alt="ad eyes" /></a></li>
                    <li><a href=""><img src="assets/images/link-icon.png" alt="ad eyes" /></a></li>
                </ul></h1>
                <div className="subHeading slideInUp wow ">Igenimu saeped qui volorest qui dia qui occus expeliqui nonse omnihic tem re, aut ut impossin rerectore</div>
            </div>
            <div className="knowledgBody">
               <div className="freeResouces lineANimation slideInUp wow ">Free Resources</div>
               <div className="row">
                   <div className="col-sm-6 col-md-4">
                       <div className="knowledgeBox slideInUp wow ">
                           <div className="knowledgeImg">
                                <img className="img-fluid" src="assets/images/knowledge_1.jpg" alt="ad blog" />
                           </div>
                           <div className="knowledgeTitle">
                            Personal Financial Well-Being Understanding Your Financial Life
                           </div>
                           <div className="knowledgeBody">
                            By Ben Jacobs | Publish Date
                           </div>
                           <div className="knowledgeFooter clearfix">
                               <div className="FText">Blog</div>
                               <ul><li><a href=""><img src="assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="assets/images/share-icon.png" alt="ad share" /></a></li></ul>
                           </div>
                       </div>
                   </div>
                   <div className="col-sm-6 col-md-4">
                        <div className="knowledgeBox slideInUp wow ">
                            <div className="knowledgeImg">
                                <img className="img-fluid" src="assets/images/knowledge_2.jpg" alt="ad blog" />
                            </div>
                            <div className="knowledgeTitle">
                            Personal Financial Well-Being Understanding Your Financial Life
                            </div>
                            <div className="knowledgeBody">
                            By Ben Jacobs | Publish Date
                            </div>
                            <div className="knowledgeFooter clearfix">
                                <div className="FText">Blog</div>
                                <ul><li><a href=""><img src="assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="assets/images/share-icon.png" alt="ad eyes" /></a></li></ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="knowledgeBox slideInUp wow ">
                            <div className="knowledgeImg">
                                    <img className="img-fluid" src="assets/images/knowledge_3.jpg" alt="ad blog"/>
                            </div>
                            <div className="knowledgeTitle">
                                Personal Financial Well-Being Understanding Your Financial Life
                            </div>
                            <div className="knowledgeBody">
                                By Ben Jacobs | Publish Date
                            </div>
                            <div className="knowledgeFooter clearfix">
                                <div className="FText">Video</div>
                                <ul><li><a href=""><img src="assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="assets/images/share-icon.png" alt="ad eyes" /></a></li></ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="knowledgeBox slideInUp wow ">
                            <div className="knowledgeImg">
                                <img className="img-fluid" src="assets/images/knowledge_4.jpg" alt="ad blog"/>
                            </div>
                            <div className="knowledgeTitle">
                                Personal Financial Well-Being Understanding Your Financial Life
                            </div>
                            <div className="knowledgeBody">
                                By Ben Jacobs | Publish Date
                            </div>
                            <div className="knowledgeFooter clearfix">
                                <div className="FText">Book</div>
                                <ul><li><a href=""><img src="assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="assets/images/share-icon.png" alt="ad share" /></a></li></ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="knowledgeBox slideInUp wow ">
                            <div className="knowledgeImg">
                                    <img className="img-fluid" src="assests/images/knowledge_5.jpg" alt="ad blog"/>
                            </div>
                            <div className="knowledgeTitle">
                                Personal Financial Well-Being Understanding Your Financial Life
                            </div>
                            <div className="knowledgeBody">
                                By Ben Jacobs | Publish Date
                            </div>
                            <div className="knowledgeFooter clearfix">
                                <div className="FText">Book</div>
                                <ul><li><a href=""><img src="assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="assets/images/share-icon.png"  alt=""/></a></li></ul>
                            </div>
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

export default TeacherKnowledge;