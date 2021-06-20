import React, { useContext } from 'react'
import { AuthorizationContext } from '../../AuthorizationContext'
import { Form, FormControl, Button, Jumbotron, Navbar, NavDropdown } from 'react-bootstrap'

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
import UpdateUser from '../users/UpdateUser';
import UpdateAccount from '../accounts/UpdateAccount'
import DeleteCDOffering from '../cdofferings/DeleteCDOffering'
import ClearCDOfferings from '../cdofferings/ClearCDOfferings'
import AddAccountHolder from '../accountholders/AddAccountHolder';
import UpdateAccountHolder from '../accountholders/UpdateAccountHolder';
import TransactionsList from '../transactions/TransactionsList';
import Transactions from '../transactions/Transactions'
import TransferTransaction from '../transactions/TransferTransaction';
import DepositTransaction from '../transactions/DepositTransaction';
import WithdrawTransaction from '../transactions/WithdrawTransaction';
import Accounts from '../accounts/Accounts';
import AddAccount from '../accounts/AddAccount';
import Profile from '../accountholders/Profile';
import NoMatch from './NoMatch';
import './admin.css'

//Component URLs
const addAccountHolder = '/add-account-holder'
const addfferingslist = '/addfferingslist'
const accountholders = '/accountholders'
const accounts = '/accounts'
const addcdofferings = '/addcdofferomg'
const addAccount = '/add-account'
const clearOfferings = '/clear-offerings'
const createUser = '/create-user'
const deleteCDOffering = '/delete-cdoffering'
const deposit = '/deposit'
const transactions = '/transactions'
const transfer = '/transfer'
const updateAccount = '/update-account'
const usersList = '/users-list'
const withdraw = '/withdraw'
const profile = '/profile/:id'
const trans = '/trans'

function AdminDash() {
    const [store, setStore] = useContext(AuthorizationContext)
    const isLoggedIn = store.isLoggedIn;
    const role = store.role;
    const user = store.username
    const { url } = useRouteMatch();

    if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
        return <Redirect to="/" />
    }

    const logout = () => {
        setStore({
            jwt: '',
            role: '',
            username: '',
            isLoggedIn: false
        })
        sessionStorage.clear()
    }

    return (
        <div className="container dash">
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
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="warning"><i className="fas fa-search"></i></Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Navbar bg="" variant="" className="menu">
                    <Link className="dash-menu" active to={url}><i className="fas fa-home"></i> Home</Link>
                    <Link className="dash-menu" to={url + usersList}><i className="fas fa-user"></i> Users</Link>
                    <Link className="dash-menu" to={url + accounts}><i className="fas fa-university"></i> Accounts</Link>
                    <Link className="dash-menu" to={url + accountholders} style={{ padding: '5px 30px 0', width: '220px' }}><i class="fas fa-users"></i> AccountHolders</Link>
                    <Link className="dash-menu" to={url + trans}><i class="fas fa-money-bill-alt"></i> Transactions</Link>
                    <NavDropdown title="CDOfferings">
                        <NavDropdown.Item ><Link to={url + addfferingslist}>CDOfferings</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link className="dropdown_menu" to={url + clearOfferings}>Clear CDOfferings</Link></NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
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
                        <Route exact path={url + '/udate-user/:id'}>
                            <UpdateUser />
                        </Route>

                        <Route exact path={url + accounts}>
                            <Accounts />
                        </Route>
                        <Route exact path={url + addAccount}>
                            <AddAccount />
                        </Route>
                        <Route exact path={url + updateAccount}>
                            <UpdateAccount />
                        </Route>
                        <Route exact path={url + accountholders}>
                            <AccountHolders />
                        </Route>
                        <Route path={url + addAccountHolder}>
                            <AddAccountHolder />
                        </Route>
                        <Route path={url + "/update-account-holder/:id"}>
                            <UpdateAccountHolder />
                        </Route>
                        <Route path={url + profile}>
                            <Profile />
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
                        <Route path={url + trans}>
                            <Transactions />
                        </Route>
                        <Route path={url + withdraw}>
                            <NoMatch />
                        </Route>
                    </Switch>

                </Jumbotron>
            </Router>
        </div>
    )
}

export default AdminDash
