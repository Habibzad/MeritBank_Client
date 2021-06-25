import React, { useState, useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'
import { useHistory } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'

function OpenPersonalChecking() {
    const [balance, setBalance] = useState('')
    const [store, setStore] = useContext(AuthorizationContext)
    const jwt = store.jwt
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        openAccount();
    }


    const openAccount = () => {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const payload = JSON.stringify({
            "balance": 15000
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/Me/personal-checking-account", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setStore({ ...store, successMessage: "Account Opened Successfully!" })
                history.push('/user')
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div className="">
            <h4 className="transfer-header"><i class="fas fa-chevron-circle-right"></i> Open Personal Account</h4>
            <div className="form-container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>Amount</Form.Label>
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
                            <Button variant="dark" type="submit">Submit</Button>
                            {/* <Button variant="warning" onClick={() => history.push('/admin/accounts')} style={{ marginLeft: '20px' }}>Cancel</Button> */}
                        </Col>
                    </Form.Group>
                </Form>
            </div>

        </div>
    )
}

export default OpenPersonalChecking
