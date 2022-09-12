import React,{useEffect, useContext, useState} from 'react';
import {Container, Spinner, Alert} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import UserContext from '../contexts/UserContext';
import Utils from './../Utils';
import _, { get } from 'lodash';

const Success = (props) => {

   const { id } = useParams();
   const [orderData, setOrderData] = useState({});
   const [udata, setuData] = useState({});
   const [loading, setLoading] = useState(true);
   const {getServerData} = useContext(UserContext);

   const fetchOrderInfo = () => {
      
      getServerData(`cart/orderSuccess/${id}`, true)
      .then(res => {
         console.log(res);
         setOrderData(res);
         setLoading(false);
      })
      .catch(msg=> {
         setOrderData({success: false, message: msg});
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
      return <ul>
         {details.map(d => <li><b>{d.split('||')[0]}</b> - ({d.split('||').splice(1).join(',')})</li>)}                    
      </ul>;
   }

    useEffect(() => setuData(Utils.getUserData()), []);
    useEffect(fetchOrderInfo,[]);
    useEffect(window.scrollEffect,[loading]);
 

    return (<>
    <Container className="h-100 ">
            {loading && <>
                <div className="profile-wrapper">
                    <div className='container'>
                        <h1>Success Page Information</h1>
                        <Alert variant="warning"><div className="m-5">loading Success page...! <Spinner animation="border" size="sm" /></div></Alert>
                    </div>
                </div>
            </>}

            {!loading && <>
                {_.get(orderData,'success',false)===false && <>
                    <div className="profile-wrapper">
                        <div className='container'>
                            <h1>Success Page</h1>
                            <Alert variant="danger"><div className="m-5">{orderData.message}</div></Alert>
                        </div>
                    </div>
            </>} 
   {_.get(orderData,'success',false)!==false && <> 
    <div className="help-wrapper">
      <nav>
            <ol className="cd-breadcrumb">
               <li><a href="/">Home</a></li>
               <li className="current"><em>Success</em></li>
            </ol>
      </nav>
   <div className="">
      <img src="/assets/images/success-page.jpg" alt="AD" />
      <div className="AD-help">
         <div className="row">
            <div className="col-sm-12">
               <h1 className="successheading slideInUp wow ">Hey, {udata.firstname} ! Your Order has been Successfully Placed!</h1>
                  <p>
                    <strong>Thank you for purchaged the course. </strong>
                  </p> 
                  <p>Your Order References No. :  <strong>{getOrderDump('razorpayOrderId')}</strong></p>
                  <hr />
                  <p>
                    <h4>Course(s) bought by you :</h4>  {showCourses()}
                  </p> 

                     <ol className="faq pt-3">
                        <li>We have Successfully send mail in your regidterd email ID.</li>
                        <li>Verify your courses your have purchages in your email.</li>
                     </ol>
               <div className="succpage">   
                   
                  
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-sm-6 text-right"><strong><a href={`${process.env.PUBLIC_URL}/search-results`} className="btn btn-primary">Continue Order...</a></strong></div>
            <div className="col-sm-6 text-left"><strong><a href={`${process.env.PUBLIC_URL}/my-order`} className="btn btn-success"> View My Orders</a></strong></div>
            <div className="col-sm-6 text-left"><strong><a href={`${process.env.REACT_APP_MOODLE_URL}/my`} className="btn btn-success"> Enroll Course</a></strong></div>
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