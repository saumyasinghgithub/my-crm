import {useState,useEffect, useContext} from 'react';

import UserContext from './../contexts/UserContext';

import {useParams} from "react-router-dom";
import _ from 'lodash';

const CourseDetails = (props) => {

  const [course, setCourse] = useState({});
  const { slug } = useParams();

  const {getServerData} = useContext(UserContext);




  useEffect(() => {
    getServerData(`course/${slug}`)
    .then(setCourse)
  },[]);


  return (<>
    <h1 className="m-5">{_.get(course,'title',"Title should come here")}</h1>
    <div className="cardWrapper">
        <div className="container">
            <nav className="breadcrumb-list" aria-label="breadcrumb">
                <span className="backarrow"><a href="#"><img src="assets/images/back-arrow.png" alt="AD" />Back</a></span>
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
                            <img className="img-fluid" src="assets/images/doc-icon.png" alt="AD" />
                            <span className="usdheading">15 USD </span><span className="usdtext">PDF</span>
                        </a>
                    </div>
                </li>
                <li>
                    <div className="circleBox wow zoomIn">
                        <a data-toggle="tab" href="#Video">
                            <img className="img-fluid" src="assets/images/video.png" alt="AD" />
                            <span className="usdheading">28 USD</span><span className="usdtext">Video</span>
                        </a>
                    </div>
                </li>
                <li>
                    <div className="circleBox wow zoomIn">
                        <a data-toggle="tab" href="#Audio">
                            <img className="img-fluid" src="assets/images/audio-icon.png" alt="AD" />
                            <span className="usdheading">20 USD</span><span className="usdtext">Audio</span>
                        </a>
                    </div>
                </li>
                <li>
                    <div className="circleBox wow zoomIn">
                        <img className="img-fluid" src="assets/images/edit-icon.png" alt="AD" />
                        <span className="usdheading">10 USD</span><span className="usdtext">Quizz</span>
                    </div>
                </li>
                <li>
                    <div className="circleBox wow zoomIn">
                        <img className="img-fluid" src="assets/images/scome.png" alt="AD" />
                        <span className="usdheading">25 USD</span><span className="usdtext">SCORM</span>
                    </div>
                </li>
            </ul>
            <div className="tab-content">
                <div className="courseWrapper coursecard tab-pane active" id="PDF">
                    <div className="row">
                        <div className="col-md-6 wow slideInUp">
                            <div className="imgWrapper">
                                <span className="new">New</span>
                                <div className="circleBox">
                                    <img className="img-fluid" src="assets/images/bundle.png" alt="AD" />
                                    <span className="usdheading active">98 USD</span><span className="usdtext active">Bundle</span>
                                </div>
                            </div>
                            <div className="textBoxCard">
                                <p>Learn the basics of Finance! We will cover compounding 
                                interest and many other topics
                                </p>
                                <div className="cardInfoBox">
                                    <span className="textBold">Created by</span> Ben Jacobs <span className="textBold">| Last updated</span> 3/2019<br />
                                    <span className="textBold">Language:</span> English | <span className="textBold">Also available:</span> French, Spanish <br />
                                    <span className="textBold">Media:</span> PDF <img src="assets/images/pdf.png" alt="AD" />, Video <img src="assets/images/video1.png" alt="AD" />, Audio <img src="assets/images/audio1.png" alt="AD" />, Quiz <img src="assets/images/edit1.png" alt="AD" />, SCORM <img src="assets/images/scrom.png" alt="AD" /><br />        
                                    <span className="textBold">Level:</span> Advanced <span className="textBold">| Duration:</span> 18h 30 min
                                </div>
                                <div className="cardInforating">
                                    <p><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i> (412)  5,5,410 students enrolled</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 slideInUp wow">
                            <div className="courseOverview">
                                <h3>Finance for the Real World - <br />
                                        Corporate Finance 101</h3>
                                <div className="courseinfo">
                                    <h5>What you’ll learn</h5>
                                    <ul>
                                        <li>Understand the Time Value of Money </li>
                                        <li>Understand and Calculate the Net Present Value, Internal
                                                Rate of Return and Payback Period for Capital Budgeting</li>
                                        <li>Calculate the Future Value and Present Value of cash flows Theory? </li>
                                    </ul>
                                </div>                            
                                <div className="courseinfo">
                                    <h5>Requirements</h5>
                                    <ul>
                                        <li>A Raspberry Pi 2 or 3, model B</li>
                                        <li>A Windows, Mac or Linux computer</li>
                                        <li>Understand the difference between fixed and variable interest rates</li>
                                    </ul> 
                                </div>
                                <div className="courseinfo">
                                    <h5>Description</h5>
                                    <p className="addReadMore showlesscontent">Do you want to understand the basic finance terms like Compounding 
                                        Interest, Time Value of Money, Net Present Value and Modern Portfolio 
                                        Theory? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
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
                                                98 USD
                                                <span>( Bundle Price )</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="courseWrapper coursecard tab-pane" id="Video">
                    <div className="row">
                        <div className="col-md-6 wow slideInUp">
                            <div className="imgWrapper">
                                <span className="new">New</span>
                                <div className="circleBox">
                                    <img className="img-fluid" src="assets/images/bundle.png" alt="AD" />
                                    <span className="usdheading active">98 USD</span><span className="usdtext active">Bundle</span>
                                </div>
                            </div>
                            <div className="textBoxCard">
                                <p>Learn the basics of Finance! We will cover compounding 
                                interest and many other topics
                                </p>
                                <div className="cardInfoBox">
                                    <span className="textBold">Created by</span> Ben Jacobs <span className="textBold">| Last updated</span> 3/2019<br />
                                    <span className="textBold">Language:</span> English | <span className="textBold">Also available:</span> French, Spanish <br />
                                    <span className="textBold">Media:</span> PDF <img src="assets/images/pdf.png" alt="AD" />, Video <img src="assets/images/video1.png" alt="AD" />, Audio <img src="assets/images/audio1.png" alt="AD" />, Quiz <img src="assets/images/edit1.png" alt="AD" />, SCORM <img src="assets/images/scrom.png" alt="AD" /><br />        
                                    <span className="textBold">Level:</span> Advanced <span className="textBold">| Duration:</span> 18h 30 min
                                </div>
                                <div className="cardInforating">
                                    <p><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i> (412)  5,5,410 students enrolled</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 slideInUp wow">
                            <div className="courseOverview">
                                <h3>Finance for the Real World - <br />
                                        Corporate Finance 101</h3>
                                <div className="courseinfo">
                                    <h5>What you’ll learn</h5>
                                    <ul>
                                        <li>Understand the Time Value of Money </li>
                                        <li>Understand and Calculate the Net Present Value, Internal
                                                Rate of Return and Payback Period for Capital Budgeting</li>
                                        <li>Calculate the Future Value and Present Value of cash flows Theory? </li>
                                    </ul>
                                </div>                            
                                <div className="courseinfo">
                                    <h5>Requirements</h5>
                                    <ul>
                                        <li>A Raspberry Pi 2 or 3, model B</li>
                                        <li>A Windows, Mac or Linux computer</li>
                                        <li>Understand the difference between fixed and variable interest rates</li>
                                    </ul> 
                                </div>
                                <div className="courseinfo">
                                    <h5>Description</h5>
                                    <p className="addReadMore showlesscontent">Do you want to understand the basic finance terms like Compounding 
                                        Interest, Time Value of Money, Net Present Value and Modern Portfolio 
                                        Theory? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
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
                                                98 USD
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
            <div className="courseDesBox slideInUp wow">
                <h3>Course Prerequisite</h3>
                <p className="addReadMore showlesscontent">You will learn how to use Excel/Google Sheets to calculate the Net Present Value of capital projects.
                        I am a Chartered Financial Analyst and I have included course material from the CFA Level 1 Exam to help you 
                        understand what the test would be like.
                    </p>
            </div>
            <div className="courseDesBox slideInUp wow">
                <h3>Description</h3>
                <p className="addReadMore showlesscontent">Do you want to understand the basic finance terms like Compounding Interest, Time Value of Money, Net Present Value and 
                        Modern Portfolio Theory?</p>
            </div>
            <div className="courseDesBox slideInUp wow">
                <h3>About Instuctor</h3>
                <p className="addReadMore showlesscontent">Ben started nos estorerepe nossita tionseq uaepere rumquia spient dolorro mi, cum eatis desto eraeptatis eatis 
                    ape litios accaest odigenis pa de laccuptat. </p>
               
            </div>
            <div className="courseDesBox slideInUp wow">       
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
            </div>
            
        </div>
    </div>
  </>);

};

export default CourseDetails;