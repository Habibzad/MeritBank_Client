import { AuthorizationContext } from '../../AuthorizationContext'
import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import { CD_OFFERINGS, DELETE_CDOFFERING } from '../../ResourceEndpoints';

function CDOfferingList() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const jwt = store.jwt
    const history = useHistory();
    const [cdOfferings, setCDOfferings] = useState([])

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

    const deleteOffering = (id) => {
        console.log(id)
        const myHeaders = {
            "Authorization": "Bearer " + jwt,
            "Content-Type": "application/json"
        }

        const payload = JSON.stringify({
            "id": id
        });

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: payload,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/CDOfferings", requestOptions)
            .then(response => response.text())
            .then(result => {
                showAOfferings()
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/user" />
    }

    return (
        <div className="container">
            <h3 className="component-header">CD Offerings</h3>
            <div className="">
                <table style={{ backgroundColor: 'white', textAlign: 'center' }} className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <ht>
                                <i
                                    className="fas fa-plus text-primary"
                                    style={{ cursor: 'pointer', marginTop: '17px' }}
                                    onClick={() => history.push('/admin/addcdofferomg')}>
                                </i>
                            </ht>
                            <th>ID</th>
                            <th>Interest Rate</th>
                            <th>Term</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            cdOfferings.map(cdOffering =>
                                <tr key={cdOffering.id}>
                                    <td>
                                        <i className="far fa-trash-alt text-danger" style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete the offering?`)) {
                                                    deleteOffering(cdOffering.id);
                                                }
                                            }}>
                                        </i>
                                    </td>
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
