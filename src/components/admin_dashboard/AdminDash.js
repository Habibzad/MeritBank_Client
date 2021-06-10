import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthorizationContext } from '../../AuthorizationContext'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { Nav, Jumbotron, Dropdown, DropdownButton, NavDropdown, Navbar } from 'react-bootstrap'
import AdminHome from './AdminHome'
import CDOfferings from '../cdofferings/CDOfferingList'
import AddCDOffering from '../cdofferings/AddCDOffering'
import AccountHolders from '../accountholders/AccountHolders'
import './admin.css'

function AdminDash() {
    const [store] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const { url } = useRouteMatch();
    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/login" />
    }

    const addfferingslist = '/addfferingslist'
    const accountholders = '/accountholders'
    const addcdofferings = '/addcdofferomg'
    return (
        <div className="container">
            <div className="admin-dash-header">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="admin-main cssflex">
                <Router className="">
                    <Nav bg="dark" variant="primary" className="menu">
                        <Link className="menu-link" to={url}>Home</Link>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Users"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item href="#action/3.1">Display Users</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Create User</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Delete User</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Update User</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="AccountHolders"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item ><Link to={url + accountholders}>AccountHolders</Link></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Create AccountHolder</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Delete AccountHolder</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Update AccountHolder</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="CDOfferings"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item ><Link to={url + addfferingslist}>CDOfferings</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link to={url + addcdofferings}>Add CDOffering</Link></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Delete User</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Update User</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Jumbotron className="menu1">
                        <Switch>
                            <Route exact path={url}>
                                <AdminHome />
                            </Route>
                            <Route exact path={url + accountholders}>
                                <AccountHolders />
                            </Route>
                            <Route path={url + addfferingslist}>
                                <CDOfferings />
                            </Route>
                            <Route path={url + addcdofferings}>
                                <AddCDOffering />
                            </Route>
                        </Switch>

                    </Jumbotron>
                </Router>
            </div>
        </div>
    )
}

export default AdminDash
