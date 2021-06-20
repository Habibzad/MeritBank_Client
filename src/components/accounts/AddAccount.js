import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { Jumbotron } from 'react-bootstrap'

import SavingsAccount from './SavingsAccount';
import CDAccount from './CDAccount'
import PersonalChecking from './PersonalChecking';
import DBAChecking from './DBAChecking'
import RegularIRA from './RegularIRA';

const addPersonalChecking = '/personal-checking'
const addDbaChecking = '/dba-checking'
const addCD = '/cd'
const regularIRA = '/regular-ira'

function AddAccount() {
    const { url } = useRouteMatch();
    return (
        <React.Fragment className="container">
            <Router>
                <Jumbotron className="menu1">
                    <h5 className="component-header">Create Account</h5>

                    <div className="row">
                        <div className="col-md-2 add-account-dash">
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url}>Savings <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + addPersonalChecking}>Personal Checking <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + addDbaChecking}>DBA Checking <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + addCD}>CD Account <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + regularIRA}>Regular IRA <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + regularIRA}>Rollover IRA <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + regularIRA}>Roth IRA <i class="fas fa-chevron-right"></i></Link>
                        </div>
                        <div className=" add-account-container">
                            <Switch>
                                <Route exact path={url}>
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
                        </div>
                    </div>
                </Jumbotron>
            </Router>
        </React.Fragment>
    )
}

export default AddAccount
