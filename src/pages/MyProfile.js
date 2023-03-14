import _ from 'lodash';
import React, { useEffect, useContext, useState, Component } from 'react';
import { Container, Tab, Nav, Row, Col } from 'react-bootstrap';
import TrainerForms from '../components/trainer';
import UserContext from './../contexts/UserContext';
const MyProfile = (props) => {

    const allTabs = {
        '#about': 'About Me',
        '#calib': 'My Calibrations',
        '#academic': 'Academic Qualifications',
        '#exp': 'Professional Experiences',
        '#awards': 'Awards/Certifications',
        '#service': 'Trainer Services',
        '#knowledge': 'Trainer Knowledge',
        '#community': 'Trainer Community',
        '#library': 'Trainer Library',
        '#social': 'Social Platform',
        '#slider': 'Image Slider',
        '#events': 'Manage Events',
        '#landingpage': 'Landing Page Settings'
    };

    const [tab, setTab] = useState('#about');
    useEffect(window.scrollEffect, []);

    function handleSelect(key) {
        setTab(key);
    }

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        const newHash = '#'+hash;
        if (newHash) {
            setTab(newHash);
        }
    }, []);

    return (<>
        <Container fluid className="h-100 p-0">
            <div className="profile-wrapper">
                <div className="container">
                    <h1>My Profile </h1>

                    <Tab.Container activeKey={tab} onSelect={handleSelect}>
                        <Row>
                            <Col md={3}>
                                <Nav variant="pills" className="flex-column">
                                    {_.map(allTabs, (v, k) => <Nav.Item key={k}>
                                        <Nav.Link eventKey={k} onClick={() => setTab(k)} href={k} className="profile-pills">{v}</Nav.Link>
                                    </Nav.Item>)}
                                </Nav>
                            </Col>
                            <Col md={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey={tab}>
                                        {tab === '#about' && <TrainerForms.AboutForm />}
                                        {tab === '#calib' && <TrainerForms.CalibForm />}
                                        {tab === '#academic' && <TrainerForms.AcademicForm />}
                                        {tab === '#exp' && <TrainerForms.ExperienceForm />}
                                        {tab === '#awards' && <TrainerForms.AwardCertificationsForm />}
                                        {tab === '#service' && <TrainerForms.ServiceForm />}
                                        {tab === '#knowledge' && <TrainerForms.KnowledgeForm />}
                                        {tab === '#community' && <TrainerForms.CommunityForm />}
                                        {tab === '#library' && <TrainerForms.LibraryForm />}
                                        {tab === '#social' && <TrainerForms.SocialForm />}
                                        {tab === '#slider' && <TrainerForms.SliderForm />}
                                        {tab === '#events' && <TrainerForms.EventsForm />}
                                        {tab === '#landingpage' && <TrainerForms.LandingpageForm />}
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