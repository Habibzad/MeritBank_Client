import React, { useState, useEffect } from 'react'
import { Card, Table } from 'react-bootstrap'
function UserAccounts() {
    const [checkingAccounts, setCheckingAccounts] = useState([]);
    const [savingsAccounts, setSavingsAccounts] = useState([])

    useEffect(() => {
        setCheckingAccounts([
            {
                "accountNumber": 1,
                "balance": 10180.0,
                "interestRate": 0.01,
                "openingDate": "06/14/2021 at 12:48"
            },
            {
                "accountNumber": 20,
                "balance": 10000.0,
                "interestRate": 0.01,
                "openingDate": "06/15/2021 at 01:04"
            }
        ])
    }, [])

    const CheckingAccounts = () => {
        return (
            <Table striped hover style={{ fontSize: '14px' }} className="wrapper">
                <thead>
                    <tr>
                        <th>Account Number</th>
                        <th>Balance</th>
                        <th>Interest Rate</th>
                        <th>Opening Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        checkingAccounts.map(checkingAccount =>
                            <tr key={checkingAccount.accountNumber}>
                                <td>{checkingAccount.accountNumber}</td>
                                <td>$ {checkingAccount.balance}</td>
                                <td>{checkingAccount.interestRate} %</td>
                                <td>{checkingAccount.openingDate}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }

    console.log(checkingAccounts)
    return (
        <div>
            {
                checkingAccounts !== [] ? <CheckingAccounts /> : null
            }
            <br />
        </div>
    )
}

export default UserAccounts
