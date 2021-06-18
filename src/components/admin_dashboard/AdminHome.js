import React from 'react'
import { Card } from 'react-bootstrap'
function AdminHome() {
    return (
        <React.Fragment>

            <h3 className="component-header">Admin Dashboard</h3>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Welcome to Admin Dashboard</Card.Title>
                    <Card.Text> Some text here...</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Info</Card.Footer>
            </Card>
        </React.Fragment>
    )
}

export default AdminHome
