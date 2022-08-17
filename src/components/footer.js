import React from "react";

const Footer = (props) => {
    return(<>
    <footer className="footer footerFixed">
    <div className="container-fluid">
        <ul className="footerLeft">
            <li>Copyright © 2022 AUTODIDACT</li>
            <li><a href={`${process.env.PUBLIC_URL}/term-conditions`}>Terms</a></li>
            <li><a href={`${process.env.PUBLIC_URL}/privacy-policy`}>Privacy Policy</a></li>
            <li><a href={`${process.env.PUBLIC_URL}/cookie-policy`}>Cookie Policy</a></li>
        </ul>
        <ul className="footerRight">
            <li><a href=""><img src="assets/images/reddit.png"/></a></li>
            <li><a href=""><i className="fab fa-facebook-f"></i></a></li>
            <li><a href=""><i className="fab fa-linkedin-in"></i></a></li>
            <li><a href=""><i className="fab fa-twitter"></i></a></li>
        </ul>
    </div>
</footer>
  
    </>

    );
};

export default Footer;