import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { USERS } from '../../ResourceEndpoints';
import { Table, Alert } from 'react-bootstrap'

function UsersList() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();
    const successMessage = store.successMessage;

    if (successMessage !== '') {
        setTimeout(() => setStore({ ...store, successMessage: '' }), 2000)
    }
    useEffect(() => {
        displayUsers();
    }, [])

    const [users, setUsers] = useState([])

    const displayUsers = async () => {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        fetch(USERS, requestOptions)
            .then(response => response.json())
            .then(result => setUsers(result))
            .catch(error => console.log('error', error));
    }

    async function deleteUser(id) {

        console.log(id)
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
            .then(response => {
                displayUsers();
                setStore({ ...store, successMessage: 'User deleted successfully!' })
            })
            .catch(error => console.log('error', error));
    }

    const updateUser = (id) => {
        console.log('id from edit: ', id)
        history.push('udate-user')
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div>
            {successMessage &&
                <Alert className="alert" variant='success'>{successMessage}</Alert>}
            <h3 className="component-header">Users List</h3>

            <Table striped bordered hover style={{ backgroundColor: 'white', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>
                            <i
                                className="fas fa-plus text-primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() => history.push('/admin/create-user')}>
                            </i>
                        </th>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>IsActive</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <td>
                                    <i className="fas fa-pencil-alt text-warning" onClick={() => updateUser(user.id)} style={{ marginRight: '30px', cursor: 'pointer' }}></i>
                                    <i className="fas fa-user-slash text-danger" style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to delete ${user.userName}`)) {
                                                deleteUser(user.id);
                                            }
                                        }}>
                                    </i>
                                </td>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>{user.password}</td>
                                <td>{user.active ? "Yes" : null}</td>
                                <td>{user.roles === "ROLE_ADMIN" ? "Admin" : user.roles === "ROLE_USER" ? "User" : null}</td>
                            </tr>)
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default UsersList
