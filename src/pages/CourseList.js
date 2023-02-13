import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';

import UserContext from './../contexts/UserContext';

import Utils from './../Utils';
import _ from 'lodash';
import moment from 'moment';
import StarRatings from 'react-star-ratings';

const CourseList = (props) => {

    const slug = props.trainerSlug;

    const [data, setData] = useState({});

    const [loading, setLoading] = useState(true);

    const { getServerData } = useContext(UserContext);

    useEffect(() => {
        getServerData(`trainer/${slug}/courses`, true)
            .then(tData => {
                setData(tData);
                setLoading(false);
            })
            .catch(msg => {
                setData({ success: false, message: msg });
                setLoading(false);
            });
    }, []);

    useEffect(window.scrollEffect, []);

    const renderCourseBox = (course) => {
        return <Container>
            <Row className='my-5'>
                <div className='col-md-3 col-12'>
                        <div className="">{/*<span className="new">New</span>*/}
                            <img className="img-fluid rounded" src={`${process.env.REACT_APP_API_URL}/uploads/courses/${course.course_image}`} alt="AD" />
                        </div>
                    </div>
                <div className='col-md-7 col-12'>
                    <div className="">
                        <div className="libraryTitle">{course.name}</div>
                        <div className="libraryBody" dangerouslySetInnerHTML={{ __html: course.short_description }}></div>
                        <div className="libraryAuthorInfo">
                            By {data.trainer.firstname} {data.trainer.lastname} | {moment(course.created_at).format("M/YYYY")} | Level: {course.level} | Duration: {course.duration} Hours
                        </div>
                        <StarRatings
                            rating={course.rating.rating}
                            starEmptyColor="#dddddd"
                            starRatedColor="#f3ac1b"
                            starHoverColor="#bfa700"
                            starDimension="20px"
                            starSpacing="2px"
                        />
                        <div className="librarybuttonList">
                            <ul>
                                {course.resources.map(cr => <li key={cr.id}><img src={`/assets/images/${_.find(Utils.mediaTypes, m => m[0] == cr.type)[2]}`} alt="AD" height="15" /> {cr.price} USD</li>)}

                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-md-2 col-12'>
                    <div className="text-center">
                        <div className="boldAmount">USD {_.sum(_.map(course.resources, r => r.price)).toFixed(2)}</div>
                        <div className="bundlePrice">( Bundle Price )</div>
                        <a href={Utils.getTrainerURL(`courses/${course.slug}`,slug)} className="btn btnBlue mt-2" >View Course </a>
                    </div>
                </div>




            </Row>

        </Container>
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
                {_.get(data, 'success', false) === false && <>
                    <div className="profile-wrapper">
                        <div className='container'>
                            <h1>Courses By Trainer</h1>
                            <Alert variant="danger"><div className="m-5">{data.message}</div></Alert>
                        </div>
                    </div>
                </>}

                {_.get(data, 'success', false) !== false && <>

                    <div className="profile-wrapper">
                        <div className="container100">
                            <div className="libraryeWrapper container">
                                <div className="libraryHeading">
                                    <h1 className="headingtext courselist">All courses taught by {data.trainer.firstname} {data.trainer.lastname}</h1>
                                    <div className="subHeading" dangerouslySetInnerHTML={{ __html: data.trainer.biography }}></div>
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

export default CourseList;