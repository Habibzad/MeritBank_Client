import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'

function UpdateAccountHolder() {
    let { id } = useParams();
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDob] = useState('')
    const [ssn, setSSN] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/accountholders/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setFirstName(result.firstName)
                setMiddleName(result.middleName)
                setLastName(result.lastName)
                setDob(result.dob)
                setSSN(result.ssn)
                setPhone(result.phone)
                setEmail(result.email)
                setAddress(result.address)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateAccountHolder()
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setSSN('')
    }

    async function updateAccountHolder() {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const payload = JSON.stringify({
            "firstName": firstName,
            "middleName": middleName,
            "lastName": lastName,
            "dob": dob,
            "ssn": ssn,
            "phone": phone,
            "email": email,
            "address": address
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: payload,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/accountholders/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setStore({ ...store, successMessage: 'Account Holder updated successfully!' });
                history.push('/admin/accountholders')
            })
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div>
            <h3 className="component-header">Update Account Holder</h3>
            <Form onSubmit={handleSubmit} className="wrapper">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Id</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={id}
                            readOnly
                        />
                    </Col>
                </Form.Group>
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
                <Form.Group as={Row} className="mb-2" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}><i class="fas fa-calendar-alt"></i> Date of Birth</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="date"
                            placeholder="Date of birth"
                            value={dob}
                            onChange={e => setDob(e.target.value)}
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
                    <Form.Label column sm={2}>Phone</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Address</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Home Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button variant="dark" type="submit">Submit</Button>
                        <Button variant="warning" onClick={() => history.push('/admin/accountholders')} style={{ marginLeft: '20px' }}>Cancel</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default UpdateAccountHolder
