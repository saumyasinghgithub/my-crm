import _ from 'lodash';
import React,{useEffect, useContext, useState} from 'react';
import {Container, Tab, Nav, Row, Col} from 'react-bootstrap';
import { CalibForm } from '../components/trainer';
import UserContext from './../contexts/UserContext';
const MyProfile = (props) => {
    useEffect(window.scrollEffect,[]);
    
    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper">
    <div className="container100">
        <h1>My Profile </h1>
        
        <Tab.Container id="left-tabs-example" defaultActiveKey="calib">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Nav.Link eventKey="about">About Me</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="calib">My Calibrations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="academic">Academic Qualification</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="about">
                        About Me
                    </Tab.Pane>
                    <Tab.Pane eventKey="calib">
                        <CalibForm />
                    </Tab.Pane>
                    <Tab.Pane eventKey="academic">
                        Academic
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