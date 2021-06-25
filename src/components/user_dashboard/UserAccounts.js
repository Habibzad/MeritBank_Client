import React, { useState, useEffect, useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'
import { Table, Alert } from 'react-bootstrap'

function UserAccounts() {
    const [store, setStore] = useContext(AuthorizationContext)
    const jwt = store.jwt
    const [user, setUser] = useState({})
    const successMessage = store.successMessage;

    useEffect(() => {
        displayContactInfo()
    }, [])

    if (successMessage !== '') {
        setTimeout(() => setStore({ ...store, successMessage: '' }), 2000)
    }

    const displayContactInfo = () => {
        const myHeaders = {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
        }
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/Me", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUser(result)
            })
            .catch(error => console.log('error', error));
    }

    let counter = 1;
    return (
        <div>
            <h4 className="transfer-header"><i class="fas fa-chevron-circle-right"></i> My Accounts</h4>
            {successMessage &&
                <Alert className="alert" variant='success'>{successMessage}</Alert>}
            <Table striped hover style={{ fontSize: '14px' }} className="wrapper">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Account Type</th>
                        <th>Account Number</th>
                        <th>Balance</th>
                        <th>Interest Rate</th>
                        <th>Opening Date</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        user.personalCheckingAccount != null ? user.personalCheckingAccount.map(pca =>
                            <tr key={pca.accountNumber}>
                                <td>{counter++}</td>
                                <td>Personal Checking</td>
                                <td>{pca.accountNumber}</td>
                                <td>$ {pca.balance}</td>
                                <td>{pca.interestRate} %</td>
                                <td>{pca.openingDate}</td>
                            </tr>
                        )
                            :
                            null
                    }
                    {
                        user.savingsAccounts != null ? user.savingsAccounts.map(pca =>
                            <tr key={pca.accountNumber}>
                                <td>{counter++}</td>
                                <td>Savings</td>
                                <td>{pca.accountNumber}</td>
                                <td>$ {pca.balance}</td>
                                <td>{pca.interestRate} %</td>
                                <td>{pca.openingDate}</td>
                            </tr>
                        )
                            :
                            null
                    }
                    {
                        user.cdAccounts != null ? user.cdAccounts.map(cda =>
                            <tr key={cda.accountNumber}>
                                <td>{counter++}</td>
                                <td>Certificate of Deposit</td>
                                <td>{cda.accountNumber}</td>
                                <td>$ {cda.balance}</td>
                                <td>{cda.interestRate} %</td>
                                <td>{cda.openingDate}</td>
                            </tr>
                        )
                            :
                            null
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default UserAccounts
