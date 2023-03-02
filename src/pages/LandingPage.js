import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';
import ReactPlayer from 'react-player/lazy'
import { TeacherSubscribe } from '../components/teacher';
import { LandingBlog } from '../components/landing';
import Utils from './../Utils';
import UserContext from './../contexts/UserContext';
import _ from 'lodash';

const LandingPage = (props) => {
    const slug = Utils.subdomain();
    const [trainer, setTrainer] = useState({});
    const { getServerData } = useContext(UserContext);
    const src = "https://www.rescuern.com/";
    useEffect(() => {
        getServerData(`trainer/profile/${slug}`, true)
            .then(tData => {
                setTrainer(tData);
            })
            .catch(msg => {
                setTrainer({ success: false, message: msg });
            });
    }, []);
    return (<>
        <Container fluid>
            <Row className="landingPageRow">
                <Col md={11} className="landingSlider">
                    <MDBCarousel showIndicators showControls fade>
                        <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={1}
                            src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg'
                            alt='...'
                        >
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </MDBCarouselItem>

                        <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={2}
                            src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
                            alt='...'
                        >
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </MDBCarouselItem>

                        <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={3}
                            src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg'
                            alt='...'
                        >
                            <h5>Third slide label</h5>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </MDBCarouselItem>
                    </MDBCarousel>
                </Col>
                <Col md={10} className="landingSlider landingVideo">
                    <Col md={7} className="landingFloatVideo">
                        <iframe
                            width="560"
                            height="315"
                            src={src}
                            title="Youtube Player"
                            frameborder="0"
                            allowFullScreen
                        />
                    </Col>
                    <Col md={5} className="landingFloatText">
                        <div>
                            <h2>
                                <span>Objectives:</span>
                            </h2>
                            <ul>
                                <li>
                                    To analyze and disseminate
                                    Code Blue
                                    data to improve resuscitation efforts, quality, and outcomes, reducing hospital mortality.                                    
                                </li>
                                <li>
                                    Make recommendations regarding improvements of code blue processes centered on Evidence-Based Practice.
                                </li>
                                <li>
                                    Continually provide education and training associated with the standards of care in high-quality resuscitative efforts                                    
                                </li>
                            </ul>
                        </div>
                        <div>
                            <a className="joinnowBtn" href="/contact-us">Join Now</a>
                        </div>
                    </Col>
                </Col>
                <Col md={10} className="landingBlog">
                    {_.get(trainer, 'success', false) !== false && <>
                        <LandingBlog blogs={trainer.blogs} />
                    </>}
                </Col>
                <Col md={10} className="landingSlider LandingSubscribe">
                    <TeacherSubscribe type="inLine" />
                </Col>
            </Row>
        </Container>
    </>);
}
export default LandingPage;