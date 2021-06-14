import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Col, Row, Alert } from 'react-bootstrap'
import { USERS } from '../../ResourceEndpoints';

function DeleteUser() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const [id, setID] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('id: ', id)
        deleteUser()
        setID('')
    }

    async function deleteUser() {

        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const payload = JSON.stringify({
            "id": id
        });

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: payload
        };

        fetch(USERS, requestOptions)
            .then(response => setSuccessMessage("User deleted successfully!"))
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }
    return (
        <div>
            {successMessage &&
                <Alert variant='success'>{successMessage}</Alert>}
            <h3 className="component-header">Delete User</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="number" placeholder="Enter the user id here..." onChange={e => setID(e.target.value)} value={id} />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default DeleteUser
