import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthorizationContext } from '../../AuthorizationContext'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'

function UpdateUser(props) {
    let { id } = useParams();
    const history = useHistory();

    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userRole, setUserRole] = useState("ROLE_USER")

    //When component is mounted, prepopulate the form with data fetched from database
    useEffect(() => {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/users/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUserName(result.userName)
                setPassword(result.password)
            })
            .catch(error => console.log('error', error));
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser()
    }

    async function updateUser() {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }
        const payload = JSON.stringify({
            "id": id,
            "userName": userName,
            "password": password,
            "active": true,
            "roles": userRole
        });

        console.log(JSON.parse(payload))

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: payload
        };

        fetch(`http://localhost:8080/api/users/${id}`, requestOptions)
            .then(response => {
                console.log(response.json())
                history.push('/admin/users-list')
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    //Redirect to home page if the user is logged out or has user role
    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h3 className="component-header">Update User</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>User ID</Form.Label>
                    <Col sm={3}>
                        <Form.Control
                            type="number"
                            placeholder="User ID"
                            value={id}
                            readOnly
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>User Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="User Name"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}> Password</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}> Active</Form.Label>
                    <select className="form-select" >
                        <option value>Enabled</option>
                        <option >Disabled</option>
                    </select>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}> Roles</Form.Label>
                    <select className="form-select" onChange={e => setUserRole(e.target.value)}>
                        <option value="ROLE_USER" defaultValue>User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button variant="dark" type="submit">Submit</Button>
                        <Button variant="info" onClick={() => history.push('/admin/users-list')} style={{ marginLeft: '20px' }}>Cancel</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default UpdateUser