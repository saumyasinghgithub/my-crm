import React,{useEffect} from 'react';
import {Container} from 'react-bootstrap';

const TermConditions = (props) => {
    useEffect(window.scrollEffect,[]);
    
    return (<>
   <Container className="h-100 p-0">
   <div className="help-wrapper"> 
 
    <div className="container">
    <nav>
            <ol className="cd-breadcrumb">
               <li><a href="/">Home</a></li>
               <li className="current"><em>Terms Of Service</em></li>
            </ol>
      </nav>   
        <div className="AD-studio">
            <h1 className="headingtext slideInUp wow ">Terms Of Service</h1>
            <p className="slideInUp wow">The information found on this website has been provided by Autodidact. By accessing this website, you accept these terms and conditions in full. Accordingly, if you disagree with these terms and conditions or any part of these terms and conditions, you must not use or download content on this website.</p>
            <p className="slideInUp wow">You must be at least 18 years of age to use our website. By using our website or agreeing to these terms and conditions and warrant that you are 18 years old.</p>
            <p className="slideInUp wow">If you register or submit any material to our website or use any of its services, shall only be for personal and non-commercial use. However, this is on the condition that you retain all copyright and other proprietary notices contained in the original material on all the copies you make of the material. You may not modify this website’s content in any way or reproduce or publicly display, perform, or distribute or otherwise use it for public or commercial purposes. Any use of this website’s content on any other website or networked environment is prohibited, no matter what the purpose.</p>
            <h4 className="slideInUp wow">Third-party Companies & Products</h4>   
            <p className="slideInUp wow">The use of names of third-party products, companies and/or websites on this website is only for informational purposes. It does not constitute an endorsement or a recommendation. These names have been provided for your convenience, and to help you locate other resources of interest. We do not maintain, and are not responsible for the content of any of these websites, and also do not endorse or sponsor any part of the content linked to their web pages. When you access any of these websites, you do so at your own risk.</p>
            <p className="slideInUp wow">Clients listed on this website reflect both direct clients and indirect clients. Logos of companies other than Autodidact are the trademarks of the respective companies.</p>     
            <h4 className="slideInUp wow">Warranties & Disclaimers</h4>
            <p className="slideInUp wow">We intend that the information contained on this website be accurate and reliable. However, since this information has been compiled from a number of sources, it is provided on as is basis. We disclaim all warranties and/or conditions, express or implied, relating to or referenced by the website, including, but not limited to, the implied warranties and/or conditions of merchantability or satisfactory quality and fitness for a particular purpose and non infringement, or arising from a course of dealing, usage, trade or practice.</p>
				<p className="slideInUp wow">We shall not be liable for any technical inaccuracies including typographical errors on this website, and will not, under any circumstances, be liable to any party for direct, special or other consequential damages for use of this website, or any other website mentioned on this website.</p>
            <p className="slideInUp wow">This website may contain information that is created and maintained by a variety of sources both internal and external to Autodidact. These sites may be unmoderated forums containing the personal opinions and other expressions of the people who post entries. Autodidact does not control, monitor or guarantee the information contained in these sites or information contained in links to other external web sites, and does not endorse any views expressed or products or services offered therein. Any links to external websites provided on this website are provided as a courtesy. They should not be construed as an endorsement by Autodidact of the content or views of the linked materials.</p>
            <p className="slideInUp wow">Due care has been taken in collecting the material presented on this website, however if you find any errors or omissions, please do not feel offended and kindly Email the webmaster with the details. We reserve the right to make changes to our website and these disclaimers, terms and conditions at any time.</p>
            <h4 className="slideInUp wow">Indemnity</h4>
            <p className="slideInUp wow">You hereby expressly agree to indemnify, Autodidact and all its agents, employees, directors, licensors and licensees (collectively called Indemnified Parties) harmless from and against any and all liability and costs, including, without limitation, attorneys’ fees and costs incurred by the Indemnified Parties in connection with any claim arising out of any breach by you of these Terms of Use, or any of the representations, warranties, disclaimers and covenants contained herein. However, we reserve the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you and you shall not in any event settle any matter without our written consent.</p>
        </div>
    </div>
</div>
   </Container>
</>);
}; 

export default TermConditions;