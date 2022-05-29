import _ from 'lodash';
import React,{useEffect, useContext, useState, Component} from 'react';
import {Container, Tab, Nav, Row, Col} from 'react-bootstrap';
import CourseCom from '../components/courses';
import UserContext from './../contexts/UserContext';
const MyCourse = (props) => {

    const allTabs = {
        'courses': 'Trainer Course Libraries',
        'content': 'Course Content'
    };

    const [tab, setTab] = useState('course');
    useEffect(window.scrollEffect,[]);
    
    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper">
    <div className="container100">
        <h1>My Course </h1>
        
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
                        {tab==='courses' && <CourseCom.CourseForm />}
                        {tab==='calib' && <CourseCom.CourseForm />}
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

export default MyCourse;