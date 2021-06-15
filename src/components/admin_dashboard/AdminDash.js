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
import TransactionsList from '../transactions/TransactionsList';
import TransferTransaction from '../transactions/TransferTransaction';
import DepositTransaction from '../transactions/DepositTransaction';
import WithdrawTransaction from '../transactions/WithdrawTransaction';
import Accounts from '../accounts/Accounts';
import './admin.css'

//Component URLs
const addAccountHolder = '/add-account-holder'
const addfferingslist = '/addfferingslist'
const accountholders = '/accountholders'
const accounts = '/accounts'
const addcdofferings = '/addcdofferomg'
const clearOfferings = '/clear-offerings'
const createUser = '/create-user'
const deleteUser = '/delete-user'
const deleteCDOffering = '/delete-cdoffering'
const deposit = '/deposit'
const transactions = '/transactions'
const transfer = '/transfer'
const updateUser = '/udate-user'
const usersList = '/users-list'
const withdraw = '/withdraw'


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
                <h4 style={{ color: '#5086A8', margin: '0', lineHeight: '60px', paddingLeft: '5px' }}>Hello, {user}</h4>
            </div>
            <div >
                <Router className="">
                    <Nav bg="light" variant="primary" className="menu">
                        <Nav.Link ><Link className="admin-main" to={url}>Home</Link></Nav.Link>
                        <Nav.Link ><Link className="admin-main" to={url + usersList}>Users</Link></Nav.Link>


                        <NavDropdown title="Accounts">
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accounts}>Accounts</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>Create Account</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>Update Account</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + accountholders}>Delete Account</Link></NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link ><Link className="admin-main" to={url + accountholders}>AccountHolders</Link></Nav.Link>
                        <NavDropdown title="CDOfferings">
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + addfferingslist}>CDOfferings</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + clearOfferings}>Clear CDOfferings</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Transactions">
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + transactions}>All Transactions</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + transfer}>Transfer</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + deposit}>Deposit</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link className="dropdown_menu" to={url + withdraw}>Withdraw</Link></NavDropdown.Item>
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
                            <Route exact path={url + accounts}>
                                <Accounts />
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
                            <Route path={url + transactions}>
                                <TransactionsList />
                            </Route>
                            <Route path={url + transfer}>
                                <TransferTransaction />
                            </Route>
                            <Route path={url + deposit}>
                                <DepositTransaction />
                            </Route>
                            <Route path={url + withdraw}>
                                <WithdrawTransaction />
                            </Route>
                        </Switch>

                    </Jumbotron>
                </Router>
            </div>
        </div>
    )
}

export default AdminDash
