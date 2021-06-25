import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { USERS } from '../../ResourceEndpoints';
import { Table, Alert } from 'react-bootstrap'

function UsersList() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const successMessage = store.successMessage;
    const [users, setUsers] = useState([])


    //Display users when component is mountedF
    useEffect(() => {
        displayUsers();
    }, [])


    //Display users
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

    //Delete User
    async function deleteUser(id) {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders
        };

        fetch(`http://localhost:8080/api/users/${id}`, requestOptions)
            .then(response => {
                displayUsers();
                setStore({ ...store, successMessage: 'User deleted successfully!' })
            })
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    if (successMessage !== '') {
        setTimeout(() => setStore({ ...store, successMessage: '' }), 2000)
    }

    let counter = 1;

    return (
        <div>
            <h3 className="component-header">Users List</h3>
            {successMessage &&
                <Alert className="alert" variant='success'>{successMessage}</Alert>}
            <div className="wrapper">
                <Table striped bordered hover style={{ backgroundColor: 'white', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th><i class="fas fa-hashtag"></i></th>
                            <th>
                                Update/Delete
                                {/* <Link to={`create-user/${6}`}><i className="fas fa-plus text-primary" style={{ cursor: 'pointer' }}></i></Link> */}
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
                                    <td>{counter++}</td>
                                    <td>
                                        <Link to={`udate-user/${user.id}`}><i className="fas fa-pencil-alt text-warning" style={{ marginRight: '30px', cursor: 'pointer' }}></i></Link>
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

        </div>
    )
}

export default UsersList
