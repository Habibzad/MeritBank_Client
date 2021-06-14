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
import AdminHome from './AdminHome'
import CDOfferings from '../cdofferings/CDOfferingList'
import AddCDOffering from '../cdofferings/AddCDOffering'
import AccountHolders from '../accountholders/AccountHolders'
import UsersList from '../users/UsersList'
import CreateUser from '../users/CreateUser'
import DeleteUser from '../users/DeleteUser'
import UpdateUser from '../users/UpdateUser';
import DeleteCDOffering from '../cdofferings/DeleteCDOffering'
import ClearCDOfferings from '../cdofferings/ClearCDOfferings'
import AddAccountHolder from '../accountholders/AddAccountHolder';
import './admin.css'

//Component URLs
const addfferingslist = '/addfferingslist'
const accountholders = '/accountholders'
const addcdofferings = '/addcdofferomg'
const usersList = '/users-list'
const createUser = '/create-user'
const deleteUser = '/delete-user'
const updateUser = '/udate-user'
const deleteCDOffering = '/delete-cdoffering'
const clearOfferings = '/clear-offerings'
const addAccountHolder = '/add-account-holder'


function AdminDash() {
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
                <h4>Hello, {user}</h4>
            </div>
            <div >
                <Router className="">
                    <Nav bg="light" variant="primary" className="menu">
                        <Nav.Link ><Link className="admin-main" to={url}>Home</Link></Nav.Link>
                        <Nav.Link ><Link className="admin-main" to={url + usersList}>Display Users</Link></Nav.Link>

                        {/* <NavDropdown title="Users">
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + usersList}>Display Users</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + createUser}>Create User</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + deleteUser}>Delete User</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + updateUser}>Update User</Link></NavDropdown.Item>
                        </NavDropdown> */}
                        <NavDropdown title="Accounts">
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>Display Account Information</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>Create Account</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>Update Account</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>Delete Account</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="AccountHolders">
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>AccountHolders List</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + addAccountHolder}>Create AccountHolder</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>Delete AccountHolder</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>Update AccountHolder</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="CDOfferings">
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + addfferingslist}>CDOfferings</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + addcdofferings}>Add CDOffering</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + deleteCDOffering}>Delete CDOffering</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + clearOfferings}>Clear CDOfferings</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Transactions">
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + addfferingslist}>Transactions List</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + addcdofferings}>Transfer</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + addcdofferings}>Deposit</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + addcdofferings}>Withdraw</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Jumbotron className="menu1">
                        <Switch>
                            <Route exact path={url}>
                                <AdminHome />
                            </Route>
                            <Route exact path={url + usersList}>
                                <UsersList />
                            </Route>
                            <Route exact path={url + createUser}>
                                <CreateUser />
                            </Route>
                            <Route exact path={url + deleteUser}>
                                <DeleteUser />
                            </Route>
                            <Route exact path={url + updateUser}>
                                <UpdateUser />
                            </Route>
                            <Route exact path={url + accountholders}>
                                <AccountHolders />
                            </Route>
                            <Route path={url + addAccountHolder}>
                                <AddAccountHolder />
                            </Route>
                            <Route path={url + addfferingslist}>
                                <CDOfferings />
                            </Route>
                            <Route path={url + addcdofferings}>
                                <AddCDOffering />
                            </Route>
                            <Route path={url + deleteCDOffering}>
                                <DeleteCDOffering />
                            </Route>
                            <Route path={url + clearOfferings}>
                                <ClearCDOfferings />
                            </Route>
                        </Switch>

                    </Jumbotron>
                </Router>
            </div>
        </div>
    )
}

export default AdminDash
