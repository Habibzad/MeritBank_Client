import React, { useState, useEffect, useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'
import { Redirect, useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt

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
            .then(result => setAccounts(result))
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div className="container">
            <h3 className="component-header">Accounts</h3>
            <div className="">
                <Table style={{ backgroundColor: 'white', textAlign: 'center' }} className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>Balance</th>
                            <th>Interest Rate</th>
                            <th>Opening Date</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            accounts.map(account =>
                                <tr key={account.accountNumber}>
                                    <td>{account.accountNumber}</td>
                                    <td>{account.balance}</td>
                                    <td>{account.interestRate}</td>
                                    <th>{account.openingDate}</th>
                                </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Accounts
