import React,{useEffect,useState, useContext} from 'react';
import {Container, Form, Button,Row, Col} from 'react-bootstrap';
import _ from 'lodash';


const MyCart = (props) => {


    useEffect(window.scrollEffect,[]);

    return (<>
    <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
            <div className="container100">
                <h1>My cart</h1>
                <Row>  
                    <Col md={7} className="mt-3">
                        <div className="libraryBody allCourses">
                              <div className="cartInfobox">
                                <Row className="add-space">
                                    <Col md={2}>
                                    <div className="LImgBox1">
                                        <img className="img-fluid" src="/assets/images/knowledge_3.jpg" alt="cart-item" />
                                    </div>
                                    </Col>
                                    <Col md={7}>
                                    <div className="CartTextBox p-0">
                                        <div class="libraryTitle">Automobile Engineering Courses</div>
                                        <span>Asset TYpe</span>
                                    </div>
                                    <div class="libraryAuthorInfo">
                                        <span>1 x Automobile Engineering Courses | PDF | $90.00</span>
                                        <span>1 x Automobile Engineering Courses | Video | $90.00</span>
                                    </div>
                                    </Col>
                                    <Col md={2}>
                                        <div className="LPriceInfoBox">
                                            <i class="fa fa-heart"></i>
                                            <i class="fa fa-trash pl-2 pr-2"></i>
                                            <i class="fa fa-edit"></i>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="add-space">
                                    <Col md={2}>
                                    <div className="LImgBox1">
                                        <img className="img-fluid" src="/assets/images/knowledge_3.jpg" alt="cart-item" />
                                    </div>
                                    </Col>
                                    <Col md={7}>
                                    <div className="CartTextBox p-0">
                                        <div class="libraryTitle">Automobile Engineering Courses</div>
                                        <span>Asset TYpe</span>
                                    </div>
                                    <div class="libraryAuthorInfo">
                                        <span>1 x Automobile Engineering Courses | PDF | $90.00</span>
                                        <span>1 x Automobile Engineering Courses | Video | $90.00</span>
                                    </div>
                                    </Col>
                                    <Col md={2}>
                                        <div className="LPriceInfoBox">
                                            <i class="fa fa-heart"></i>
                                            <i class="fa fa-trash pl-2 pr-2"></i>
                                            <i class="fa fa-edit"></i>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="add-space">
                                    <Col sm={5} className="text-left p-0">
                                    <Button className="btn btn-sm btnBlue font-weight-normal" type="submit" >Continue Shopping</Button>
                                    </Col>
                                    <Col sm={2}></Col>
                                    <Col sm={5}  className="text-right p-0">
                                    <Button className="btn btn-sm btnBlue font-weight-normal btn btn-primary" type="submit" >Clear Cart</Button>
                                    </Col>
                                </Row>

                              </div>
                        </div>
                    </Col>
                    <Col md={4} className="slideInUp wow animated cartRightBox">  
                        <h6 className="cartheading">Cart Summary</h6>
                        <Row className="cbox-dash mx-0">
                            <Col sm={8}>
                                <span>Subtotal</span>
                            </Col>
                            <Col sm={4} className="text-right">
                                $190.00
                            </Col>
                        </Row>
                        <Row className="cbox-space mx-0">
                            <Col sm={8}><span>Coupon Discount</span></Col>
                            <Col sm={4} className="text-right"><span>$10.00</span></Col>
                        </Row>
                        <Row className="cbox-space mx-0">
                            <Col sm={8}><span>Total</span></Col>
                            <Col sm={4} className="text-right"><span>$180.00</span></Col>
                        </Row>
                        <Form>
                        <Row className="cbox-space mx-0">
                            
                            <Col sm={7} className="text-left p-0 pr-1">
                                <Form.Control className="py-0 coupon" type="text" name="coupon" placeholder="Coupon Code" />
                            </Col>
                            <Col sm={5} className="text-right p-0">
                                <Button className="btn btn-sm btnBlue font-weight-normal" type="submit" >Apply Discount</Button>
                            </Col>                        
                        </Row>
                        </Form>
                        <Row>
                            <Col sm={12}>
                                <Button className="btn btn-sm btnBlue font-weight-normal" type="submit" >Proceed to pay</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        </div>
    </Container>
</>);
};

export default MyCart;