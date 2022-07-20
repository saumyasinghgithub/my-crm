import React,{useEffect} from 'react';
import {Container} from 'react-bootstrap';

const ADTrainer = (props) => {
    useEffect(window.scrollEffect,[]);
    
    return (<>
    <Container className="h-100 ">
    <div className="help-wrapper">
    <nav>
                        <ol class="cd-breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li class="current"><em>Help for Trainers</em></li>
                        </ol>
                    </nav>
   <div className="">
      <img src="assets/images/Help_for_trainers.jpg" alt="" />
      <div className="AD-help">
         <div className="row">
            <div className="col-sm-12">
               <h1 className="headingtext slideInUp wow ">Help for trainers</h1>
               <ol className="faq pt-3">
                  <li>
                     <strong>What is the process to become an Autodidact Trainer?</strong>
                     <p>To become a qualified trainer on Autodidact you will have to go through the following steps:</p>
                     <ol className='listdecimal'>
                        <li>Create an account on Autodidact as a trainer and wait for a verification mail.</li>
                        <li>The Autodidact team will verify your resume and other details.</li>
                        <li>If selected, you will be asked to create a demo lesson on any topic of your choice.</li>
                        <li>If your demo is approved, you will have a face to face or skype interview.</li>
                     </ol>
                  </li>
                  <li>
                     <strong>Why should I use Autodidact to impart my skills and lessons learnt through my experiences to students?</strong>
                     <p>Autodidact makes the search for a trainer easier for students. So, by coming on this platform you will be able to maximize your reach to professional who need guidance and other skill enhancement programs. It also helps Companies find you. It makes it easier for them to look for professionals with expertise.</p>
                  </li>
                  <li>
                     <strong>Do I have to pay any membership fees on Autodidact?</strong>
                     <p>Yes.</p>
                  </li>
                  <li>
                     <strong>Can I create the courses I want to teach on Autodidact?</strong>
                     <p>No. You cannot create courses on Autodidact. For this you will have to use other sites that offer you the service of course creation for online media. You can use pictures of your hand-written notes, whiteboard notes, a PPT, PDF or any content which is free from copyright i.e. available to be freely used and the content is in public domain.<br /> There must be no plagiarism. It is important to give references at the end of each course.</p>
                  </li>
                  <li>
                     <strong>Can I record the videos using screen casting, video camera, pen tablet, mobile camera or other means and use that for uploading?</strong>
                     <p>Yes, you can do that. But keep in mind that the course must be easily seen and understand by the student.</p>
                  </li>
                  <li>
                     <strong>Will I be able to charge a certain amount on the courses I offer and have a limit to the number of student intake?</strong>
                     <p>Yes! You can charge a certain amount for the courses (videos created like lectures, simulations etc.) uploaded by you. AD uses a secure connection while processing your payments. For this you can enter your account details and once the student makes the payment, the money will be transferred directly to your account.</p>
                     <p>So, you need to worry about ant fraudulent use of your passcodes and bank accounts. Kaspersky is used to detect any viruses and ensures that the connection that is established is secure, leaving you with a safe experience.</p>
                     <p><strong>NOTE: There will be an upper limit to the amount chargeable, depending on the industry.</strong></p>
                  </li>
                  <li>
                     <strong>How do I become a great trainer and increase the number of my followers?</strong>
                     <p>Domain Expert – Do a thorough research on the topic you want to teach and make sure all the verified and relevant information is included in the lesson.</p>
                     <p>Confidence: Exude confidence and enthusiasm in your learners to improve the chances of knowledge retention. By doing so you are also making the course and training engaging.&gt;</p>
                     <p>Voice Modulation: Don’t be monotonous. They vary their voice a lot, so that the learners stay engaged.</p>
                     <p>Use of examples, stories, anecdotes: From your experience, use incidents that will help students remember the concepts and also guide them in knowing where to apply the principles taught.</p>
                     <p>Use of unique teaching methodologies: Use creative diagrams, graphs, charts, mnemonics etc. to ensure that the learners remember the facts and concepts.</p>
                  </li>
                  <li>
                     <strong>What are the topics on which I can create trainings?</strong>
                     <p>You can create a course on any educational topic. Autodidact already has many existing topic lists and you can choose to create courses on any of those categories. However, if you do not find the topic of your interest, you can still go ahead and create a few courses and we will add that topic to the platform.</p>
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

export default ADTrainer;