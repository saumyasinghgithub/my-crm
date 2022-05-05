import React,{useEffect} from 'react';
import {Container} from 'react-bootstrap';

const About = (props) => {
    useEffect(window.scrollEffect,[]);
    
    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper">
    <div className="container100">
        <div className="flex404">
            <div className="flexItem40 slideInUp wow">
                <p>Sime peles ut ut mi, sinum fugita volorundi 
                    quo vita quatur?
                    Icipsant omnimus ut fugitat emporum eic 
                    tem. Feriam quae por si ut apid quistinus 
                    dolorro quassuntibus pedi del inciure 
                    ptaspic itemque quis venia dignihictore ea 
                    voluptat voluptatus audigenimpor rehent unt, 
                    quo eium facereriatia que comnim dolorempos 
                    aut officiant.</p>
                <p>Sime peles ut ut mi, sinum fugita volorundi 
                    quo vita quatur?</p>
            </div>
            <div className="flexItem60 slideInUp wow">
                <div className="headingBold">About us</div>
                <img src="assets/images/404-banner.jpg" className="img-fluid imgTransfer" alt="AD About" />
            </div>
        </div>
    </div>
</div>
</Container>
</>);
}; 

export default About;