import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'

function UserTransfer() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();
    const [sourceAccount, setSourceAccount] = useState('')
    const [targetAccount, setTargetAccount] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmmount] = useState('')
    const [user, setUser] = useState({})
    const successMessage = store.successMessage;

    useEffect(() => {
        displayContactInfo()
        console.log('sucess message: ', successMessage)
    }, [])

    const displayContactInfo = () => {
        const myHeaders = {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
        }
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/Me", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('from user transfer: ', result)
                setUser(result)
            })
            .catch(error => console.log('error', error));
    }

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
                setStore({ ...store, successMessage: 'Transfer successfull!' })
                history.push('/user/checkingAcc')
            })
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h3 className="transfer-header"><i class="fas fa-chevron-circle-right"></i> Transfer</h3>
            <Form onSubmit={handleSubmit} className="wrapper">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Source Account</Form.Label>
                    <select className="form-select" onChange={e => setSourceAccount(e.target.value)}>
                        <option >Select</option>
                        <option >{user.personalCheckingAccount != null ? user.personalCheckingAccount[0].accountNumber : null}</option>
                        <option >{user.savingsAccounts != null ? user.savingsAccounts[0].accountNumber : null}</option>
                        {user.cdAccounts != null ? user.cdAccounts.map((cd => <option>{cd.accountNumber}</option>)) : null}

                    </select>
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

export default UserTransfer
