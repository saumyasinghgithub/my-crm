import React,{useEffect} from 'react';
import {Container} from 'react-bootstrap';
import AboutForm from '../components/student/AboutForm';
const StudentProfile = (props) => {


    useEffect(window.scrollEffect,[]);
    
    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper">
    <div className="container100">
        <h1>My Profile </h1>
        
        <AboutForm />
      
    </div>
</div>
</Container>
</>);
}; 

export default StudentProfile;