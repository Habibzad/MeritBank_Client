import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL_AUTHENTICATE } from '../../ResourceEndpoints';

function AccountHolders() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt

    useEffect(() => {
        showAccountHolders()
    }, [])

    const [accountHolders, setAccountHolders] = useState([])

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
            <h3 className="component-header">Account Holders</h3>
            <div className="">
                <table className="table table-striped table-bordered" style={{ backgroundColor: 'white', textAlign: 'center' }}>
                    <thead>
                        <tr>
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