import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { CD_OFFERINGS } from '../../ResourceEndpoints';

function AddCDOffering() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();
    const [interestRate, setInterestRate] = useState('');
    const [term, setTerm] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("term", term, 'interestrate: ', interestRate)
        console.log('jwt: ', jwt)

        const num1 = interestRate;
        const num2 = term;

        const myHeaders = {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
        }

        const payload = JSON.stringify({
            "interestRate": num1,
            "term": num2
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: payload,
            redirect: 'follow'
        };

        fetch(CD_OFFERINGS, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('result', result)
                setStore({ ...store, successMessage: 'CD Offering added successfully!' })
                history.push('/admin/addfferingslist')
            })
            .catch(error => console.log('error', error));

        setInterestRate('')
        setTerm('')
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <h3 className="component-header">Add CD Offering</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Interest Rate</Form.Label>
                    <Form.Control value={interestRate} onChange={(e) => setInterestRate(e.target.value)} type="text" placeholder="Interest Rate" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Term</Form.Label>
                    <Form.Control value={term} onChange={(e) => setTerm(e.target.value)} type="text" placeholder="Term" />
                </Form.Group>

                <Button variant="dark" type="submit">Submit</Button>
                <Button variant="info" onClick={() => history.push('/admin/addfferingslist')} style={{ marginLeft: '20px' }}>Cancel</Button>
            </Form>
        </div>
    )
}

export default AddCDOffering
