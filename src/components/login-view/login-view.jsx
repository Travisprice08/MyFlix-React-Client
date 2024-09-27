import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const validated = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);

        /* Send a request to the server for authentication */
        axios.post('https://myfilmdb.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('No such user')
            });
    };

    return (
        <Row className="justify-content-md-center">
            <Col md={8}>
                <Form className="LoginForm" validated={validated}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                        <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <Form.Control.Feedback type="invalid">Please enter a valid password.</Form.Control.Feedback>
                    </Form.Group>
                    <span>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                        <Link to={`/register`}>
                            <Button type="link" >Register</Button>
                        </Link>
                    </span>
                </Form>
            </Col>
        </Row>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired
};