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
import UserAccounts from './UserAccounts'
import UserCDOffering from './UserCDOffering'
import Logout from '../shared/Logout';
//Component URLs
const cdOfferings = '/cd-offerings'
const accounts = './accounts'

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
                    <Link className="dash-menu" active to={url + accounts}>Accounts</Link>
                    <Link className="dash-menu" active to={url + cdOfferings}>CD Offerings</Link>
                </Navbar>
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
    )
}

export default UserDash
