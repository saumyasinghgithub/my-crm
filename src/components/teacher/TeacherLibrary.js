import React, { useEffect } from 'react';

import TeacherNav from './TeacherNav';

import _ from 'lodash';

import Utils from './../../Utils';
import { Row, Container } from 'react-bootstrap';

const TeacherLibrary = (props) => {

    const data = props.data;
    const courses = props.courses;
    
    useEffect(window.scrollEffect, []);

    const renderCourses = (course) => {
        return <Container> <Row className='my-5'> <div className="libraryInfobox slideInUp wow ">
            <div className='col-md-3 col-12'>
            <div className=""><span className="new">New</span><img className="img-fluid rounded" src={`${process.env.REACT_APP_API_URL}/uploads/courses/${course.course_image}`} alt="AD" /></div>
</div> 
            <div className='col-md-7 col-12'>
            <div className="">
            <div className="libraryTitle">
            {course.name}
            </div>
            <div className="libraryBody" dangerouslySetInnerHTML={{__html:course.short_description}}></div>
            <div className="libraryAuthorInfo">
                Date: 6/2019 | Level: {course.level} | Duration: {course.duration}
            </div>
            <div className="libraryStar mt-2">
                <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
            </div>
        </div>
                </div> 
            <div className='col-md-2 col-12 d-flex align-items-center'>
            <div className="">
            <a href={`/courses/${course.slug}`} className="btn btnBlue" >View Course </a>
        </div>
                </div> 

        {/* <div className="LImgBox"><span className="new">New</span><img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/uploads/courses/${course.course_image}`} alt="AD" /></div>
        <div className="LTextBox">
            <div className="libraryTitle">
            {course.name}
            </div>
            <div className="libraryBody" dangerouslySetInnerHTML={{__html:course.short_description}}></div>
            <div className="libraryAuthorInfo">
                Date: 6/2019 | Level: {course.level} | Duration: {course.duration}
            </div>
            <div className="libraryStar">
                <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
            </div>
        </div>
        <div className="LPriceInfoBox libraryCourses">
            
            <a href={`/courses/${course.slug}`} className="btn btnBlue" >View Course </a>
        </div> */}
    </div>
    </Row> </Container>;
    }


    return (<>
        <div className='row'>
            <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>
                <TeacherNav slug={props.slug} page={props.page} onPageChange={props.onPageChange} />

            </div>
            <div className='col-lg-9 col-md-9 col-12 pt-2 pb-1'>
                <img className="img-fluid imgTransfer w-100" src={`${process.env.REACT_APP_API_URL}/uploads/library/${encodeURI(data.library_image)}`} alt="service" />
            </div>
        </div>
        <div className="serviceWrapper container">
            <div className="serviceHeading w-100">
                <h1 className="headingtext slideInUp wow w-100">05 Library</h1>
                <ul className="profile-socail-icon serviceicon">
                    <li className='mr-2'><a href=""><img src="/assets/images/share-icon.png" alt="AD" /></a></li>
                    <li><a href=""><img src="/assets/images/link-icon.png" alt="AD" /></a></li>
                </ul>
                <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{ __html: data.about_library }}></div>
            </div>
            <nav className="navbar navbar-expand-md  filterMenu slideInUp wow ">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <h4>Filter for course <img src="/assets/images/arrow.png" className="img-fluid" alt="AD" /></h4>
                </button>
            </nav>





            <div className="libraryBody">
            {courses.map(renderCourses)}

            </div>
        </div>

    </>);
};


export default TeacherLibrary;