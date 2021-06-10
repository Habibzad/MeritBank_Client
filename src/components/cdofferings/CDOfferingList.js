import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { CD_OFFERINGS } from '../../ResourceEndpoints';

function CDOfferingList() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt

    const [cdOfferings, setCDOfferings] = useState([])

    async function showAccountHolders() {
        axios.get(CD_OFFERINGS, {
            headers: {
                'Authorization': `Bearer ` + jwt
            }
        })
            .then((res) => {
                setCDOfferings(res.data)
                console.log(res.data)
            })
            .catch((error) => {
                console.error(cdOfferings)
            })
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div className="container">
            <h1 className="text-center">Account Holders List</h1>
            <Button onClick={showAccountHolders} variant="primary">Show Account Holders</Button>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Interest Rate</th>
                            <th>Term</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cdOfferings.map(cdOffering =>
                                <tr key={cdOffering.id}>
                                    <td>{cdOffering.id}</td>
                                    <td>{cdOffering.interestRate}</td>
                                    <th>{cdOffering.term}</th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CDOfferingList
