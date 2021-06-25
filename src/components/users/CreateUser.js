import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Button, Col, Row, Alert } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function CreateUser() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();
    let { id } = useParams();
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState('')
    const [userRole, setUserRole] = useState('')
    const [accountHolder, setAccountHolder] = useState({})
    let enabled;
    active === "Enabled" ? enabled = true : enabled = false

    useEffect(() => {
        getAccountHolderInfo()
    }, [])

    async function getAccountHolderInfo() {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/accountholders/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setAccountHolder(result)
            })
            .catch(error => console.log('error', error));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser()
        setUserName('')
        setPassword('')
    }

    async function createUser() {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const payload = JSON.stringify({
            "userName": username,
            "password": password,
            "active": enabled,
            "roles": userRole
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/accountholders/${id}/set-user`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setStore({ ...store, successMessage: "User Created Successfully!" })
                setUserName('')
                setPassword('')
                setActive('')
                setUserRole('')
                history.push('/admin/users-list')
            })
            .catch(error => console.log('error', error));

    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }
    return (
        <div>
            <h3 className="component-header">Create User</h3>
            <Form onSubmit={handleSubmit} className="wrapper">
                <Alert variant='info' style={{ textAlign: 'center' }}>Create User for {accountHolder.firstName} {accountHolder.lastName}</Alert>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Account Holder ID</Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="number"
                            placeholder="User ID"
                            value={id}
                            readOnly
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>User Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="User Name"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}> Password</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}> Active</Form.Label>
                    <select className="form-select" onChange={e => setActive(e.target.value)}>
                        <option >Select</option>
                        <option >Enabled</option>
                        <option >Disabled</option>
                    </select>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}> Roles</Form.Label>
                    <select className="form-select" onChange={e => setUserRole(e.target.value)}>
                        <option >Select</option>
                        <option value="ROLE_USER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button variant="dark" type="submit">Submit</Button>
                        <Button variant="warning" onClick={() => history.push('/admin')} style={{ marginLeft: '20px' }}>Cancel</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateUser
