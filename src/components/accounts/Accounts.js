import React, { useState, useEffect, useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'
import { Redirect, useHistory } from 'react-router-dom'
import { Table, Alert } from 'react-bootstrap'

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();
    const successMessage = store.successMessage;

    useEffect(() => {
        displayAccounts();
    }, [])

    const displayAccounts = () => {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/all-accounts", requestOptions)
            .then(response => response.json())
            .then(result => {
                setAccounts(result)
                console.log('accounts results', result)
            })
            .catch(error => console.log('error', error));
    }

    const closeAccount = (id) => {
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/close-account/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                displayAccounts();
            })
            .catch(error => console.log('error', error));
    }

    const deleteAccount = (id) => {
        console.log(id)
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    if (successMessage !== '') {
        setTimeout(() => setStore({ ...store, successMessage: '' }), 2000)
    }

    return (
        <div className="container">
            {successMessage &&
                <Alert className="alert" variant='success'>{successMessage}</Alert>}
            <h3 className="component-header">Accounts</h3>
            <div className="">
                <Table style={{ backgroundColor: 'white', textAlign: 'center' }} className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                <i
                                    className="fas fa-plus text-primary"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => history.push('/admin/add-account')}>
                                </i>
                            </th>
                            <th>Account Number</th>
                            <th>Balance</th>
                            <th>Interest Rate</th>
                            <th>Opening Date</th>
                            <th>Account Type</th>
                            <th>Status</th>
                            <th>Close Account</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            accounts.map(account =>
                                <tr key={account.accountNumber}>
                                    <td>
                                        {/* <i className="fas fa-pencil-alt text-warning" onClick={() => updateAccount(account.accountNumber)} style={{ marginRight: '30px', cursor: 'pointer' }}></i> */}
                                        <i className="fas fa-user-slash text-danger" style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete account: ${account.accountNumber}`)) {
                                                    deleteAccount(account.accountNumber);
                                                }
                                            }}>
                                        </i>
                                    </td>
                                    <td>{account.accountNumber}</td>
                                    <td>{account.balance}</td>
                                    <td>{account.interestRate}</td>
                                    <td>{account.openingDate}</td>
                                    <td>{account.accountType}</td>
                                    <td>{account.status}</td>
                                    <td style={{ color: 'blue', cursor: 'pointer' }} onClick={() => {
                                        if (window.confirm(`Are you sure you want to close account number: ${account.accountNumber}`)) {
                                            closeAccount(account.accountNumber);
                                        }
                                    }}>Close Account</td>
                                </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Accounts
