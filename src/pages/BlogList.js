import React,{useEffect,useState, useContext} from 'react';
import {Container, Spinner, Alert} from 'react-bootstrap';

import UserContext from './../contexts/UserContext';

import Utils from './../Utils';
import _ from 'lodash';
import moment from 'moment';

const BlogList = (props) => {

    const slug = props.trainerSlug;

    const [data, setData] = useState({});

    const [loading, setLoading] = useState(true);

    const {getServerData} = useContext(UserContext);

    useEffect(()=>{
            getServerData(`trainer/${slug}/courses`,true)
            .then(tData => {
                console.log(tData);
                setData(tData);
                setLoading(false);
            })
            .catch(msg=> {
                setData({success: false, message: msg});
                setLoading(false);
            });
        },[]);

    useEffect(window.scrollEffect,[]);

    const renderCourseBox = (course) => {
        return <div className="libraryInfobox">
        <div className="LImgBox">{/*<span className="new">New</span>*/}
            <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/uploads/courses/${course.course_image}`} alt="AD" />
        </div>
        <div className="LTextBox">
            <div className="libraryTitle">{course.name}</div>
            <div className="libraryBody" dangerouslySetInnerHTML={{__html:course.short_description}}></div>
            <div className="libraryAuthorInfo">
                By {data.trainer.firstname} {data.trainer.lastname} | {moment(course.created_at).format("M/YYYY")} | Level: {course.level} | Duration: {course.duration} Hours
            </div>
            <div className="libraryStar">
                <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
            </div>
            <div className="librarybuttonList">
                <ul>
                    {course.resources.map(cr => <li key={cr.id}><img src={`/assets/images/${_.find(Utils.mediaTypes, m => m[0]==cr.type)[2]}`} alt="AD" height="15" /> {cr.price} USD</li>)}
                    
                </ul>
            </div>
        </div>
        <div className="LPriceInfoBox">
            <div className="boldAmount">{course.price} USD</div>
            <div className="bundlePrice">( Bundle Price )</div>
            <a href={`${process.env.REACT_APP_PUBLIC_URL}/courses/${course.slug}`} className="btn btnBlue" >View Course </a>
        </div>
    </div>
    }

    return (<>
    <Container fluid className="h-100 p-0">

        {loading && <>
                <div className="profile-wrapper">
                    <div className='container'>
                        <h1>Courses By Trainer</h1>
                        <Alert variant="warning"><div className="m-5">Looking for trainer courses <Spinner animation="border" size="sm" /></div></Alert>
                    </div>
                </div>
            </>}

            {!loading && <>
                {_.get(data,'success',false)===false && <>
                    <div className="profile-wrapper">
                        <div className='container'>
                            <h1>Courses By Trainer</h1>
                            <Alert variant="danger"><div className="m-5">{data.message}</div></Alert>
                        </div>
                    </div>
                </>}

                {_.get(data,'success',false)!==false && <>

                    <div className="profile-wrapper">
                        <div className="container100">         
                            <div className="libraryeWrapper container">
                                <div className="libraryHeading">                
                                    <h1 className="headingtext courselist">All courses taught by {data.trainer.firstname} {data.trainer.lastname}</h1>                
                                    <div className="subHeading"  dangerouslySetInnerHTML={{__html:data.trainer.biography}}></div>
                                </div>
                                <div className="libraryBody allCourses">              
                                    {data.courses.map(renderCourseBox)}
                                </div>
                            </div>              
                        </div>
                    </div>

                </>}
        </>}
    </Container>
</>);
};

export default BlogList;