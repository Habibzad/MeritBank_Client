import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
function UserProfile() {
    const [values, setValues] = useState({
        id: '1',
        phone: '2131312',
        email: 'a@3sx.com',
        address: 'j streeet London'
    })

    useEffect(() => {
        displayContactInfo()
    }, [])

    const displayContactInfo = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2huIiwiZXhwIjoxNjIzODA3ODM0LCJpYXQiOjE2MjM3NzE4MzR9.MgUxxEdjG1WNkqcMgfx0Zf6r_d_jAHYZBV_7pJS2aRA");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/Me", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // setValues(result.accountHoldersContactDetails)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <Card >
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Contact Details</Card.Subtitle>
                    <br />
                    <Card.Subtitle className="mb-2 text-muted">Phone No: <code style={{ color: 'grey' }}>{values.phone}</code></Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Email: <code style={{ color: 'grey' }}>{values.email}</code> </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Home Address: <code style={{ color: 'grey' }}>{values.address}</code></Card.Subtitle>
                    <Card.Link style={{ cursor: 'pointer' }}>Update Contact Info</Card.Link>
                    <Card.Link style={{ cursor: 'pointer' }}>Change password</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserProfile
