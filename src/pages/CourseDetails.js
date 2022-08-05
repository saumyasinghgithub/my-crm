import {useState,useEffect, useContext} from 'react';
import UserContext from './../contexts/UserContext';
import { Container, Spinner, Alert } from 'react-bootstrap';
import {useParams} from "react-router-dom";
import _ from 'lodash';
import moment from 'moment';
const CourseDetails = (props) => {

    const { slug } = useParams();

    const [course, setCourse] = useState({});

    const [loading, setLoading] = useState(true);

    const {getServerData} = useContext(UserContext);

    useEffect(()=>{
        getServerData(`course/${slug}`,true)
        .then(cData => {
            setCourse(cData);
            setLoading(false);
        })
        .catch(msg=> {
            setCourse({success: false, message: msg});
            setLoading(false);
        });
    },[]);

  useEffect(window.scrollEffect, [course]);


  return (<>
   <Container fluid className="h-100 p-0">
   {loading && <>
                <div className="profile-wrapper">
                    <div className='container'>
                        <h1>Course</h1>
                        <Alert variant="warning"><div className="m-5">Looking for course details <Spinner animation="border" size="sm" /></div></Alert>
                    </div>
                </div>
            </>}

            {!loading && <>
                {_.get(course,'success',false)===false && <>
                    <div className="profile-wrapper">
                        <div className='container'>
                            <h1>Course</h1>
                            <Alert variant="danger"><div className="m-5">{course.message}</div></Alert>
                        </div>
                    </div>
                </>}
    {_.get(course,'success',false)!==false && <>
    <div className="cardWrapper">
        <div className="container">
            <nav className="breadcrumb-list" aria-label="breadcrumb">
                <span className="backarrow"><a href="#"><img src="/assets/images/back-arrow.png" alt="AD" />Back</a></span>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Skillchoice Business</a></li>                  
                  <li className="breadcrumb-item"><a href="#">Finance </a></li>
                  <li className="breadcrumb-item active" aria-current="page">English</li>
                </ol>
            </nav>
            <ul className="iconList nav nav-tabs">
                <li>
                    <div className="circleBox wow zoomIn" >
                        <a data-toggle="tab" href="#PDF">
                            <img className="img-fluid" src="/assets/images/doc-icon.png" alt="AD" />
                            <span className="usdheading">15 USD </span><span className="usdtext">PDF</span>
                        </a>
                    </div>
                </li>
                <li>
                    <div className="circleBox wow zoomIn">
                        <a data-toggle="tab" href="#Video">
                            <img className="img-fluid" src="/assets/images/video.png" alt="AD" />
                            <span className="usdheading">28 USD</span><span className="usdtext">Video</span>
                        </a>
                    </div>
                </li>
                <li>
                    <div className="circleBox wow zoomIn">
                        <a data-toggle="tab" href="#Audio">
                            <img className="img-fluid" src="/assets/images/audio-icon.png" alt="AD" />
                            <span className="usdheading">20 USD</span><span className="usdtext">Audio</span>
                        </a>
                    </div>
                </li>
                <li>
                    <div className="circleBox wow zoomIn">
                        <img className="img-fluid" src="/assets/images/edit-icon.png" alt="AD" />
                        <span className="usdheading">10 USD</span><span className="usdtext">Quizz</span>
                    </div>
                </li>
                <li>
                    <div className="circleBox wow zoomIn">
                        <img className="img-fluid" src="/assets/images/scome.png" alt="AD" />
                        <span className="usdheading">25 USD</span><span className="usdtext">SCORM</span>
                    </div>
                </li>
            </ul>
            <div className="tab-content">
                <div className="courseWrapper coursecard tab-pane active" id="PDF">
                    <div className="row">
                        <div className="col-md-6 wow slideInUp">
                            <div className="imgWrapper"  style={{backgroundImage: `url("${process.env.REACT_APP_API_URL}/uploads/courses/${course.course.course_image}")` }}>
                                <span className="new">New</span>
                                <div className="circleBox">
                                    <img className="img-fluid" src="/assets/images/bundle.png" alt="AD" />
                                    <span className="usdheading active">{course.course.price}</span><span className="usdtext active">Bundle</span>
                                </div>
                            </div>
                            <div className="textBoxCard">
                                <div dangerouslySetInnerHTML={{__html:course.course.short_description}}></div>
                                <div className="cardInfoBox">
                                    <span className="textBold">Created by</span> Ben Jacobs <span className="textBold">| Last updated</span> {moment(course.course.created_at).format("DD/MM/YYYY")}<br />
                                    <span className="textBold">Language:</span> {course.course.language} | <span className="textBold">Also available:</span> {course.course.language} <br />
                                    <span className="textBold">Media:</span> PDF <img src="/assets/images/pdf.png" alt="AD" />, Video <img src="/assets/images/video1.png" alt="AD" />, Audio <img src="/assets/images/audio1.png" alt="AD" />, Quiz <img src="/assets/images/edit1.png" alt="AD" />, SCORM <img src="/assets/images/scrom.png" alt="AD" /><br />        
                                    <span className="textBold">Level:</span> {course.course.level} <span className="textBold">| Duration:</span> {course.course.duration} Hours.
                                </div>
                                <div className="cardInforating">
                                    <p><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i> (412)  5,5,410 students enrolled</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 slideInUp wow">
                            <div className="courseOverview">
                                <h3>{course.course.name}</h3>
                                <div className="courseinfo" dangerouslySetInnerHTML={{__html:course.course.learn_brief}}></div>                            
                                <div className="courseinfo" dangerouslySetInnerHTML={{__html:course.course.requirements}}></div>
                                <div className="courseinfo addReadMore showlesscontent" dangerouslySetInnerHTML={{__html:course.course.description}}></div>
                                <div className="coursebtn">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="addButns">
                                                <a href="#loginModal"  data-toggle="modal" data-dismiss="modal" className="btn btnBlue">Enroll Now</a>
                                                <a href="#loginModal"  data-toggle="modal" data-dismiss="modal" className="btn btnBorder">Add to Favourite</a>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="coursePrice">
                                                {course.course.price} USD
                                                <span>( Bundle Price )</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="courseDesWrapper">
        <div className="container">
            {course.coursecontent.map(c=> <div className="courseDesBox slideInUp wow" key={c.id}>
             <div dangerouslySetInnerHTML={{__html:c.description}}></div>
                <div className="table-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Course content</th>
                                <th>Expand all</th>
                                <th>22 lectures</th>
                                <th>01:53:04</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><i className="fas fa-plus"></i> Welcome</td>
                                <td></td>
                                <td>1 lecture</td>
                                <td>01:21</td>
                            </tr>
                            <tr>
                                <td><i className="fas fa-plus"></i> Interest Rates and LIBOR</td>
                                <td></td>
                                <td>5 lectures	</td>
                                <td>09:48</td>
                            </tr>
                        </tbody>
                    </table>
                </div>      
            </div> )}
            
        </div>
    </div>
    </>}

</>}
   </Container>

  </>);

};

export default CourseDetails;