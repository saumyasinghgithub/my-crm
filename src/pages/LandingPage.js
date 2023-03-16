import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

import { TeacherSubscribe } from "../components/teacher";
import { LandingBlog } from "../components/landing";
import Utils from "./../Utils";
import UserContext from "./../contexts/UserContext";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const LandingPage = (props) => {
  const slug = Utils.subdomain();
  const [trainer, setTrainer] = useState({});
  const { getServerData } = useContext(UserContext);
  const src = "https://rajesh-singh-1.autodidact.app/";
  const poster =
    "https://static.wixstatic.com/media/dacb90_f7f587e79fd14896a3f30e5a475c1e99~mv2.png/v1/fill/w_648,h_366,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/dacb90_f7f587e79fd14896a3f30e5a475c1e99~mv2.png";
  const video = "https://youtu.be/IPzGKaY4-yw";
  useEffect(() => {
    getServerData(`trainer/landing/${slug}`, true)
      .then((tData) => {
        console.log(tData);
        setTrainer(tData);
      })
      .catch((msg) => {
        setTrainer({ success: false, message: msg });
      });
  }, []);
  return (
    <>
      <Container fluid>
        <Row className="landingPageRow">
          <div className="landingSlider">
            {_.get(trainer, "slides", []).length > 0 && (
              <MDBCarousel showIndicators fade>
                {_.get(trainer, "slides", []).map((slide, idx) => (
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
                ))}
              </MDBCarousel>
            )}
          </div>

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

          <Container>
            <Col md={12} className="landingSlider landingVideo">
              <h3 class="landingHeading">Join <span>Community</span></h3>
              <div class="landingFloatVideo">
                <video src={video} controls poster={poster} width="100%" height="100%"></video>
              </div>
              <div class="landingSlider landingObjectives">
                <h3 class="landingHeading"><span>Objectives</span></h3>
                <div class="landingObjBox">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="ObjBoxImg"><img src='assets/images/objective.png' className="img-fluid" alt="" /></div>
                    </div>
                    <div class="col-md-8">
                      <ul class="objectText">
                        <li>To analyze and disseminate Code Blue data to improve resuscitation efforts, quality, and outcomes, reducing hospital mortality.</li>
                        <li>Make recommendations regarding improvements of code blue processes centered on Evidence-Based Practice.</li>
                        <li>Continually provide education and training associated with the standards of care in high-quality resuscitative efforts</li>
                      </ul>
                      <div class="joinNowBtn"><button> <a href="/contact-us">
                        Join Now
                      </a></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Container>

          {/* END Join Community */}

          {/* BLOG */}
          <Container>
            <Col md={12} className="landingBlog">
              <h3 class="landingHeading"><span>Blogs</span></h3>
              {_.get(trainer, "success", false) !== false && (
                <>
                  <LandingBlog blogs={trainer.blogs} />
                </>
              )}
            </Col>
          </Container>
          {/* BLOG */}


          {/* upcoming event */}
          <Container>
            <Col md={12} className="">
              <div class="landingSlider landingUpEvent">
                <h3 class="landingHeading">UPCOMING <span>EVENTS</span></h3>
                <div class="landingUpEventBox">
                  <div class="row">
                    <div class="col-sm-5">
                      <div class="UpEventImg"><img class="img-fluid" src="assets/images/upcomingevent.png" alt="" /></div>
                    </div>
                    <div class="col-sm-7">
                      <div class="UpEventText">
                        <h3>KICKSTART MY HEART</h3>
                        <h4>Virtual Event - A Podcast Series</h4>
                        <div>Apr 01, 7:00 AM</div>
                        <div>Do you strut into a code blue with confidence, knowing you're going to nail it, no matter what? Or do you stumble in with unease and anxiety, feeling unprepared and overwhelmed? Let's face it, code blue events can leave you feeling like you've been hit by a bus, and that's not a good look on anyone.<br /> <br />Can you make it?</div>
                        <div class="joinNowBtn"><button>Register Now</button></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Container>

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
          <Col md={12} className="landingSlider LandingSubscribe">
            <TeacherSubscribe type="inLine" />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default LandingPage;
