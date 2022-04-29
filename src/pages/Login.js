import React from 'react';
import {Card,Form, Button} from 'react-bootstrap';

const Login = (props) => {
    return (<Card>
        <Card.Header>
            <Card.Title>Login to AD</Card.Title>
        </Card.Header>
        <Card.Body>
            <Form>
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" name="username"></Form.Control>
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" name="pwd"></Form.Control>
                <Button>Login Please</Button>
            </Form>
        </Card.Body>
    </Card>);
}; 

export default Login;