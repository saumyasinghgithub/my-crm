import React,{useEffect} from 'react';
import {Container} from 'react-bootstrap';

const Success = (props) => {
    useEffect(window.scrollEffect,[]);
    
    return (<>
    <Container className="h-100 ">
    <div className="help-wrapper">
    <nav>
                        <ol class="cd-breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li class="current"><em>Success</em></li>
                        </ol>
                    </nav>
   <div className="">
      <img src="assets/images/success-page.jpg" alt="" />
      <div className="AD-help">
         <div className="row">
            <div className="col-sm-12">
               <h1 className="successheading slideInUp wow ">Order Successfully Placed!</h1>
               
               <p><strong>Thank you for purchaged the course. </strong>
                     Your Order References No. : <strong>AD-00032124</strong></p>
                     <ol className="faq pt-3">
                        <li>We have Successfully send mail in your regidterd email ID.</li>
                        <li>Verify your courses your have purchages in your email.</li>
                     </ol>
               <div className="succpage">   
                   
                  
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-sm-6"><strong><a href={`${process.env.PUBLIC_URL}/search-results`} className="btn btn-primary">Continue Order...</a></strong></div>
            <div className="col-sm-6"><strong><a href={process.env.PUBLIC_URL} className="btn btn-success"> View Order</a></strong></div>
         </div>
      </div>
   </div>
</div>
</Container>
</>);
}; 

export default Success;