import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

import { TeacherSubscribe } from "../components/teacher";
import { RegisterForm } from "../components/landing";
import Utils from "./../Utils";
import UserContext from "./../contexts/UserContext";
import _ from "lodash";
import moment from "moment";
import { Loader } from "../components";

const LandingPage = (props) => {
  const slug = Utils.subdomain();
  const [trainer, setTrainer] = useState({});
  const { getServerData, setServerData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const video = "https://youtu.be/IPzGKaY4-yw";
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });

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

      {!loading && (
        <>
          <section className="HomeMainCourses">
            <Container>
              <Row>
                <Col md={12} className="landingSlider landingVideo">
                  <Row>
                    <Col lg={6} md={12}>
                      <img src="assets/images/ourcourse1.png" className="img-fluid w-100" alt="" />
                    </Col>
                    <Col lg={6} md={12} className="d-flex align-center">
                      <div className="MainOurCourses">
                        <h3 className="landingHeading">Our Courses</h3>
                        <p className="mt-4">
                          Our mission is to empower and equip nurses and other healthcare professionals with the necessary knowledge and skills to respond confidently to cardiac arrest situations and save the lives of their patients. Drawing on years of experience working in life-saving situations with resuscitation teams, we recognize the importance of maintaining courage, confidence, and competence in such high-pressure situations.
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Container>
                    <Row className="mt-5 justify-content-center">
                      <h3 className="landingHeading mb-5">CodePRep; Bridging the Gap Between Bi-Annual Life Support Training And Clinical Performance</h3>
                      <Col lg={4} md={6} className="pt-3 d-flex">
                        <div className="p-4 homecourses">
                          <div className="">
                            <span className="new">New</span>
                            <img className="img-fluid rounded" src="assets/images/ourcourse1.png" alt="Tverse" />
                          </div>
                          <div className="">
                            <div className="libraryTitle HomeCourseTitle text-center pt-5 pb-3">CodePRep</div>
                            <div className="libraryBody homecoursedescription text-center pt-3 pb-5 ">
                              Improving clinical CPR performance, optimizing patient outcomes, and promoting staff engagement.
                              Emphasizing the importance of mastering the basics before teaching advanced resuscitation skills.

                            </div>
                          </div>
                          <div className="HomeExploreCourse mt-4 mb-3 text-center">
                            <button>
                              {" "}
                              <a href="/professional-profile/trainercourses" target="_blank">
                                Explore Courses
                              </a>
                            </button>
                          </div>
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
      {!loading && (
        <>
          <Container>
            <Col md={12} className="">
              <div className="landingSlider landingUpEvent">
                <div className="landingUpEventBox">
                  {_.get(trainer, "events", []).length > 0 && (
                    <div className="row">
                      {_.get(trainer, "events", []).map((event, idx) => (
                        <>
                          <div className="col-lg-5 col-md-12">
                            <div className="UpEventImg">
                              <img className="img-fluid w-100" src={`${process.env.REACT_APP_API_URL}/uploads/event/${event.event_img}`} alt="" />
                            </div>
                          </div>
                          <div className="col-lg-7 col-md-12">
                            <div className="UpEventText">
                              <h3>{event.heading}</h3>
                              <h4>{event.sub_heading}</h4>
                              <div>{moment(event.event_on).format("MMM DD, h:mm a")}</div>
                              <p dangerouslySetInnerHTML={{ __html: event.event_short_desc }}></p>
                              <div className="HomeRegister mt-4">
                                <button onClick={RegisterShow}>Register Now</button>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Container>
        </>
      )}

      {/* NEED TRAINER */}

      {!loading && (
        <>
          <section className="">
            <Container>
              <Col md={12} className="HomeTraining">
                <div className="landingSlider landingUpEvent">
                  {/* <h3 className="landingHeading">UPCOMING <span>EVENTS</span></h3> */}
                  <div className="landingUpEventBox">
                    <div className="row">
                      <div className="col-lg-7 col-md-12"></div>
                      <div className="col-lg-5 col-md-12">
                        <div className="">
                          <h3 className="landingHeading mb-5">Join Community</h3>
                          <p className="mb-4 homeobjective">Objectives</p>
                          <ul className="ulDesign">
                            <li>
                              To analyze and disseminate Code Blue data to improve resuscitation efforts, quality, and outcomes, reducing hospital
                              mortality.
                            </li>
                            <li className="mt-4 mb-4">
                              Make recommendations regarding improvements of code blue processes centered on Evidence-Based Practice.
                            </li>
                            <li>
                              Continually provide education and training associated with the standards of care in high-quality resuscitative efforts
                            </li>
                          </ul>

                          <div className="HomeRegister HomeJoinNow mt-5">
                            <button className="text-left w-100 mt-3" variant="primary" onClick={handleShow}>
                              {" "}
                              Join Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Container>
          </section>
        </>
      )}

      {!loading && (
        <>
          <Container>
            <Col md={12} className="footerdesign">
              <div className="row">
                <div className="col-md-12">
                  <div className="Footermail text-center">
                    <p className="text-left">Subscribe to Our Rescue RN™ Newsletter</p>
                    <TeacherSubscribe type="inLine" />
                  </div>
                </div>
              </div>
            </Col>
          </Container>
        </>
      )}

      {/* JOIN COMMUNITY FORM */}
      <Modal size="lg" show={show} onHide={handleClose} className="JoinNowModal" closeButton>
        <RegisterForm
          formType="blog"
          eventData={{
            id: 0,
            heading: "Join Community",
            event_short_desc:
              "Be a part of our community and gain access to exclusive content, events, and opportunities to connect with other members.",
          }}
          id={0}
          cta="Join"
        />
      </Modal>
      {/* JOIN COMMUNITY FORM */}

      {/* Register FORM */}
      {_.get(trainer, "events", []).length > 0 && (
        <Modal size="lg" show={RegiShow} onHide={RegisterClose} className="JoinNowModal" closeButton>
          <RegisterForm formType="event" eventData={trainer.events[0]} cta="Register" />
        </Modal>
      )}
      {/* Register FORM */}
    </>
  );
};
export default LandingPage;
