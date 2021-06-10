import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthorizationContext } from '../../AuthorizationContext'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Nav, Jumbotron, NavDropdown } from 'react-bootstrap'
import AdminHome from './AdminHome'
import CDOfferings from '../cdofferings/CDOfferingList'
import AccountHolders from '../accountholders/AccountHolders'
import './admin.css'

function AdminDash() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/login" />
    }

    return (
        <div className="container">
            <div className="admin-dash-header">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="admin-main cssflex">
                <Router className="">
                    <Nav bg="light" variant="primary" className="menu">
                        <Link className="menu-link" to="/admin">Home</Link>
                        <Link className="menu-link" to="/admin/accountholders">AccountHolders</Link>
                        <Link className="menu-link" to="/admin/cdofferings">CD Offerings</Link>
                    </Nav>
                    <Jumbotron className="menu1">
                        <Switch>
                            <Route exact path="/admin">
                                <AdminHome />
                            </Route>
                            <Route exact path="/admin/accountholders">
                                <AccountHolders />
                            </Route>
                            <Route path="/admin/cdofferings">
                                <CDOfferings />
                            </Route>
                        </Switch>

                    </Jumbotron>
                </Router>
            </div>
        </div>
    )
}

export default AdminDash
