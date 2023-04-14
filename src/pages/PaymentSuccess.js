import React, { useEffect, useContext, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import Utils from './../Utils';
import _, { get } from 'lodash';
import { Loader } from '../components';

const Success = (props) => {

   const { id } = useParams();
   const [orderData, setOrderData] = useState({});
   const [udata, setuData] = useState({});
   const [loading, setLoading] = useState(true);
   const { getServerData, loginToMoodle } = useContext(UserContext);

   const fetchOrderInfo = () => {

      getServerData(`cart/orderSuccess/${id}`, true)
         .then(res => {
            console.log(res);
            setOrderData(res);
            setLoading(false);
         })
         .catch(msg => {
            setOrderData({ success: false, message: msg });
            setLoading(false);
         });
   };

   const getOrderDump = (ename = null) => {
      const odump = JSON.parse(orderData.data.dump);
      return _.get(odump, ename, odump);
   };

   const showCourses = () => {
      const dump = JSON.parse(orderData.data.dump);
      const details = dump.description.split(" AND ");
      return <ul className='ShowCoursePay'>
         {details.map(d => <li className='mt-2 mb-2'>{d.split('||')[0]} - <span className="text-uppercase">({d.split('||').splice(1).join(',')})</span></li>)}
      </ul>;
   }

   useEffect(() => setuData(Utils.getUserData()), []);
   useEffect(fetchOrderInfo, []);
   useEffect(window.scrollEffect, [loading]);


   return (<>
      <Container className="h-100 PaymentSuccess">
         {loading && <>
            <>
          <Loader />
        </>
         </>}

         {!loading && <>
            {_.get(orderData, 'success', false) === false && <>
               <div className="profile-wrapper">
                  <div className='container'>
                     <h1>Success Page</h1>
                     <Alert variant="danger"><div className="m-5">{orderData.message}</div></Alert>
                  </div>
               </div>
            </>}
            {_.get(orderData, 'success', false) !== false && <>
               <div className="help-wrapper">
                  <div className="container">
                     <img src="/assets/images/payment.png" alt="PaymentImg" />
                     <div className="AD-help">
                        <div className="row">
                           <div className='col-12 col-lg-2 col-md-12'></div>
                           <div className='col-12 col-lg-9 col-md-12 mt-5'>
                              <div className='d-flex align-center Sucesmsgimg mt-5 mb-5'>
                                 <div className='row align-center'>
                                    <div className='col-12 col-md-2 col-lg-2 text-center'>
                                       <img src='/assets/images/tick.png' alt='' />
                                    </div>
                                    <div className='col-12 col-md-10 col-lg-10'>
                                       <h1 className="successheading slideInUp wow text-left mt-0">Hey, {udata.firstname} ! Your Order has been Successfully Placed!</h1>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className='col-12 col-lg-1 col-md-12'></div>
                           <div className="col-sm-12 mt-5 PaymtOrderdet">
                              <p className='mb-2'>
                                 We're glad you bought the course.
                              </p>
                              <p>Your Order References No. :  <strong>{getOrderDump('razorpayOrderId')}</strong></p>
                              <div className="succpage">

                              </div>
                              <hr />
                           </div>

                           <div className="col-lg-4 col-12 mt-5">
                              <p>
                                 <h4 className='mt-1 mb-1'><b>The course(s) you bought: </b></h4>
                              </p>
                           </div>
                           <div className="col-lg-8 col-12 mt-5">
                              <ol className=''>
                                 <li className=''>{showCourses()}</li>
                              </ol>
                           </div>
                           <div className='col-12 mt-4'>
                              <hr />
                              <p className='PaymntSteps mt-5'>Steps:</p>
                              <ol className="faq pt-3">
                                 <li className='mt-4 mb-4'>We've sent a message to your registered email address successfully.</li>
                                 <li className='mt-4 mb-4'>Please verify the courses you have purchased from your inbox.</li>
                              </ol>
                           </div>

                        </div>
                        <div className="row mt-5 PaymentBtn">
                           <div className="col-12 col-md-4 col-lg-4 col-xl-6 text-left HomeRegister "><strong><button className="btn text-white EnrolNowOrder" onClick={() => loginToMoodle(document.forms.moodleLoginForm)}>Visit Your Learning Center</button></strong></div>
                           <div className="col-12 col-md-4 col-lg-4 col-xl-3 text-right HomeRegister"><strong><a href={`${process.env.PUBLIC_URL}/professional-profile/trainercourses`} className=""><button> Continue Order</button></a></strong></div>
                           <div className="col-12 col-md-4 col-lg-4 col-xl-3 text-right HomeRegister"><strong><a href={`${process.env.PUBLIC_URL}/my-order`} className=""><button> View My Orders</button></a></strong></div>
                        </div>
                     </div>
                  </div>
               </div>
            </>}
         </>}
      </Container>
   </>);
};

export default Success;