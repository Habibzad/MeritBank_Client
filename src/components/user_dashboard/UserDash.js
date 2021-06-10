import React, { useContext } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { AuthorizationContext } from '../../AuthorizationContext'
import { Redirect } from 'react-router-dom'

import { Jumbotron, Nav } from 'react-bootstrap'

import CDOfferings from '../../components/cdofferings/CDOfferingList'
import UserProfile from '../../components/user_dashboard/UserProfile'

function UserDash() {

    const [store] = useContext(AuthorizationContext)
    const { url } = useRouteMatch();
    let isLoggedIn = store.isLoggedIn;
    let role = store.role;

    if (isLoggedIn === null) {
        if (!isLoggedIn) {
            const localStore = JSON.parse(localStorage.getItem('login'))
            isLoggedIn = localStore.login;
        }
    }

    //Logged in initially false
    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/login" />
    }

    const cdofferings = "/cdofferings"
    return (
        <div className="container">
            <h1>User Dashboard</h1>
            <Router >
                <Nav>
                    <Link to={url}>Home</Link>
                    <Link to={url + cdofferings}>Users</Link>
                </Nav>
                <Jumbotron>
                    <h1>Hello, world!</h1>

                    <Switch>
                        <Route exact path={url}>
                            <UserProfile />
                        </Route>
                        <Route path={url + cdofferings}>
                            <CDOfferings />
                        </Route>
                    </Switch>

                </Jumbotron>
            </Router>
        </div>
    )
}

export default UserDash
