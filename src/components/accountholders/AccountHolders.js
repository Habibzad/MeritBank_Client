import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { Table, Alert } from 'react-bootstrap'
import { BASE_URL_AUTHENTICATE } from '../../ResourceEndpoints';

function AccountHolders() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();
    const successMessage = store.successMessage;

    useEffect(() => {
        showAccountHolders()
    }, [])

    if (successMessage !== '') {
        setTimeout(() => setStore({ ...store, successMessage: '' }), 2000)
    }

    const [accountHolders, setAccountHolders] = useState([])

    async function showAccountHolders() {
        axios.get(BASE_URL_AUTHENTICATE, {
            headers: {
                'Authorization': `Bearer ` + jwt
            }
        })
            .then((res) => {
                setAccountHolders(res.data)
                console.log(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const deleteAccountHolder = (id) => {

        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: "",
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/accountholders/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setStore({ ...store, successMessage: 'Account deleted successfully!' });
                showAccountHolders()

            })
            .catch(error => console.log('error', error));
    }

    const updateAccountHolder = (id) => {
        console.log(id)
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div className="container">
            {successMessage &&
                <Alert className="alert" variant='success'>{successMessage}</Alert>}
            <h3 className="component-header">Account Holders</h3>
            <div className="">
                <table className="table table-striped table-bordered" style={{ backgroundColor: 'white', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th><i
                                className="fas fa-plus text-primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() => history.push('/admin/add-account-holder')}>
                            </i></th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accountHolders.map(accountHolder =>
                                <tr key={accountHolder.id}>
                                    <td>
                                        <Link to={`update-account-holder/${accountHolder.id}`}><i className="fas fa-pencil-alt text-warning" style={{ marginRight: '30px', cursor: 'pointer' }}></i></Link>
                                        <i className="far fa-trash-alt text-danger" style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete `)) {
                                                    deleteAccountHolder(accountHolder.id);
                                                }
                                            }}>
                                        </i>
                                    </td>
                                    <td>{accountHolder.id}</td>
                                    <td>{accountHolder.firstName} {accountHolder.lastName}</td>
                                    <td><Link to={`profile/${accountHolder.id}`}>Profile</Link></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AccountHolders