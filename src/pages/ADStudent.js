import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const ADStudent = (props) => {
   useEffect(window.scrollEffect, []);

   return (<>
      <Container className="h-100 ">
         <div className="help-wrapper">
            {/*<nav>
                        <ol className="cd-breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li className="current"><em>Help for Student</em></li>
                        </ol>
    </nav>*/}
            <div className="">
               <img src="assets/images/help.png" alt="" />
               <div className="AD-help">
                  <div className="row">
                     <div className="col-sm-12">
                        <h1 className="headingtext slideInUp wow ">Help for Student</h1>
                        <ol className="faq pt-3">
                           <li>
                              <strong>Why should I use Tverse to find a personal trainer?</strong>
                              <p>A personal trainer can help you reach your professional goals faster, using verified learning material. You can use the filters on the page to find the trainer whose qualifications and experience meets your needs.</p>
                              <p>The trainer will then chalk out a course of plan that will help you achieve your professional goals. This will help you improve you resume and help you gain confidence.</p>
                           </li>
                           <li>
                              <strong>Do I have to pay any membership fees to look for a trainer who meets my needs?</strong>
                              <p>No. You can avail the services of finding your trainer for free. However, on finding your trainer depending on the charges of the trainer’s courses you will be required to a pay a certain amount. There are no initiation fees, membership dues, or hidden costs.</p>
                           </li>
                           <li>
                              <strong>Is there any way to preview a course offered by the trainer?</strong>
                              <p>Yes! If you're not sure the trainer you have selected has the perfect courses for you, you can start a free preview and watch a handful of lectures of the trainer. To get the full curse you will have to pay a certain amount as given by the trainer.</p>
                           </li>
                           <li>
                              <strong>Are the means of payment on Tverse secure?</strong>
                              <p>Yes! Tverse uses a secure connection while processing your payments. So, you need to worry about ant fraudulent use of your passcodes and bank accounts. Kaspersky is used to detect any viruses and ensures that the connection that is established is secure, leaving you with a safe experience.</p>
                           </li>
                           <li>
                              <strong>What if I don’t like a course I purchased?</strong>
                              <p>We want you to be satisfied, so if you're not happy with a course, you can request a full refund within 30 days of purchasing the course.</p>
                           </li>
                           <li>
                              <strong>Will I get a certificate of completion of any of the courses that I undertake a trainer under an accredited institution?</strong>
                              <p>Tverse is not an accredited institution, we offer skills-based courses taught by experts in their field, whose entry is verified.</p>
                           </li>
                        </ol>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Container>
   </>);
};

export default ADStudent;