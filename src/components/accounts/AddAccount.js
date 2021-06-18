import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { Jumbotron, Navbar } from 'react-bootstrap'

import SavingsAccount from './SavingsAccount';
import CDAccount from './CDAccount'
import PersonalChecking from './PersonalChecking';
import DBAChecking from './DBAChecking'
import RegularIRA from './RegularIRA';


const addSavings = '/savings'
const addPersonalChecking = '/personal-checking'
const addDbaChecking = '/dba-checking'
const addCD = '/cd'
const regularIRA = '/regular-ira'

function AddAccount() {
    const { url } = useRouteMatch();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return (
        <React.Fragment>
            <Router>
                <Jumbotron className="menu1">
                    <h5 className="component-header">Create Account</h5>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand ><Link style={{ fontSize: '16px' }} className="admin-main" to={url + addSavings}>Savings</Link></Navbar.Brand>
                        <Navbar.Brand ><Link style={{ fontSize: '16px' }} className="admin-main" to={url + addPersonalChecking}>Personal Checking</Link></Navbar.Brand>
                        <Navbar.Brand ><Link style={{ fontSize: '16px' }} className="admin-main" to={url + addDbaChecking}>DBA Checking</Link></Navbar.Brand>
                        <Navbar.Brand ><Link style={{ fontSize: '16px' }} className="admin-main" to={url + addCD}>CD Account</Link></Navbar.Brand>
                        <Navbar.Brand ><Link style={{ fontSize: '16px' }} className="admin-main" to={url + regularIRA}>Regular IRA</Link></Navbar.Brand>
                    </Navbar>
                    <code style={{ display: 'block', textAlign: 'right' }}>{year}/{month}/{day}</code>
                    <Switch>
                        <Route exact path={url + addSavings}>
                            <SavingsAccount />
                        </Route>
                        <Route exact path={url + addPersonalChecking}>
                            <PersonalChecking />
                        </Route>
                        <Route exact path={url + addDbaChecking}>
                            <DBAChecking />
                        </Route>
                        <Route exact path={url + addCD}>
                            <CDAccount />
                        </Route>
                        <Route exact path={url + regularIRA}>
                            <RegularIRA />
                        </Route>
                    </Switch>
                </Jumbotron>
            </Router>
        </React.Fragment>
    )
}

export default AddAccount
