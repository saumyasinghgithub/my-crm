import React, { useEffect} from 'react';

import _ from 'lodash';

import TeacherNav from './TeacherNav';


const TeacherService = (props) => {

    const data = props.data;

    useEffect(window.scrollEffect, []);

    return (<>
        <div className='row'>
            <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>
                
                <TeacherNav slug={props.slug} page={props.page} onPageChange={props.onPageChange} />
                
            </div>
            <div className='col-lg-9 col-md-9 col-12 pt-2 pb-1'>
                <img className="img-fluid imgTransfer w-100" src={`${process.env.REACT_APP_API_URL}/uploads/service/${encodeURI(data.service_image)}`} alt="service" />
            </div>
        </div>
        <div className="serviceWrapper container"> 
            <div className="serviceHeading w-100">                
                <h1 className="headingtext slideInUp wow ">02 What I offer </h1>
            </div>

            <div className="serviceBody">
                <div className="awardTextInner awardwithoutLine">
                    <div className="awadText slideInUp wow " dangerouslySetInnerHTML={{__html:data.service_offer}}></div>
                </div>
                <div className="servicesTextBox slideInUp wow ">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="Sheading">Consultancy</div>
                        </div>
                        <div className="col-sm-10" >
                        <div dangerouslySetInnerHTML={{__html:data.consultancy}}></div>    
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
                        <div dangerouslySetInnerHTML={{__html:data.coaching}}></div> 
                            <div className="dropMsg lineANimation" data-toggle="modal" data-target="#dropMsgModal">Drop a message!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>              
         
    </>);
};

export default TeacherService;