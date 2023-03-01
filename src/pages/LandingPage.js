import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';

const LandingPage = (props) => {
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
                <Col md={10}>
                    <Col></Col>
                    <Col></Col>
                </Col>
            </Row>
        </Container>
    </>);
}
export default LandingPage;