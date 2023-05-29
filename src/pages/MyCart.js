import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import _ from "lodash";
import UserContext from "./../contexts/UserContext";
import Utils from "../Utils";
import { Loader } from "../components";
import axios from "axios";
const MyCart = (props) => {
  const { getUserData, isLoggedIn, getServerData, setServerData, apiHeaders } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [cart, setCart] = useState({ loading: true });
  const [calDiscount, setCalDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [cError, setCError] = useState("");
  const [coupon, setCoupon] = useState(false);

  const deleteRecord = (id) => (e) => {
    if (window.confirm("You are going to delete record, are you sure?")) {
      axios.delete(Utils.apiUrl(`cart/${id}`), apiHeaders()).then((res) => {
        window.alert(res.data.message);
        window.location.reload();
      });
    }
  };

  const emptyCart = (e) => {
    if (window.confirm("You are going to empty all items from the cart, are you sure?")) {
      axios.delete(Utils.apiUrl(`cart/empty`), apiHeaders()).then((res) => {
        window.alert(res.data.message);
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    getServerData("cart")
      .then((cartData) => {
        setCart({ data: cartData, loading: false });
      })
      .catch((err) => {
        setCart({ ...cart, data: [], message: err.message, loading: false });
      });
  }, []);

  useEffect(window.scrollEffect, [cart]);

  const showBundleResources = (cData) => {
    let cres = JSON.parse(cData.course_resources);
    return (
      <>
        {cData.is_bundle && (
          <div className="libraryAuthorInfo">
            {cres.map((cres) => (
              <div key={cres.id}>
                1 x {cres.name} | {cres.type.toUpperCase()} | <b>$ {parseFloat(cres.price).toFixed(2)}</b>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const cartTotalPrice = () => {
    return parseFloat(_.reduce(cart.data, (result, cd) => result + cd.price, 0)).toFixed(2);
  };
  const cartTotalPriceafterDiscount = () => {
    let netAmount = cartTotalPrice();
    if (coupon) {
      if (cartDiscountAmount() > 0) {
        netAmount -= cartDiscountAmount();
      } else {
        netAmount -= _.reduce(
          cart.data.map((cData) => courseDiscountAmount(cData.course_id, cData.trainer_id, cData.price)),
          (sum, n) => sum + n,
          0
        );
      }
    }
    return netAmount;
  };
  /*const cartDiscount = () => {
        const discount = cartTotalPrice() * calDiscount;
        //setCartDiscount(discount);
        // return _.reduce(cart.data, (result, cd) => result + parseFloat(cd.discount), 0);
        return discount;
    };*/

  const onDiscountApply = (e) => {
    e.preventDefault();
    let frm = e.target;

    if (!_.isEmpty(frm.coupon_code.value)) {
      setServerData(`coupons/fetch`, `coupon=${frm.coupon_code.value}`, "post")
        .then((res) => {
          setCoupon(res.data);
        })
        .catch((err) => setCError(err));
    }
  };

  const couponChanged = (e) => {
    setCoupon(false);
    if (_.isEmpty(e.target.value)) {
      setCError(false);
    }
  };

  const courseDiscountAmount = (cid, tid, price) => {
    let disAmount = 0,
      applyCoupon = false;

    if (
      coupon &&
      ((!_.isEmpty(coupon.course_ids) && coupon.course_ids.split(",").includes(cid.toString())) ||
        (_.isEmpty(coupon.course_ids) && cartHasMultiTrainerCourse() && coupon.trainer_id === tid))
    ) {
      disAmount = coupon.coupon_type === 1 ? (price * coupon.discount_value) / 100 : price > coupon.discount_value ? coupon.discount_value : price;
    }
    return disAmount;
  };

  const cartHasMultiTrainerCourse = () => {
    return _.uniq(_.map(cart.data, (d) => d.trainer_id)).length > 1; /// has got multi trainer courses
  };

  const cartDiscountAmount = () => {
    let disAmount = 0;
    if (coupon && _.isEmpty(coupon.course_ids) && !cartHasMultiTrainerCourse() && coupon.trainer_id === cart.data[0].trainer_id) {
      disAmount =
        coupon.coupon_type === 1
          ? (cartTotalPrice() * coupon.discount_value) / 100
          : cartTotalPrice() > coupon.discount_value
          ? coupon.discount_value
          : cartTotalPrice();
    }
    return disAmount;
  };

  useEffect(() => {
    if (
      coupon &&
      !_.isEmpty(coupon.course_ids) &&
      _.intersection(coupon.course_ids.split(","), _.flattenDeep(_.map(cart.data, (c) => c.course_id.toString()))).length === 0
    ) {
      console.log();
      setCError("Coupon not applicable");
    } else {
      console.log(coupon, cart.data);
      console.log("found matching course");
      setCError("");
    }
  }, [coupon]);

  return (
    <>
      <Container fluid className="h-100 p-0">
        {loggedIn && (
          <>
            {processing !== false && (
              <>
                <div className="profile-wrapper">
                  <div className="container">
                    <h1>Checkout</h1>
                    <Alert variant={processing.mode}>
                      <div className="m-5">
                        {processing.msg} <Spinner animation="border" size="sm" />
                      </div>
                    </Alert>
                  </div>
                </div>
              </>
            )}

            {processing === false && (
              <>
                {cart.loading && (
                  <>
                    <>
                      <Loader />
                    </>
                  </>
                )}
                {!cart.loading && (
                  <>
                    <div className="profile-wrapper">
                      <div className="container">
                        <h1>My Cart</h1>
                        <Row>
                          <Col md={12} lg={7} className="mt-3">
                            <div className="libraryBody allCourses">
                              <div className="cartInfobox">
                                {cart.data.map((cData) => (
                                  <Row className="add-space">
                                    <Col md={3}>
                                      <div className="LImgBox1">
                                        <img
                                          className="img-fluid rounded"
                                          src={`${process.env.REACT_APP_API_URL}/uploads/courses/${cData.course_image}`}
                                          alt={cData.name}
                                        />
                                      </div>
                                    </Col>
                                    <Col md={7}>
                                      <div className="CartTextBox p-0">
                                        <div className="libraryTitle">{cData.name}</div>

                                        <span>
                                          Course Price: <b>$ {parseFloat(cData.price).toFixed(2)}</b>
                                        </span>
                                      </div>
                                      {showBundleResources(cData)}
                                    </Col>
                                    <Col md={2}>
                                      {
                                        <div className="LPriceInfoBoxCart">
                                          {/*<i className="fa fa-heart"></i>*/}
                                          <a here="" onClick={deleteRecord(cData.id)}>
                                            <i className="fa fa-trash pl-2 pr-2"></i>
                                          </a>
                                          <a className="Cart-fa-eye" href={Utils.getTrainerURL(`courses/${cData.slug}`)}>
                                            <i className="fa fa-eye"></i>
                                          </a>
                                        </div>
                                      }
                                    </Col>
                                  </Row>
                                ))}

                                <Container>
                                  <Row className="add-space">
                                    {cart.data.length === 0 && (
                                      <>
                                        <p class="alert alert-warning mt-3 mb-5">
                                          Ooopss! Your cart is empty. Click on the button to continue shopping.
                                        </p>
                                      </>
                                    )}
                                    <Col sm={5} className="text-left p-0 mb-2">
                                      <a
                                        href={Utils.getTrainerURL("professional-profile/trainercourses")}
                                        className="btn btn-sm btnBlue font-weight-normal"
                                      >
                                        Continue Shopping
                                      </a>
                                    </Col>
                                    <Col sm={2}></Col>
                                    {cart.data.length !== 0 && (
                                      <>
                                        <Col sm={5} className="text-right p-0">
                                          <Button className="btn btn-sm btnBlue font-weight-normal btn btn-primary" type="button" onClick={emptyCart}>
                                            Clear Cart
                                          </Button>
                                        </Col>
                                      </>
                                    )}
                                  </Row>
                                </Container>
                              </div>
                            </div>
                          </Col>
                          <Col md={12} lg={4} className="cartRightBox">
                            <h6 className="cartheading">Cart Summary</h6>
                            {cart.data.map((cData) => (
                              <Row className="cbox-dash mx-0" key={cData.id}>
                                <Col sm={8}>
                                  <span>{_.truncate(cData.name, { length: 40 })}</span>
                                </Col>
                                <Col sm={4} className="text-right">
                                  $ {parseFloat(cData.price).toFixed(2)}
                                </Col>
                                {courseDiscountAmount(cData.course_id, cData.trainer_id, cData.price) > 0 && (
                                  <>
                                    <Col sm={8} className="text-danger">
                                      <small>Discount applied:</small>
                                    </Col>
                                    <Col sm={4} className="text-danger text-right">
                                      <small>
                                        {" "}
                                        - $ {parseFloat(courseDiscountAmount(cData.course_id, cData.trainer_id, cData.price)).toFixed(2)}
                                      </small>
                                    </Col>
                                  </>
                                )}
                              </Row>
                            ))}

                            {coupon && !cartHasMultiTrainerCourse() && (
                              <Row className="cbox-space mx-0">
                                <Col sm={8}>
                                  <span>Total</span>
                                </Col>
                                <Col sm={4} className="text-right">
                                  <b>$ {cartTotalPrice()}</b>
                                </Col>
                              </Row>
                            )}

                            {cartDiscountAmount() > 0 && (
                              <Row className="cbox-space mx-0 text-danger">
                                <Col sm={8}>
                                  <small>Coupon Discount</small>
                                </Col>
                                <Col sm={4} className="text-right">
                                  <small>- $ {parseFloat(cartDiscountAmount()).toFixed(2)}</small>
                                </Col>
                              </Row>
                            )}

                            <Row className="cbox-space mx-0">
                              <Col sm={8}>
                                <span>Net Total</span>
                              </Col>
                              <Col sm={4} className="text-right">
                                <b>$ {parseFloat(cartTotalPriceafterDiscount()).toFixed(2)}</b>
                              </Col>
                            </Row>
                            {cart.data.length !== 0 && (
                              <>
                                <Form onSubmit={onDiscountApply}>
                                  <Row className="cbox-space mx-0">
                                    <Col sm={7} className="text-left p-0 pr-1 mt-2">
                                      <Form.Control
                                        className="py-0 coupon"
                                        type="text"
                                        name="coupon_code"
                                        placeholder="Coupon Code"
                                        onChange={couponChanged}
                                      />
                                    </Col>
                                    <Col sm={5} className="text-right p-0">
                                      <Button className="btn btn-sm btnBlue font-weight-normal mt-2" type="submit">
                                        Apply Discount
                                      </Button>
                                    </Col>
                                    {!_.isEmpty(cError) && (
                                      <Col sm={12} className="text-danger pt-1">
                                        <span className="fa fa-exclamation-triangle pr-2"></span>
                                        {cError}
                                      </Col>
                                    )}
                                  </Row>
                                </Form>

                                <Row>
                                  <Col sm={12}>
                                    <a
                                      className="btn btn-sm btnBlue font-weight-normal"
                                      type="button"
                                      href={Utils.getTrainerURL(`checkout${_.get(coupon, "id", 0) > 0 ? `?cid=${coupon.id}` : ""}`)}
                                    >
                                      Proceed to pay
                                    </a>
                                  </Col>
                                </Row>
                              </>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}

        {!loggedIn && (
          <>
            {" "}
            <div className="profile-wrapper">
              <div className="container">
                <h1>Cart Page</h1>
                <div className="cartWithoutLogin">
                  <div className="mt-3">
                    Please login to view cart Items.
                    <div />
                    <div className="nav-item" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">
                      {/* <span className='btnSubmit'> Log in</span> */}
                      <div className="w-25">
                        <a href={Utils.getTrainerURL(`login`)} className="btn btnSubmit">
                          {" "}
                          Log In
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default MyCart;
