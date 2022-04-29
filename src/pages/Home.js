import React from 'react';
import {Card} from 'react-bootstrap';

const Home = (props) => {
    return (<Card>
        <Card.Header>
            <Card.Title>WELCOME</Card.Title>
        </Card.Header>
        <Card.Body>
            <h1>HOMECOMING</h1>
            <a href="/login">Login</a>
        </Card.Body>
    </Card>);
}; 

export default Home;