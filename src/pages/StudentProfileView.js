import React,{useEffect} from 'react';
import {Container} from 'react-bootstrap';
import AboutForm from '../components/student/AboutForm';
const StudentProfileView = (props) => {


    useEffect(window.scrollEffect,[]);
    
    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper profile-wrapperStudent">
    <div className="container">
        <div className="row">
            <div className="col-md-5">
                <div className="profileLeftBox slideInUp wow">
                    <p>Industry <span className="boldText">Academics</span><br />
                        Qulification <span className="boldText">Master</span><br />
                        Interested field <span className="boldText">Marketing/Finance</span><br />
                        Country <span className="boldText">USA</span></p>
                    <div className="proTextTtile">
                        <h1 className="headingtext">M. J. <br />
                            Winter</h1>
                        <p>Joined 26/04/2018<br /> Courses 21</p>
                        <p>Connect with M. J. on in</p>
                        <p>Sent a Message <img src="/assets/images/send-icon.png" alt="AD" /></p>
                    </div>    
                </div>
            </div>
            <div className="col-md-7">
                <div className="profileRightBox clearfix slideInUp wow">
                    <img className="img-fluid myProfileImg imgTransfer"src="/assets/images/my-profile.png" />
                    
                </div>
            </div>
            <div className="col-md-5">

            </div>
            <div className="col-sm-7 slideInUp wow">
                <h1 className="headingtext">Experience </h1>
                <div className="awardTextInner awardwithoutLine">
                    <div className="awadText">
                        <p>Omnis et atet labo. Nem quiamus, voloribus et omnihicatque volorpor accaeprat dolupta tibus, venimus 
                                dolorroris dollandam et aut di ne quaspis ea debitatur aute. Vit fugias dus aut reratiis ent eos ap As ea perisque aut quibusamet as recto maximet ut ex excepere nobitatum consenes debis dolupta audit que volupta 
                                sitintorro et, nosandit mos estrunt. </p>                        
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div className="studyDetailwrapper">
        <div className="container">
            <h3 className="headingSubtitle slideInUp wow">Continue your study 2 out of 8</h3>
            <div className="studyBox clearfix slideInUp wow">
                <div className="studyImgBox">
                    <img className="img-fluid" src="/assets/images/knowledge_1.jpg" />
                </div>
                <div className="studyTextBox">
                    <div className="studyTitle">Personal Financial Well-Being</div>
                    <div className="studySubTitle">Finance</div>
                    <div className="studyTime">
                        Starting date 12/03/2019   Time estimated to finish: 2 months copy
                    </div>
                    <div className="studyBody">
                        <div className="study30"><div className="studytype ">Quizz 14% </div><a href="">Continue Course</a></div>
                        <div className="study30"><div className="studytype">SCORM 0% </div><a href="">Continue Course</a></div>
                        <div className="study30"><div className="studytype">Audio 0% </div><a href="">Continue Course</a></div>
                    </div>
                </div>
            </div>
            <div className="studyBox clearfix slideInUp wow">
                <div className="studyImgBox">
                    <img className="img-fluid" src="/assets/images/knowledge_2.jpg" />
                </div>
                <div className="studyTextBox">
                    <div className="studyTitle">Personal Financial Well-Being</div>
                    <div className="studySubTitle">Finance</div>
                    <div className="studyTime">
                        Starting date 12/03/2019   Time estimated to finish: 2 months copy
                    </div>
                    <div className="studyBody">
                        <div className="study30"><div className="studytype">Quizz 14% </div><a href="">Continue Course</a></div>
                        <div className="study30"><div className="studytype">SCORM 0% </div><a href="">Continue Course</a></div>
                        <div className="study30"><div className="studytype">Audio 0% </div><a href="">Continue Course</a></div>
                    </div>
                </div>
            </div>
            <div className="addMore"><i className="fas fa-plus"></i></div>
        </div>
    </div>
    <div className="recommendationswrapper">
        <div className="container">
            <h3 className="headingSubtitle slideInUp wow">Our recommendations 2 out of 5</h3>
            <div className="libraryInfobox slideInUp wow">
                <div className="LImgBox"><span className="new">New</span><img className="img-fluid" src="/assets/images/knowledge_1.jpg" alt="AD" /></div>
                <div className="LTextBox">
                    <div className="libraryTitle">
                        Personal Financial Well-Being Understanding Your Financial Life
                    </div>
                    <div className="libraryBody">
                        Managing your finances is one of the most important things you can 
                        do in your life. It is the difference between living a life your handed or 
                        living the life you choose!
                    </div>
                    <div className="libraryAuthorInfo">
                        By Ben Jacobs | 6/2019 | Level: Advanced | Duration: 23h 45min
                    </div>
                    <div className="libraryStar">
                        <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                        <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                        <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
                    </div>
                    <div className="librarybuttonList">
                        <ul>
                            <li><a href=""><img src="/assets/images/pdf.png" alt="AD" /> 20 USD</a></li>
                            <li><a href=""><img src="/assets/images/audio1.png" alt="AD" /> 20 USD</a></li>
                            <li><a href=""><img src="/assets/images/edit1.png" alt="AD" /> 20 USD</a></li>
                            <li><a href=""><img src="/assets/images/video1.png" alt="AD" /> 20 USD</a></li>
                        </ul>
                    </div>
                </div>
                <div className="LPriceInfoBox">
                    <div className="boldAmount">30 USD</div>
                    <div className="bundlePrice">( Bundle Price )</div>
                    <button className="btn btnBlue">Add to Cart </button>
                </div>
            </div>
            <div className="libraryInfobox slideInUp wow">
                <div className="LImgBox"><span className="new">New</span><img className="img-fluid" src="/assets/images/knowledge_1.jpg" alt="AD" /></div>
                <div className="LTextBox">
                    <div className="libraryTitle">
                        Personal Financial Well-Being Understanding Your Financial Life
                    </div>
                    <div className="libraryBody">
                        Managing your finances is one of the most important things you can 
                        do in your life. It is the difference between living a life your handed or 
                        living the life you choose!
                    </div>
                    <div className="libraryAuthorInfo">
                        By Ben Jacobs | 6/2019 | Level: Advanced | Duration: 23h 45min
                    </div>
                    <div className="libraryStar">
                        <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                        <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                        <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
                    </div>
                    <div className="librarybuttonList">
                        <ul>
                            <li><a href=""><img src="/assets/images/pdf.png" alt="AD" /> 20 USD</a></li>
                            <li><a href=""><img src="/assets/images/audio1.png" alt="AD" /> 20 USD</a></li>
                            <li><a href=""><img src="/assets/images/edit1.png" alt="AD" /> 20 USD</a></li>
                            <li><a href=""><img src="/assets/images/video1.png" alt="AD" /> 20 USD</a></li>
                        </ul>
                    </div>
                </div>
                <div className="LPriceInfoBox">
                    <div className="boldAmount">30 USD</div>
                    <div className="bundlePrice">( Bundle Price )</div>
                    <button className="btn btnBlue">Add to Cart </button>
                </div>
            </div>
            <div className="addMore"><i className="fas fa-plus"></i></div>
        </div>
    </div>
    </div> 
</Container>
</>);
}; 

export default StudentProfileView;