import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthorizationContext } from '../AuthorizationContext'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { BASE_URL_ADD } from '../ResourceEndpoints'
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom'

function Login() {
    const [store, setStore] = useContext(AuthorizationContext)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')))
    }, [isLoggedIn])

    //For page redirect
    const history = useHistory();

    const user = {
        username: username,
        password: password
    }

    if (isLoggedIn) {
        return <Redirect to="/" />
    }

    async function handleSubmit(e) {
        e.preventDefault();
        //Clear the form
        setUsername('')
        setPassword('')

        //Call the authentication endpoint
        axios.post(BASE_URL_ADD, user).then(res => {
            const jwt = res.data.jwt
            const role = res.data.roles
            const isLoggedIn = true
            const decodedjwt = jwt_decode(res.data.jwt);
            const username = decodedjwt.sub;

            localStorage.setItem('jwt', JSON.stringify(jwt))
            localStorage.setItem('role', JSON.stringify(role))
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
            localStorage.setItem('username', JSON.stringify(username))

            setStore({
                jwt: jwt,
                role: role,
                username: username,
                isLoggedIn: isLoggedIn
            });
            // console.log('store from login onsubmit', { jwt: jwt, role: role, username: username, isLoggedIn: isLoggedIn })

            if (res.data != null) {
                if (res.data.roles === "[ROLE_ADMIN]") {
                    history.push("/admin")
                }
                if (res.data.roles === "[ROLE_USER]") {
                    history.push("/user")
                }
            }
        }).catch(err => {
            console.log(err.message)
        })
    }

    return (
        <div className="container login" style={{ width: 400 }}>
            <Form onSubmit={e => handleSubmit(e)}>
                <h2 className="text-center">Log In</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        onChange={e => setUsername(e.target.value)}
                        name="username"
                        autoComplete="off"
                        type="text"
                        placeholder="Enter email"
                        value={username} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={e =>
                            setPassword(e.target.value)}
                        autoComplete="off"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password} />
                </Form.Group>

                <Button
                    variant="dark"
                    type="submit"
                    style={{ width: 360 }}>Login
                </Button>
            </Form>
        </div>
    )
}

export default Login
