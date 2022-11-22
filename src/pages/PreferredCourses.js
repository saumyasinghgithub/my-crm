import React, {useEffect, useContext, useState} from "react";
import { Container, Card, Pagination, Row, Col } from "react-bootstrap";
import UserContext from './../contexts/UserContext';
import Utils from './../Utils';
import _ from 'lodash';

const PreferredCourses = (props) => {
    const [favs,setFavs] = useState({loading: true, data: []});
    const [filters,setFilters] = useState({start: 0, limit: 6});
    const {getServerData, setServerData} = useContext(UserContext);
    
    const $ = window.$;

    const fetchFavorites = ()=>{
        getServerData(`my-preferred-courses?start=${filters.start}&limit=${filters.limit}`,true)
        .then(res => {
            setFavs({...favs, ...res, loading: false});
        })
        .catch(err=> {
            setFavs({loading: false, success: false, message: err.message, data: []});
        });
    };

    const gotoPage = (page) => (e) => {
        const start = (page-1) * filters.limit;
        setFilters({...filters, start: start});
    };

    useEffect(fetchFavorites,[]);
    useEffect(fetchFavorites,[filters]);

    useEffect(window.scrollEffect,[]);

    const removeFav = (course_id) => (e) => {
      setServerData('course/markfav',`course_id=${course_id}&fav=0`,'post')
      .then(fetchFavorites)
    };

    const renderMyFavs = () => {
        return <>
        <Container>
            <Row>
            {favs.data.map(rec => <Col className="col-lg-4 col-md-6 col-12 py-1"><Card className="courseWrapper coursecard my-2 h-100">
                <Card.Body>
                    <Row>
                    <Col className="col-12">
                    <div className="imgWrapper rounded" style={{backgroundImage: `url("${process.env.REACT_APP_API_URL}/uploads/courses/${rec.course_image}")` }}></div>
                    </Col>
                    <Col className="col-12">
                    <h3>{rec.name}</h3>
                    <div dangerouslySetInnerHTML={{__html:rec.short_description}}></div>
                    <span className="textBold">Level:</span> {rec.level} <span className="textBold">| Duration:</span> {rec.duration} Hours.
                    </Col>
                    </Row>
                    <Row>
                        <Col className="col-4 text-left mt-2"><button className="btn text-white bg-danger" onClick={removeFav(rec.id)}>Remove</button></Col>
                        <Col className="col-8 text-right mt-2"><a href={`${process.env.PUBLIC_URL}/courses/${rec.slug}`} className="btn btnBlue preferdCourseBtn">View Details</a></Col>
                    </Row>
                </Card.Body>
            </Card></Col>)}
            </Row>
            {favs.pageInfo.total > filters.limit && Utils.showPagination({...favs.pageInfo, ..._.pick(filters,['start','limit'])}, gotoPage)}
            </Container>
        </>;
    };

    return (<>
        <Container className="h-100 p-0">
            <div className="profile-wrapper">
                <div className="container">
                <h1>My Preferred Courses</h1>
                
                    {favs.loading===true && <div className="alert alert-warning m-5 p-5">
                        Fetching your preferred trainers..
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" style={{"width": "100%"}}></div>
                        </div>
                    </div>}

                    {!favs.loading && <>
                        {!favs.success && <div className="alert alert-danger m-5 p-5">{favs.message}</div>}
                        {favs.success && renderMyFavs()}
                    </>}
                </div>
            </div>    
        </Container>
    </>);
};

export default PreferredCourses;