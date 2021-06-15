import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Table, Alert } from 'react-bootstrap'
import { BASE_URL_AUTHENTICATE } from '../../ResourceEndpoints';

function AccountHolders() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();
    const successMessage = store.successMessage;

    useEffect(() => {
        showAccountHolders()
    }, [])

    const [accountHolders, setAccountHolders] = useState([])

    const deleteAccountHolder = (id) => {
        console.log(id)
    }

    const updateAccountHolder = (id) => {
        console.log(id)
    }

    async function showAccountHolders() {
        axios.get(BASE_URL_AUTHENTICATE, {
            headers: {
                'Authorization': `Bearer ` + jwt
            }
        })
            .then((res) => {
                setAccountHolders(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div className="container">
            {successMessage &&
                <Alert style={{ position: 'fixed', top: '0' }} variant='success'>{successMessage}</Alert>}
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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>SSN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accountHolders.map(accountHolder =>
                                <tr key={accountHolder.id}>
                                    <td>
                                        <i className="fas fa-pencil-alt text-warning" onClick={() => updateAccountHolder(accountHolder.id)} style={{ marginRight: '30px', cursor: 'pointer' }}></i>
                                        <i className="far fa-trash-alt text-danger" style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete `)) {
                                                    deleteAccountHolder(accountHolder.id);
                                                }
                                            }}>
                                        </i>
                                    </td>
                                    <td>{accountHolder.id}</td>
                                    <td>{accountHolder.firstName}</td>
                                    <th>{accountHolder.lastName}</th>
                                    <th>{accountHolder.ssn}</th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AccountHolders