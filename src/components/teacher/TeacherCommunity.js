import React, { useEffect} from 'react';

import TeacherNav from './TeacherNav';

const TeacherCommunity = (props) => {

    const data = props.data;
    
    useEffect(window.scrollEffect, []);

    return (<>
    <div className='row'>
        <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>
            <TeacherNav slug={props.slug} page={props.page} onPageChange={props.onPageChange} />    
        </div>
            <div className='col-lg-9 col-md-9 col-12 pt-2 pb-1'>
                <img className="img-fluid imgTransfer" src={`${process.env.REACT_APP_API_URL}/uploads/community/${encodeURI(data[0].community_image)}`} alt="service" />
            </div>
        </div>

        <div className="serviceWrapper container"> 
            <div className="serviceHeading">                
                <h1 className="headingtext slideInUp wow ">04 Community</h1>
                {/* <ul className="profile-socail-icon serviceicon">
                    <li className='mr-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li>
                    <li><a href=""><img src="/assets/images/link-icon.png" alt="ad eyes" /></a></li>
                </ul> */}
                <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{__html:data[0].about_community}}></div>
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
                               <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li className='ml-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad share" /></a></li></ul>
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
                                <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li className='ml-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li></ul>
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
                                <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li className='ml-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li></ul>
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
                                <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li className='ml-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad share" /></a></li></ul>
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
                                <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li className='ml-2'><a href=""><img src="/assets/images/share-icon.png"  alt=""/></a></li></ul>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>              
    </>);
};

export default TeacherCommunity;