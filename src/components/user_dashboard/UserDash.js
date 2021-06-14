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
import { Jumbotron, Nav, NavDropdown } from 'react-bootstrap'
import CDOfferings from '../../components/cdofferings/CDOfferingList'
import UserProfile from '../../components/user_dashboard/UserProfile'

function UserDash() {

    const [store] = useContext(AuthorizationContext)
    const { url } = useRouteMatch();
    let isLoggedIn = store.isLoggedIn;
    let role = store.role;
    const user = store.username
    if (isLoggedIn === null) {
        if (!isLoggedIn) {
            const localStore = JSON.parse(localStorage.getItem('login'))
            isLoggedIn = localStore.login;
        }
    }

    //Logged in initially false
    if (!isLoggedIn && role !== "[ROLE_USER]") {
        return <Redirect to="/" />
    }

    const cdofferings = "/cdofferings"
    return (
        <div className="container">
            <div className="admin-dash-header">
                <h4>Hello, {user}</h4>
            </div>
            <Router >
                <Nav bg="light" variant="primary" className="menu">
                    <Nav.Link ><Link className="admin-main" to={url}>Profile</Link></Nav.Link>
                    <NavDropdown title="My Accounts">
                        <NavDropdown.Item >Display Users</NavDropdown.Item>
                        <NavDropdown.Item >Create User</NavDropdown.Item>
                        <NavDropdown.Item >Delete User</NavDropdown.Item>
                        <NavDropdown.Item >Update User</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Transfer">
                        <NavDropdown.Item ><Link className="dropdown_menu" to={url}>Display Account Information</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link className="dropdown_menu" to={url}>Update Account</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link className="dropdown_menu" to={url}>Delete Account</Link></NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link ><Link className="admin-main" to={url}>Open an Account</Link></Nav.Link>
                    <Nav.Link ><Link className="admin-main" to={url}>CDOfferings</Link></Nav.Link>
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
