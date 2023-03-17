import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Login } from '../components';

const LoginPage = (props) => {
    useEffect(window.scrollEffect, []);
    return (<>
        <Container className="h-100 p-0 LoginPage">
            <div className="profile-wrapper loginWraps">
                <Login />
            </div>
        </Container>
    </>);
};

export default LoginPage;