import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Table, Alert } from 'react-bootstrap'

import { CD_OFFERINGS, DELETE_CDOFFERING } from '../../ResourceEndpoints';

function CDOfferingList() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();
    const [cdOfferings, setCDOfferings] = useState([])
    const successMessage = store.successMessage;

    if (successMessage !== '') {
        setTimeout(() => setStore({ ...store, successMessage: '' }), 2000)
    }
    useEffect(() => {
        showAOfferings()
    }, [])

    async function showAOfferings() {
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



    return (
        <div className="container">
            <h3 className="component-header">CD Offerings</h3>
            <div className="">
                <Table style={{ backgroundColor: 'white', textAlign: 'center' }} className="table table-striped table-bordered">
                    <thead>
                        <tr>

                            <th>ID</th>
                            <th>Interest Rate</th>
                            <th>Term</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            cdOfferings.map(cdOffering =>
                                <tr key={cdOffering.id}>

                                    <td>{cdOffering.id}</td>
                                    <td>{cdOffering.interestRate}</td>
                                    <th>{cdOffering.term}</th>
                                </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CDOfferingList
