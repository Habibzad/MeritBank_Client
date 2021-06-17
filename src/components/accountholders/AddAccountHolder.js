import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Button, Col, Row, Alert } from 'react-bootstrap'
import { BASE_URL_AUTHENTICATE } from '../../ResourceEndpoints';

function AddAccountHolder() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [ssn, setSSN] = useState('')
    const [userID, setUserID] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        createAccountHolder()
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setSSN('')
    }

    async function createAccountHolder() {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        var payload = JSON.stringify({
            "firstName": firstName,
            "middleName": middleName,
            "lastName": lastName,
            "ssn": ssn,
            "contact": {
                "phone": "6665544"
            },
            "user": {
                "id": userID
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
            redirect: 'follow'
        };

        fetch('http://localhost:8080/api/accountholders/', requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setStore({ ...store, successMessage: 'Account Holder added successfully!' });
                history.push('/admin/accountholders')
            })
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div>
            <h3 className="component-header">Create Account Holder</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>First Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Middle Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Middle Name"
                            value={middleName}
                            onChange={e => setMiddleName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Last Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>SSN</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Social Security Number"
                            value={ssn}
                            onChange={e => setSSN(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>User ID</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="User ID"
                            value={userID}
                            onChange={e => setUserID(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button variant="dark" type="submit">Submit</Button>
                        <Button variant="info" onClick={() => history.push('/admin/accountholders')} style={{ marginLeft: '20px' }}>Cancel</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default AddAccountHolder
