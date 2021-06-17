import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch
} from "react-router-dom";

import { Tabs, Tab, Nav, NavDropdown, Jumbotron, Navbar } from 'react-bootstrap'
import CreateSavingsAccount from './CreateSavingsAccount'
import CreateCDAccount from './CreateCDAccount'
import CreateCheckingAccount from './CreateCheckingAccount'

const addSavings = '/add-savings'
const addChecking = '/add-checking'
const addCD = '/add-cd'

function AddAccount() {
    const { url } = useRouteMatch();
    return (
        <div>
            <h3 className="component-header">Create Account</h3>
            <Router>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand ><Link style={{ fontSize: '16px' }} className="admin-main" to={url}>Savings</Link></Navbar.Brand>
                    <Navbar.Brand ><Link style={{ fontSize: '16px' }} className="admin-main" to={url + addChecking}>Checking</Link></Navbar.Brand>
                    <Navbar.Brand ><Link style={{ fontSize: '16px' }} className="admin-main" to={url + addCD}>CD Account</Link></Navbar.Brand>
                </Navbar>
                <Jumbotron className="menu1">
                    <Switch>
                        <Route exact path={url}>
                            <CreateSavingsAccount />
                        </Route>
                        <Route exact path={url + addChecking}>
                            <CreateCheckingAccount />
                        </Route>
                        <Route exact path={url + addCD}>
                            <CreateCDAccount />
                        </Route>
                    </Switch>

                </Jumbotron>
            </Router>

        </div>
    )
}

export default AddAccount
