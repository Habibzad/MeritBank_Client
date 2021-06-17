import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Alert } from 'react-bootstrap'
import { CLEAR_CDOFFERINGS } from '../../ResourceEndpoints';
function ClearCDOfferings() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt

    const [successMessage, setSuccessMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const myHeaders = {
            "Authorization": "Bearer " + jwt
        }

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: '',
            redirect: 'follow'
        };

        fetch(CLEAR_CDOFFERINGS, requestOptions)
            .then(response => response.json())
            .then(result => setSuccessMessage(result))
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }
    return (
        <div>
            {successMessage &&
                <Alert variant='success'>{successMessage}</Alert>}
            <h3 className="component-header">Clear CD Offering</h3>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Click the submit button to clear all CD offerings</Card.Title>
                    <Card.Text> Are you sure?</Card.Text>
                    <Button variant="danger" type="submit" onClick={() => {
                        if (window.confirm(`Are you sure you want to clear all CD Offerings? `)) {
                            handleSubmit();
                        }
                    }}>Submit</Button>
                </Card.Body>
                <Card.Footer className="text-muted">Disclaimer: CD Offerings cleared cannot be recovered!</Card.Footer>
            </Card>
        </div>
    )
}

export default ClearCDOfferings
