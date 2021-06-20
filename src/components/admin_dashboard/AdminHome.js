import React, { useState, useEffect, useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'
import { Card } from 'react-bootstrap'
function AdminHome() {
    const [store] = useContext(AuthorizationContext)
    const user = store.username
    const [currentDate, setCurrentDate] = useState('')

    let date = new Date(),

        today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

    useEffect(() => {
        setCurrentDate(today)
    }, [])
    return (
        <React.Fragment>
            <h3 className="component-header"> <i class="fas fa-cog"></i> Dashboard</h3>
            <Card className="text-center" style={{ marginTop: '5rem', border: 'none' }}>
                <Card.Body>
                    <i className="fas fa-university" style={{ fontSize: '50px', color: '#ec674c' }}></i><br />
                    <img src="/images/logo.png" height="35" alt="logo" style={{ marginBottom: '3rem' }} />
                    <Card.Title>Welcome to Admin Dashboard, {user}! </Card.Title>
                    <Card.Text>Today is: <code>{currentDate}</code></Card.Text>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default AdminHome
