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
import Accounts from './Accounts'
const addPersonalChecking = '/personal-checking'
const addDbaChecking = '/dba-checking'
const addCD = '/cd'
const regularIRA = '/regular-ira'
const savings = '/savings'

function AddAccount() {
    const { url } = useRouteMatch();
    return (
        <React.Fragment>
            <Router>
                <Jumbotron className="menu1">
                    <h5 className="component-header">Accounts</h5>

                    <div className="row">
                        <div className="col-md-2 add-account-dash">
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url}>Accounts List <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + savings}><i className="fas fa-plus fa-col"></i> Savings <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + addPersonalChecking}><i className="fas fa-plus fa-col"></i> Personal Checking<i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + addDbaChecking}><i className="fas fa-plus fa-col"></i> DBA Checking <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + addCD}><i className="fas fa-plus fa-col"></i> CD Account <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + regularIRA}><i className="fas fa-plus fa-col"></i> Regular IRA <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + regularIRA}><i className="fas fa-plus fa-col"></i> Rollover IRA <i class="fas fa-chevron-right"></i></Link>
                            <Link style={{ fontSize: '16px' }} className="add-account-link" to={url + regularIRA}><i className="fas fa-plus fa-col"></i> Roth IRA <i class="fas fa-chevron-right"></i></Link>
                        </div>
                        <div className=" add-account-container">
                            <Switch>
                                <Route exact path={url}>
                                    <Accounts />
                                </Route>
                                <Route exact path={url + savings}>
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
