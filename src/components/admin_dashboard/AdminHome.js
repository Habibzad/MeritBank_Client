import React from 'react'
import { Card, Button } from 'react-bootstrap'
function AdminHome() {
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Welcome to Admin Dashboard</Card.Title>
                <Card.Text> Some text here...</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">Info</Card.Footer>
        </Card>
    )
}

export default AdminHome
