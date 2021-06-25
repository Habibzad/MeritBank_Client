import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { Jumbotron } from 'react-bootstrap'

import UserAccounts from './UserAccounts';
import OpenPersonalChecking from './OpenPersonalChecking';
import OpenSavingsAccount from './OpenSavingsAccount';
import OpenCDAccount from './OpenCDAccount';

const personalChecking = '/personal-checking'
const savings = '/savings'
const cdAccount = '/cd-account'

function Accounts() {
    const { url } = useRouteMatch();
    return (
        <React.Fragment className="container">
            <Router>
                <Jumbotron className="menu1">
                    <div className="row">
                        <div className="col-md-2 add-account-dash">
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url}>Accounts List <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + savings}>Savings Account  <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + personalChecking}>Personal Checking <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + personalChecking}>DBA Checking <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + cdAccount}>CD Account <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url}>Regular IRA <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url}>Roth IRA <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url}>Rollover IRA <i class="fas fa-chevron-right"></i></Link>
                        </div>
                        <div className=" add-account-container">
                            <Switch>
                                <Route exact path={url}>
                                    <UserAccounts />
                                </Route>
                                <Route exact path={url + savings}>
                                    <OpenSavingsAccount />
                                </Route>
                                <Route exact path={url + personalChecking}>
                                    <OpenPersonalChecking />
                                </Route>
                                <Route exact path={url + cdAccount}>
                                    <OpenCDAccount />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Jumbotron>
            </Router>
        </React.Fragment>
    )
}

export default Accounts
