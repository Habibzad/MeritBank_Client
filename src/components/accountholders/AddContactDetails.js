import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'

function AddContactDetails() {
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [accID, setAccID] = useState('')

    const [store, setStore] = useContext(AuthorizationContext)
    const jwt = store.jwt
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const raw = JSON.stringify({
            "phone": phone,
            "email": email,
            "address": address
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/accountholders/${accID}/contactdetails`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setStore({ ...store, successMessage: "Contact added Successfully!" })
                history.push('/admin/')
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>Add Contact Details</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Account Holder ID</Form.Label>
                    <Col sm={4}>
                        <Form.Control
                            type="number"
                            placeholder="Account Holder ID"
                            value={accID}
                            onChange={e => setAccID(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Phone</Form.Label>
                    <Col sm={4}>
                        <Form.Control
                            type="number"
                            placeholder="Phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="number"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Address</Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button variant="dark" type="submit">Submit</Button>
                        {/* <Button variant="info" onClick={() => history.push('/admin/accounts')} style={{ marginLeft: '20px' }}>Cancel</Button> */}
                    </Col>
                </Form.Group>
            </Form>

        </div>
    )
}

export default AddContactDetails
