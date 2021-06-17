import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Button, Col, Row, Alert } from 'react-bootstrap'

function WithdrawTransaction() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const successMessage = store.successMessage;
    const history = useHistory();

    const [values, setValues] = useState({
        targetAccount: '',
        description: '',
        amount: '',
        type: ''
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    if (successMessage !== '') {
        setTimeout(() => setStore({ ...store, successMessage: '' }), 2000)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const payload = JSON.stringify({
            "targetAccountNum": values.targetAccount,
            "description": values.description,
            "amount": values.amount,
            "transactionType": values.type
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
            redirect: 'follow'
        };

        console.log(JSON.parse(payload))
        fetch("http://localhost:8080/api/withdraw", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setStore({ ...store, successMessage: 'Transaction Successfull!' })
            })
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/" />
    }

    return (
        <div>
            {successMessage &&
                <Alert className="alert" variant='success'>{successMessage}</Alert>}
            <h3 className="component-header">Withdraw</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Target Account</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            name="targetAccount"
                            placeholder="Target Account"
                            value={values.targetAccount}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Description</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={values.description}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Amount</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={values.amount}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}> Roles</Form.Label>
                    <select
                        name="type"
                        className="form-select"
                        onChange={handleChange}>
                        <option >Select</option>
                        <option >Cash</option>
                        <option >Check</option>
                        <option >ATM</option>
                        <option >Transfer</option>
                    </select>
                </Form.Group>
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

export default WithdrawTransaction
