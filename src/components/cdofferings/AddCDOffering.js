import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { CD_OFFERINGS } from '../../ResourceEndpoints';
import axios from 'axios';

function AddCDOffering() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt

    const [interestRate, setInterestRate] = useState('');
    const [term, setTerm] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("term", term, 'interestrate: ', interestRate)
        console.log('jwt: ', jwt)

        const payload = {
            'interestRate': interestRate,
            'term': term
        }

        console.log('payload:', payload)

        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        //Hard coded here
        const raw = JSON.stringify({
            "interestRate": 0.7,
            "term": 20
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(CD_OFFERINGS, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit} style={{ width: 300 }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Interest Rate</Form.Label>
                    <Form.Control value={interestRate} onChange={(e) => setInterestRate(e.target.value)} type="number" placeholder="Interest Rate" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Term</Form.Label>
                    <Form.Control value={term} onChange={(e) => setTerm(e.target.value)} type="number" placeholder="Term" />
                </Form.Group>

                <Button variant="dark" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default AddCDOffering
