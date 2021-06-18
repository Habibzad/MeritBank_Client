import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'


function PersonalChecking() {
    const [balance, setBalance] = useState('')
    const [accountNumber, setAccountNumber] = useState('')

    const [store, setStore] = useContext(AuthorizationContext)
    const jwt = store.jwt
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()

        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const payload = JSON.stringify({
            "balance": balance
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/accountholders/${accountNumber}/checkingAccounts`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setStore({ ...store, successMessage: "Account Created Successfully!" })
                history.push('/admin/accounts')
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div style={{ padding: '20px 10px', border: '1px solid rgba(0,0,0,0.2)', backgroundColor: '#f8f8f8' }}>
            {/* <h4 style={{ marginBottom: '30px' }}>Add Checking Account</h4> */}
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Account Holder ID</Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="number"
                            placeholder="Account Holder ID"
                            value={accountNumber}
                            onChange={e => setAccountNumber(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}> Amount</Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="number"
                            placeholder="Amount"
                            value={balance}
                            onChange={e => setBalance(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button variant="dark" type="submit">Create Account</Button>
                        <Button variant="info" onClick={() => history.push('/admin/accounts')} style={{ marginLeft: '20px' }}>Cancel</Button>
                    </Col>
                </Form.Group>
            </Form>

        </div>
    )
}

export default PersonalChecking

