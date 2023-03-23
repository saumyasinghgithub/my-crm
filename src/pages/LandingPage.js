import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { TeacherSubscribe } from "../components/teacher";
import { LandingBlog } from "../components/landing";
import Utils from "./../Utils";
import UserContext from "./../contexts/UserContext";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Loader } from "../components";

const LandingPage = (props) => {
  const slug = Utils.subdomain();
  const [trainer, setTrainer] = useState({});
  const { getServerData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const video = "https://youtu.be/IPzGKaY4-yw";

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [RegiShow, setRegiShow] = useState(false);

  const RegisterClose = () => setRegiShow(false);
  const RegisterShow = () => setRegiShow(true);

  useEffect(() => {
    getServerData(`trainer/landing/${slug}`, true)
      .then((tData) => {
        console.log(tData);
        setTrainer(tData);
        setLoading(false);
      })
      .catch((msg) => {
        setTrainer({ success: false, message: msg });
        setLoading(false);
      });
  }, []);
  return (
    <>

      <Container>
        {loading && (
          <>
            <Loader />
          </>
        )}
        {!loading && (
          <>
            <Row className="landingPageRow">
              <div className="landingSlider">
                {_.get(trainer, "slides", []).length > 0 && (
                  <MDBCarousel showIndicators fade>
                    {_.get(trainer, "slides", []).map((slide, idx) => (
                      <>
                        <a href={slide.cta_link}>
                          <MDBCarouselItem
                            className="w-100 d-block"
                            key={idx}
                            itemId={idx + 1}
                            src={process.env.REACT_APP_API_URL + "/uploads/slider/" + slide.slider_image}
                            alt="..."
                          >


                            <div className="slider1Div">
                              {!_.isEmpty(slide.slider_text) && (
                                <>
                                  {/* <h4 className="sliderh4">"{slide.slider_text}"</h4>
                          <h4>
                            <span> — {[trainer.about.firstname, trainer.about.lastname].join(" ")}</span>
                          </h4> */}
                                </>
                              )}
                              {/* {!_.isEmpty(slide.cta_link) && <a href={slide.cta_link}>Click Here to Know More About Me</a>} */}
                            </div>
                          </MDBCarouselItem>
                        </a>
                      </>
                    ))}
                  </MDBCarousel>
                )}
              </div>
            </Row>
          </>
        )}
      </Container>
      {/* Join Community */}
      {/* <Col md={10} className="landingSlider landingVideo">
            <Col md={7} className="landingFloatVideo">
              <video src={video} controls poster={poster} width="100%" height="360"></video>
            </Col>
            <Col md={5} className="landingFloatText">
              <Col md={12}>
                <h2 className="objHeading">
                  <span className="floatLeftSpan">Objectives:</span>
                  <span className="objectiveImg"></span>
                </h2>
              </Col>
              <Col md={12} className="objectiveLi">
                <ul className="ulDesign">
                  <li>
                    To analyze and disseminate Code Blue data to improve resuscitation efforts, quality, and outcomes, reducing hospital mortality.
                  </li>
                  <li>Make recommendations regarding improvements of code blue processes centered on Evidence-Based Practice.</li>
                  <li>Continually provide education and training associated with the standards of care in high-quality resuscitative efforts</li>
                </ul>
              </Col>
              <Col md={12} className="jnNwBtnDiv">
                <a className="joinnowBtn" href="/contact-us">
                  Join Now
                </a>
              </Col>
            </Col>
          </Col> */}
      {!loading && (
        <>
          <section className="HomeMainCourses">
            <Container>
              <Row>
                <Col md={12} className="landingSlider landingVideo">

                  <Row>
                    <Col lg={6} md={12} >
                      <img src="assets/images/ourcourse1.png" className="img-fluid w-100" alt="" />
                    </Col>
                    <Col lg={6} md={12} className="d-flex align-center">
                      <div className="MainOurCourses">
                        <h3 className="landingHeading">Our Courses</h3>
                        <p className="mt-4" >
                          My mission is to empower and equip nurses with the necessary knowledge and skills to respond confidently to cardiac arrest situations and save the lives of their patients. Drawing on years of experience working in life-saving situations with resuscitation teams, I recognize the importance of maintaining courage, confidence, and competence in such high-pressure situations.
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Container>
                    <Row className="mt-5 justify-content-center">
                      <h3 className="landingHeading mb-5">Be Prepared for an Emergency: Learn CPR. Save a life.</h3>
                      <Col lg={4} md={6} className="pt-3 d-flex">
                        <div className="p-4 homecourses">
                          <div className="">
                            <span className="new">New</span>
                            <img className="img-fluid rounded" src="assets/images/ourcourse1.png" alt="Tverse" />
                          </div>
                          <div className="">
                            <div className="libraryTitle HomeCourseTitle text-center pt-5 pb-3">Codeprep</div>
                            <div className="libraryBody homecoursedescription text-center pt-3 pb-5 ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                          </div>
                          <div className="HomeExploreCourse mt-4 mb-3 text-center"><button> <a href="/professional-profile/library" target="_blank" >
                            Explore Courses
                          </a></button></div>
                        </div>
                      </Col>


                      {/* <Col md={4} className="pt-3 d-flex">
                      <div className="p-4 homecourses">
                        <div className="">
                          <span className="new">New</span>
                          <img className="img-fluid rounded" src="assets/images/ourcourse1.png" alt="Tverse" />
                        </div>
                        <div className="">
                          <div className="libraryTitle HomeCourseTitle text-center pt-5 pb-3">10 Tips for a Healthy Heart</div>
                          <div className="libraryBody homecoursedescription text-center pt-3 pb-5 ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                        </div>
                        <div className="HomeExploreCourse mt-4 mb-3 text-center"><button> <a href="/professional-profile/library" target="_blank" >
                          Explore Courses
                        </a></button></div>
                      </div>
                    </Col>

                    <Col md={4} className="pt-3 d-flex">
                      <div className="p-4 homecourses">
                        <div className="">
                          <span className="new">New</span>
                          <img className="img-fluid rounded" src="assets/images/ourcourse1.png" alt="Tverse" />
                        </div>
                        <div className="">
                          <div className="libraryTitle HomeCourseTitle text-center pt-5 pb-3">Lee Health's Simulation Lab:</div>
                          <div className="libraryBody homecoursedescription text-center pt-3 pb-5 ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                        </div>
                        <div className="HomeExploreCourse mt-4 mb-3 text-center"><button> <a href="/professional-profile/library" target="_blank" >
                          Explore Courses
                        </a></button></div>
                      </div>
                    </Col> */}
                    </Row>
                  </Container>
                  {/* <h3 className="landingHeading">Join <span>Community</span></h3>
              <div className="serviceBody">
                <div className="awardTextInner awardwithoutLine">
                  <div className="awadText">
                    <h3 className="landingsubHeading">Objectives</h3>
                    <ul className="mt-5 pt-2">
                      <li>To analyze and disseminate Code Blue data to improve resuscitation efforts, quality, and outcomes, reducing hospital mortality. </li>
                      <li className="pt-3 pb-3">Make recommendations regarding improvements of code blue processes centered on Evidence-Based Practice. </li>
                      <li>Continually provide education and training associated with the standards of care in high-quality resuscitative efforts </li>
                    </ul>
                    <div className="landingFloatVideo">
                      <video src={video} controls poster='assets/images/join.png' width="100%" height="100%"></video>
                    </div>
                    <div className="joinNowBtn text-left mt-5"><button> <a href="/contact-us">
                      Join Now
                    </a></button></div>
                  </div>
                </div>
              </div> */}


                  {/* <div className="landingSlider landingObjectives">
                <h3 className="landingHeading"><span>Objectives</span></h3>
                <div className="landingObjBox">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="ObjBoxImg"><img src='assets/images/objective.png' className="img-fluid" alt="" /></div>
                    </div>
                    <div className="col-md-8">
                      <ul className="objectText landinglist">
                        <li>To analyze and disseminate Code Blue data to improve resuscitation efforts, quality, and outcomes, reducing hospital mortality.</li>
                        <li>Make recommendations regarding improvements of code blue processes centered on Evidence-Based Practice.</li>
                        <li>Continually provide education and training associated with the standards of care in high-quality resuscitative efforts</li>
                      </ul>
                      <div className="joinNowBtn"><button> <a href="/contact-us">
                        Join Now
                      </a></button></div>
                    </div>
                  </div>
                </div>
              </div> */}
                </Col>
              </Row>
            </Container>
          </section>
        </>
      )}

      {/* END Join Community */}

      {/* BLOG */}
      {/* {
        !loading && (
          <>
            <Container>
              <Col md={12} className="landingBlog">
                <h3 className="landingHeading"><span>Blogs</span></h3>
                <div className="serviceBody">
                  <div className="awardTextInner awardwithoutLine">
                    <div className="awadText">
                      {_.get(trainer, "success", false) !== false && (
                        <>
                          <LandingBlog blogs={trainer.blogs} />
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </Col>
            </Container>
          </>
        )
      } */}
      {/* BLOG */}


      {/* upcoming event */}
      {
        !loading && (
          <>
            <Container>
              <Col md={12} className="">
                <div className="landingSlider landingUpEvent">
                  {/* <h3 className="landingHeading">UPCOMING <span>EVENTS</span></h3> */}
                  <div className="landingUpEventBox">
                    <div className="row">
                      <div className="col-lg-5 col-md-12">
                        <div className="UpEventImg"><img className="img-fluid w-100" src="assets/images/upcomingevent.png" alt="" /></div>
                      </div>
                      <div className="col-lg-7 col-md-12">
                        <div className="UpEventText">
                          <h3>KICKSTART MY HEART</h3>
                          <h4>Virtual Event - A Podcast Series</h4>
                          <div>Apr 01, 7:00 AM</div>
                          <div>Do you strut into a code blue with confidence, knowing you're going to nail it, no matter what? Or do you stumble in with unease and anxiety, feeling unprepared and overwhelmed? Let's face it, code blue events can leave you feeling like you've been hit by a bus, and that's not a good look on anyone.<br /> <br />Can you make it?</div>
                          <div className="HomeRegister mt-4"><button onClick={RegisterShow}>
                            Register Now
                          </button></div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </Col>
            </Container>
          </>
        )
      }


      {/* NEED TRAINER */}

      {
        !loading && (
          <>
            <section className="">
              <Container>
                <Col md={12} className="HomeTraining">
                  <div className="landingSlider landingUpEvent">
                    {/* <h3 className="landingHeading">UPCOMING <span>EVENTS</span></h3> */}
                    <div className="landingUpEventBox">
                      <div className="row">
                        <div className="col-lg-7 col-md-12">
                        </div>
                        <div className="col-lg-5 col-md-12">
                          <div className="">
                            <h3 className="landingHeading mb-5">Join Community</h3>
                            <p className="mb-4 homeobjective">Objectives</p>
                            <ul className="ulDesign">
                              <li>
                                To analyze and disseminate Code Blue data to improve resuscitation efforts, quality, and outcomes, reducing hospital mortality.
                              </li>
                              <li className="mt-4 mb-4">Make recommendations regarding improvements of code blue processes centered on Evidence-Based Practice.</li>
                              <li>Continually provide education and training associated with the standards of care in high-quality resuscitative efforts</li>
                            </ul>


                            <div className="HomeRegister HomeJoinNow mt-5"><button className="text-left w-100 mt-3" variant="primary" onClick={handleShow}>   Join Now
                            </button></div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </Col>
              </Container>
            </section>
          </>
        )
      }

      {/* <Col md={10} className="landingEventsSection">
            <p className="kickoffDate">29 DAYS TO THE EVENT</p>
            <h3 className="eventHeading">KickStart My Heart</h3>
            <p className="eventTime">Apr 01, 7:00 AM | Virtual Event - A Podcast Series</p>
            <p className="eventDescription">
              Do you strut into a code blue with confidence, knowing you're going to nail it, no matter what? Or do you stumble in with unease and
              anxiety, feeling unprepared and overwhelmed? Let's face it, code blue events can leave you feeling like you've been hit by a bus, and
              that's not a good look on anyone.
            </p>
            <p className="eventDescription">Can you make it?</p>
            <p className="eventRegisBtn">
              <a href="">Register Now</a>
            </p>
            <div className="socialLinksEvents">
              <a href="">
                <FontAwesomeIcon icon={faFacebook} className="fontawesomeCustomClass" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={faTwitter} className="fontawesomeCustomClass" />
              </a>
              <a href="">
                <FontAwesomeIcon icon={faLinkedin} className="fontawesomeCustomClass" />
              </a>
            </div>
          </Col> */}
      {/* upcoming event */}

      {/* <Col md={10} className="landingEvents"></Col> */}
      {/* {
        !loading && (
          <>
            <Col md={12} className="landingSlider LandingSubscribe">
              <TeacherSubscribe type="inLine" />
            </Col>
          </>
        )
      } */}
      {/* {
        !loading && (
          <>
            <hr />
          </>
        )
      } */}

      {
        !loading && (
          <>
            <Container>
              <Col md={12} className="footerdesign">

                <div className="row">
                  <div className="col-md-12">
                    <div className="Footermail text-center">
                      {/* <p className="mb-4">Rescue RN™ • CodePRep</p>
                      <p>Inquires:</p>
                      <p ><a href="mailto:susan@rescuern.com">susan@rescuern.com</a></p>

                      <p className="mb-4">+1(863) 445-0911</p> */}

                      <p className="text-left">Subscribe to Our Rescue RN™ Newsletter</p>
                      <TeacherSubscribe type="inLine" />
                    </div>
                  </div>
                  {/* <div className="col-md-6 mt-2 mb-2">
                    <img src="../assets/images/footer.jpg" className="img-fluid w-100" alt="" />
                  </div> */}
                </div>
              </Col>
            </Container>
          </>
        )
      }

      {/* JOIN COMMUNITY FORM */}
      <Modal size="lg" show={show} onHide={handleClose} className="JoinNowModal">
        <Modal.Header className="justify-content-center" closeButton>
          <Modal.Title> <h3 className="landingHeading">Join Community</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-3">Be a part of our community and gain access to exclusive content, events, and opportunities to connect with other members.
          <br></br>
          <Form>
            <Form.Group className="mt-3 mb-2">
              <Form.Control type="name" placeholder="Enter Name" required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control type="email" placeholder="Enter Email" required />
            </Form.Group>
            <div className="HomeRegister JoinButtonModal">
              <Button type="submit" className="mt-5 w-100 text-left">
                Join
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* JOIN COMMUNITY FORM */}

      {/* Register FORM */}
      <Modal size="lg" show={RegiShow} onHide={RegisterClose} className="JoinNowModal">
        <Modal.Header className="justify-content-center" closeButton>
          <Modal.Title>
            <div className="UpEventText text-center">
              <h3>KICKSTART MY HEART</h3>
              <h4>Virtual Event - A Podcast Series</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-3">Please complete the form to register for the event.
          <br></br>
          <Form>
            <Form.Group className="mt-3 mb-2">
              <Form.Control type="name" placeholder="Enter Name" required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control type="email" placeholder="Enter Email" required />
            </Form.Group>
            <div className="HomeRegister JoinButtonModal">
              <Button type="submit" className="mt-5 w-100 text-left">
                Register
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Register FORM */}

    </>
  );
};
export default LandingPage;
