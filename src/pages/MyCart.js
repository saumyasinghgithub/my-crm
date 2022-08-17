import React,{useEffect,useState, useContext} from 'react';
import {Container, Form, Button,Row, Col, Alert, Spinner} from 'react-bootstrap';
import _ from 'lodash';
import UserContext from './../contexts/UserContext';
import axios from 'axios';
import Utils from '../Utils';

const MyCart = (props) => {

    const {getServerData} = useContext(UserContext);

    const [cart, setCart] = useState({loading: true});

    const [processing, setProcessing] = useState(false);

    const deleteRecord = (id)  => (e) => {
        if(window.confirm("You are going to delete record, are you sure?")){
          axios.delete(Utils.apiUrl(`cart/${id}`),Utils.apiHeaders())
          .then(res => {
            window.alert(res.data.message);
            window.location.reload();
          })
        }
      };

    const emptyCart = (e) => {
    if(window.confirm("You are going to empty all items from the cart, are you sure?")){
        axios.delete(Utils.apiUrl(`cart/empty`),Utils.apiHeaders())
        .then(res => {
            window.alert(res.data.message);
            window.location.reload();
        })
    }
    };

    useEffect(()=>{
        getServerData('cart')
        .then(cartData => {
          setCart({data: cartData, loading: false});
        }).catch(err => {
            setCart({...cart, data: [], message: err.message, loading: false});
        });
    },[]);

    useEffect(window.scrollEffect,[cart]);


    const checkout = (e) => {
        e.preventDefault();
        setProcessing({mode: "info", msg: "Processing your cart items for checkout.."});
        Utils.loadJS('https://checkout.razorpay.com/v1/checkout.js','Razorpay SDK failed to load. Are you online?')
        .then(generateOrder)
        .then(displayRazorpay)
        .catch(err => {
          setProcessing({mode: "danger", msg: err.message});
        });
    };


    const generateOrder = () => {
        return new Promise((resolve,reject) => {
            axios.post(Utils.apiUrl('cart/generateOrder'),'action=checkout',Utils.apiHeaders())
            .then(res => {    
            if(_.get(res,'data.success',false)){
                setProcessing({mode: "info", msg: "Processing your payment.."});          
                resolve(res.data.data);
            }else{
                throw(res.data.message);
            }
            }).catch(reject);
        });
    }

    const displayRazorpay = (orderData) => {

        const udata = Utils.getUserData();

        const options = {
          ...orderData,
          'prefill': {
            'name': `${udata.firstname} ${udata.middlename} ${udata.lastname}`,
            'email': udata.email,
          },
          image: `${process.env.PUBLIC_URL}/logo192.png`,      
          theme: {
              color: "#e0a019",
          },
          handler: (res1) => {
            axios.post(Utils.apiUrl("cart/orderSuccess"), {
              ...orderData,
              orderCreationId: orderData.order_id,
              razorpayPaymentId: res1.razorpay_payment_id,
              razorpayOrderId: res1.razorpay_order_id,
              razorpaySignature: res1.razorpay_signature,
            },Utils.apiHeaders())
            .then(res2 => {
              if(res2.data.success){
                window.setTimeout(() => {              
                  window.location.reload();
                },2000);
              }else{
                throw(res2.data.message);
              }
            }).catch(err => {
              setProcessing({mode: "danger", msg: err.message});
            });        
          },
          modal: {
            "ondismiss": function(){
                setProcessing(false);
            }
          }
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }



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
        
        {processing!==false && <>
                <div className="profile-wrapper">
                    <div className='container'>
                        <h1>Checkout</h1>
                        <Alert variant={processing.mode}><div className="m-5">{processing.msg} <Spinner animation="border" size="sm" /></div></Alert>
                    </div>
                </div>
        </>}
        
        {processing===false && <>
        
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
                                                <div className="LPriceInfoBoxCart">
                                                    <i class="fa fa-heart"></i>
                                                    <a here='' onClick={deleteRecord(cData.id)}><i class="fa fa-trash pl-2 pr-2"></i></a>
                                                    <a href={`${process.env.REACT_APP_PUBLIC_URL}/courses/${cData.slug}`}><i class="fa fa-edit"></i></a>
                                                </div>
                                            </Col>
                                        </Row>)}

                                        

                                        <Row className="add-space">
                                            <Col sm={5} className="text-left p-0">
                                            <a href="/search-results" className="btn btn-sm btnBlue font-weight-normal" >Continue Shopping</a>
                                            </Col>
                                            <Col sm={2}></Col>
                                            <Col sm={5}  className="text-right p-0">
                                            <Button className="btn btn-sm btnBlue font-weight-normal btn btn-primary" type="button" onClick={emptyCart} >Clear Cart</Button>
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
                                        <Button className="btn btn-sm btnBlue font-weight-normal" type="button" onClick={checkout} >Proceed to pay</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </div>
            </>}

        </>}

    </Container>
</>);
};

export default MyCart;