import React,{useEffect,useState, useContext} from 'react';
import {Container, Form, Button,Row, Col, Alert, Spinner} from 'react-bootstrap';
import _ from 'lodash';
import UserContext from './../contexts/UserContext';

const MyCart = (props) => {

    const {getServerData} = useContext(UserContext);

    const [cart, setCart] = useState({loading: true});

    useEffect(()=>{
        getServerData('cart')
        .then(cartData => {
          setCart({data: cartData, loading: false});
        }).catch(err => {
            setCart({...cart, data: [], message: err.message, loading: false});
        });
    },[]);

    useEffect(window.scrollEffect,[cart]);

    const showBundleResources = (cData) => {
        let cres = JSON.parse(cData.course_resources);
        return <>
            {cData.is_bundle && <div class="libraryAuthorInfo">
                {cres.map(cres => <div key={cres.id}>
                    1 x {cres.name} | {cres.type.toUpperCase()} | <b>$ {parseFloat(cres.price).toFixed(2)}</b>
                </div>)}
            </div>}
        </>;
    }

    const cartTotalPrice = () => {
       return parseFloat(_.reduce(cart.data, (result,cd) => result+cd.price,0)).toFixed(2);
    };

    /*const cartDiscount = () => {
        return _.reduce(cart.data, (result,cd) => result + parseFloat(cd.discount),0);
    };

    const cartTotalPrice = () => {
        return cartSubTotalPrice() - cartDiscount();
    };*/

    return (<>
    <Container fluid className="h-100 p-0">
        {cart.loading && <>
                <div className="profile-wrapper">
                    <div className='container'>
                        <h1>Course</h1>
                        <Alert variant="warning"><div className="m-5">Fetching your cart items <Spinner animation="border" size="sm" /></div></Alert>
                    </div>
                </div>
        </>}
        {!cart.loading && <>
            <div className="profile-wrapper">
                <div className="container100">
                    <h1>My cart</h1>
                    <Row>  
                        <Col md={7} className="mt-3">
                            <div className="libraryBody allCourses">
                                <div className="cartInfobox">
                                    {cart.data.map(cData => <Row className="add-space">
                                        <Col md={2}>
                                        <div className="LImgBox1">
                                            <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/uploads/courses/${cData.course_image}`} alt={cData.name} />
                                        </div>
                                        </Col>
                                        <Col md={7}>
                                            <div className="CartTextBox p-0">
                                                <div class="libraryTitle">{cData.name}</div>
                                                
                                                <span>Course Price: <b>$ {parseFloat(cData.baseprice).toFixed(2)}</b></span>
                                            </div>
                                            {showBundleResources(cData)}
                                        </Col>
                                        <Col md={2}>
                                            <div className="LPriceInfoBox">
                                                <i class="fa fa-heart"></i>
                                                <i class="fa fa-trash pl-2 pr-2"></i>
                                                <i class="fa fa-edit"></i>
                                            </div>
                                        </Col>
                                    </Row>)}

                                    

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
                            {cart.data.map(cData => <Row className="cbox-dash mx-0" key={cData.id}>
                                <Col sm={8}>
                                    <span>{_.truncate(cData.name,{length: 40})}</span>
                                </Col>
                                <Col sm={4} className="text-right">
                                    $ {parseFloat(cData.price).toFixed(2)}
                                </Col>
                            </Row>)}
                            {/*<Row className="cbox-space mx-0">
                                <Col sm={8}><span>Coupon Discount</span></Col>
                                <Col sm={4} className="text-right"><span>${cartDiscount()}</span></Col>
                            </Row>*/}
                            <Row className="cbox-space mx-0">
                                <Col sm={8}><span>Total</span></Col>
                                <Col sm={4} className="text-right"><b>$ {cartTotalPrice()}</b></Col>
                            </Row>
                            <Form>
                            {/*<Row className="cbox-space mx-0">
                                
                                <Col sm={7} className="text-left p-0 pr-1">
                                    <Form.Control className="py-0 coupon" type="text" name="coupon" placeholder="Coupon Code" />
                                </Col>
                                <Col sm={5} className="text-right p-0">
                                    <Button className="btn btn-sm btnBlue font-weight-normal" type="submit" >Apply Discount</Button>
                                </Col>                        
                        </Row>*/}
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
        </>}
    </Container>
</>);
};

export default MyCart;