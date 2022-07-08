import _ from 'lodash';
import React,{useEffect, useContext, useState, Component} from 'react';
import {Container, Tab, Nav, Row, Col} from 'react-bootstrap';
import TrainerForms from '../components/trainer';
import UserContext from './../contexts/UserContext';
const MyProfile = (props) => {

    const allTabs = {
        'about': 'About Me',
        'calib': 'My Calibrations',
        'academic': 'Academic Qualifications',
        'exp': 'Professional Experiences',
        'awards': 'Awards/Certifications',
        'services': 'Trainer Services'
    };

    const [tab, setTab] = useState('about');
    useEffect(window.scrollEffect,[]);
    
    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper">
    <div className="container100">
        <h1>My Profile </h1>
        
        <Tab.Container id="left-tabs-example" defaultActiveKey={tab}>
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    {_.map(allTabs, (v,k) => <Nav.Item key={k}>
                        <Nav.Link eventKey={k} onClick={() => setTab(k)} className="profile-pills">{v}</Nav.Link>
                    </Nav.Item>)}
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey={tab}>
                        {tab==='about' && <TrainerForms.AboutForm />}
                        {tab==='calib' && <TrainerForms.CalibForm />}
                        {tab==='academic' && <TrainerForms.AcademicForm />}
                        {tab==='exp' && <TrainerForms.ExperienceForm />}
                        {tab==='awards' && <TrainerForms.AwardCertificationsForm />}
                        {tab==='services' && <TrainerForms.ServiceForm />}
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>


        
    </div>
</div>
</Container>
</>);
}; 

export default MyProfile;