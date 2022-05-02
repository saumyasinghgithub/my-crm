import React from "react";

const Footer = (props) => {
    return(<>
    <footer className="footer footerFixed">
    <div className="container-fluid">
        <ul className="footerLeft">
            <li>Copyright © 2019 AUTODIDACT</li>
            <li><a href="terms-condition.php">Terms</a></li>
            <li><a href="privacy-policy.php">Privacy Policy</a></li>
            <li><a href="cookie.php">Cookie Policy</a></li>
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