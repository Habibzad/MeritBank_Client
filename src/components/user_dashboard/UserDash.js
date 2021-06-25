import React, { useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'
import { Form, FormControl, Button, Jumbotron, Navbar } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch
} from "react-router-dom";

//Components
import UserProfile from './UserProfile'
import UserCDOffering from './UserCDOffering'
import Logout from '../shared/Logout';
import Accounts from './Accounts';
import UserTransfer from './UserTransfer';

//Component URLs
const cdOfferings = '/cd-offerings'
const openChecking = '/checkingAcc'
const transfer = '/transfer'

function UserDash() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const { url } = useRouteMatch();
    const { logout } = Logout();

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/" />
    }

    return (
        <div className="container">
            <Router>
                <Navbar bg="" variant="" className="admin-top-header">
                    <Navbar.Collapse className="justify-content-end">
                        {
                            isLoggedIn
                                ?
                                <code onClick={logout} className="logout-btn">
                                    Logout
                                </code>
                                :
                                null
                        }
                    </Navbar.Collapse>
                </Navbar>
                <Navbar bg="" variant="" className="admin-header">
                    <img src="/images/logo.jpeg" height="35" alt="logo" />
                    <Navbar.Collapse className="justify-content-end">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="How can we help you?"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="warning"><i class="fas fa-search"></i></Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Navbar bg="" variant="" className="menu">
                    <Link className="dash-menu" active to={url}>Home</Link>
                    <Link className="dash-menu" active to={url + openChecking}>Accounts</Link>
                    <Link className="dash-menu" active to={url + transfer}>Send Money</Link>
                    <Link className="dash-menu" active to={url + cdOfferings}>CD Offerings</Link>
                </Navbar>
                <Jumbotron className="menu1">
                    <h3 className="component-header">Dashboard</h3>
                    <Switch>
                        <Route exact path={url}>
                            <UserProfile />
                        </Route>
                        <Route exact path={url + openChecking}>
                            <Accounts />
                        </Route>
                        <Route path={url + cdOfferings}>
                            <UserCDOffering />
                        </Route>
                        <Route path={url + transfer}>
                            <UserTransfer />
                        </Route>
                    </Switch>
                </Jumbotron>
            </Router>
        </div>
    )
}

export default UserDash
