import React, { useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'
import { Nav, Jumbotron, NavDropdown } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch
} from "react-router-dom";

//Components
import Header from '../shared/Header';
import UserHome from './UserProfile'
import AddCDOffering from '../cdofferings/AddCDOffering'
import TransferTransaction from '../transactions/TransferTransaction';
import DepositTransaction from '../transactions/DepositTransaction';
import WithdrawTransaction from '../transactions/WithdrawTransaction';
import UserProfile from './UserProfile'
import UserAccounts from './UserAccounts'
import UserCDOffering from './UserCDOffering'
//Component URLs
const cdOfferings = '/cd-offerings'
const deposit = '/deposit'
const transactions = '/transactions'
const transfer = '/transfer'
const withdraw = '/withdraw'
const accounts = './accounts'

function UserDash() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const user = store.username
    const { url } = useRouteMatch();

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/" />
    }

    return (
        <div className="container">
            <div className="dash-header">
                <h4 style={{ color: '#5086A8', margin: '0', lineHeight: '60px', paddingLeft: '5px' }}>Hello, {user}</h4>
            </div>
            <div >
                <Router className="">
                    <Nav bg="light" variant="primary" className="menu">
                        <Nav.Link ><Link className="admin-main" to={url}>My Profile</Link></Nav.Link>
                        <Nav.Link ><Link className="admin-main" to={url + accounts}>Accounts</Link></Nav.Link>
                        <Nav.Link ><Link className="admin-main" to={url + cdOfferings}>CD Offerings</Link></Nav.Link>
                    </Nav>
                    <Jumbotron className="menu1">
                        <Switch>
                            <Route exact path={url}>
                                <UserProfile />
                            </Route>
                            <Route exact path={url + accounts}>
                                <UserAccounts />
                            </Route>
                            <Route path={url + cdOfferings}>
                                <UserCDOffering />
                            </Route>
                        </Switch>

                    </Jumbotron>
                </Router>
            </div>
        </div>
    )
}

export default UserDash
