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
    getServerData(`trainer/profile/${slug}`, true)
      .then((tData) => {
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
          <Col md={11} className="landingSlider">
            <MDBCarousel showIndicators fade>
              <MDBCarouselItem
                className="w-100 d-block"
                itemId={1}
                src="https://static.wixstatic.com/media/dacb90_d45f28ce338d496e83fdb93e3fe39ee0~mv2.png/v1/fill/w_1236,h_450,al_c,q_90,enc_auto/dacb90_d45f28ce338d496e83fdb93e3fe39ee0~mv2.png"
                alt="..."
              >
                <div className="slider1Div">
                  <h4 className="sliderh4">"We cannot continue to teach advanced skills when we have not mastered the basics"</h4>
                  <h4>
                    <span>— Dr. Susan Davis</span>
                  </h4>
                  <a href="/">Click Here to Know More About Me</a>
                </div>
              </MDBCarouselItem>

              <MDBCarouselItem
                className="w-100 d-block"
                itemId={2}
                src="https://static.wixstatic.com/media/dacb90_356db284fe4f431ea674d35a1a710fb9~mv2.png/v1/fill/w_1236,h_450,al_c,q_90,enc_auto/dacb90_356db284fe4f431ea674d35a1a710fb9~mv2.png"
                alt="..."
              >
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </MDBCarouselItem>

              <MDBCarouselItem
                className="w-100 d-block"
                itemId={3}
                src="https://static.wixstatic.com/media/dacb90_4ea52b1eae274e2fa231025c9ba8345a~mv2.png/v1/fill/w_1236,h_450,al_c,q_90,enc_auto/dacb90_4ea52b1eae274e2fa231025c9ba8345a~mv2.png"
                alt="..."
              >
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </MDBCarouselItem>
            </MDBCarousel>
          </Col>
          <Col md={10} className="landingSlider landingVideo">
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
          </Col>
          <Col md={10} className="landingBlog">
            {_.get(trainer, "success", false) !== false && (
              <>
                <LandingBlog blogs={trainer.blogs} />
              </>
            )}
          </Col>
          <Col md={10} className="landingEventsHeading">
            <div className="landingEventsDiv">
              <h4>
                OUR UPCOMING EVENTS &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCalendarAlt} />
              </h4>
            </div>
          </Col>
          <Col md={10} className="landingEventsSection">
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
          </Col>
          <Col md={10} className="landingEvents"></Col>
          <Col md={10} className="landingSlider LandingSubscribe">
            <TeacherSubscribe type="inLine" />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default LandingPage;
