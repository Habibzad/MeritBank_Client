import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Button, Col, Row, Alert } from 'react-bootstrap'


function TransferTransaction() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const [successMessage, setSuccessMessage] = useState('')
    const history = useHistory();
    const [sourceAccount, setSourceAccount] = useState('')
    const [targetAccount, setTargetAccount] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmmount] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        submitTransfer();
    }

    const submitTransfer = () => {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const payload = JSON.stringify({
            "sourceAccountNum": sourceAccount,
            "targetAccountNum": targetAccount,
            "description": description,
            "amount": amount
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/transfer", requestOptions)
            .then(response => response.text())
            .then(result => {
                setSuccessMessage(result)
                history.push('/admin/transactions')
            })
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h3 className="component-header">Transfer</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Source Account</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="Source Account"
                            value={sourceAccount}
                            onChange={e => setSourceAccount(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Target Account</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="Target Account"
                            value={targetAccount}
                            onChange={e => setTargetAccount(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Description</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Amount</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={e => setAmmount(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}> Roles</Form.Label>
                    <select className="form-select" onChange={e => setUserRole(e.target.value)}>
                        <option >Select</option>
                        <option value="ROLE_USER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </Form.Group> */}
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button variant="dark" type="submit">Submit</Button>
                        <Button variant="info" onClick={() => history.push('/admin')} style={{ marginLeft: '20px' }}>Cancel</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default TransferTransaction
