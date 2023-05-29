import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Button, Row, Col, Alert, Spinner, Card } from "react-bootstrap";
import _ from "lodash";
import UserContext from "./../contexts/UserContext";
import Utils from "../Utils";
import { useSearchParams } from "react-router-dom";

const Checkout = (props) => {
  const [processing, setProcessing] = useState(false);
  const [pgs, setPgs] = useState([]); // Payment Gateways
  const [pgId, setPgId] = useState(0); // payment gateway chosed
  const [coupon, setCoupon] = useState({});
  const { getUserData, getServerData, setServerData, isLoggedIn } = useContext(UserContext);
  const searchParams = new URLSearchParams(window.location.search);
  const cid = searchParams.get("cid");

  const loadPgs = () => {
    setProcessing({ mode: "info", msg: "Preparing for checkout.." });
    getServerData("cart/pgs")
      .then((data) => {
        setPgs(data);
        setProcessing(false);
      })
      .catch((err) => setProcessing({ mode: "danger", msg: err.message }));
  };

  useEffect(loadPgs, []);

  useEffect(window.scrollEffect, []);

  const processCheckout = () => {
    switch (pgId) {
      case parseInt(process.env.REACT_APP_RAZORPAY):
        checkoutWithRazorpay();
        break;
      case parseInt(process.env.REACT_APP_PAYPAL):
        checkoutWithPaypal();
        break;
      default: // do nothing;
    }
  };

  useEffect(processCheckout, [pgId]);

  const checkoutWithRazorpay = (e) => {
    setProcessing({ mode: "info", msg: "Processing Razorpay checkout.." });
    Utils.loadJS("https://checkout.razorpay.com/v1/checkout.js", "Razorpay SDK failed to load. Are you online?")
      .then(generateOrder)
      .then(displayRazorpay)
      .catch((err) => {
        setProcessing({ mode: "danger", msg: err.message });
      });
  };

  const checkoutWithPaypal = (e) => {
    setProcessing({ mode: "info", msg: "Processing Paypal checkout.." });
    Utils.loadJS(`https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`, "Razorpay SDK failed to load. Are you online?")
      .then(generateOrder)
      .then(displayRazorpay)
      .catch((err) => {
        setProcessing({ mode: "danger", msg: err.message });
      });
  };

  const generateOrder = () => {
    return new Promise((resolve, reject) => {
      let params = {
        action: "checkout",
        pgid: pgId,
      };

      if (cid) {
        params["coupon_id"] = cid;
      }

      setServerData("cart/generateOrder", params, "post", { "Content-Type": "application/json" })
        .then((res) => {
          if (_.get(res, "success", false)) {
            setProcessing({ mode: "info", msg: "Processing your payment.." });
            resolve(res.data);
          } else {
            throw res.message;
          }
        })
        .catch(reject);
    });
  };

  const displayRazorpay = (orderData) => {
    const udata = getUserData();

    const options = {
      ...orderData,
      prefill: {
        name: `${udata.firstname} ${udata.middlename} ${udata.lastname}`,
        email: udata.email,
        contact: "+919868256219",
      },
      image: `${process.env.PUBLIC_URL}/favicon.png`,
      theme: {
        color: "##0f79aa",
      },
      handler: (res1) => {
        setServerData(
          "cart/orderSuccess",
          {
            ..._.omit(orderData, ["key", "order_id"]),
            razorpayPaymentId: res1.razorpay_payment_id,
            razorpayOrderId: res1.razorpay_order_id,
            razorpaySignature: res1.razorpay_signature,
          },
          "post",
          { "Content-Type": "application/json" }
        )
          .then((res2) => {
            if (res2.success) {
              window.location.href = "/payment/success/" + res2.id;
            } else {
              throw res2.message;
            }
          })
          .catch((err) => {
            setProcessing({ mode: "danger", msg: err.message });
          });
      },
      modal: {
        ondismiss: function () {
          setProcessing(false);
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const renderPGBox = (pg) => {
    return (
      <div className="flex-fill text-center" key={pg.id}>
        <Button variant="outline-dark" className="p-1" onClick={() => setPgId(pg.id)}>
          {!_.isEmpty(pg.logo) && <img src={pg.logo} />}
          {_.isEmpty(pg.logo) && <h5 className="px-3 py-1">Pay with {pg.title}</h5>}
        </Button>
      </div>
    );
  };

  return (
    <>
      <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
          <div className="container">
            <h1 className="mb-5">Checkout</h1>
            {isLoggedIn() && (
              <>
                {processing !== false && (
                  <>
                    <Alert variant={processing.mode}>
                      <div className="m-5">
                        {processing.msg} <Spinner animation="border" size="sm" />
                      </div>
                    </Alert>
                  </>
                )}
              </>
            )}
            {processing === false && (
              <>
                {pgs.length === 0 && (
                  <>
                    <Alert variant="warning">
                      <div className="m-5">No Payment Gateway found, please contact Site Administrator!</div>
                    </Alert>
                  </>
                )}
                {pgs.length > 0 && <div className="d-flex align-items-center">{_.map(pgs, renderPGBox)}</div>}
              </>
            )}

            {!isLoggedIn() && (
              <>
                <div className="cartWithoutLogin">
                  <div className="mt-3">
                    Please login to proceed checkout.
                    <div />
                    <div className="nav-item" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">
                      {/* <span className='btnSubmit'> Log in</span> */}
                      <div className="w-25">
                        <a href={Utils.getTrainerURL(`login`)} className="btn btnSubmit">
                          Log In
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
export default Checkout;
