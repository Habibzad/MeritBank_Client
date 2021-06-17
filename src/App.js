import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthorizationProvider } from './AuthorizationContext'

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Login from './components/Login'
import AccountHolders from './components/accountholders/AccountHolders'
import Landing from './components/Landing'
import AdminDashboard from './components/admin_dashboard/AdminDash'
import UserDashboard from './components/user_dashboard/UserDash'
import NoMatch from './components/admin_dashboard/NoMatch';

function App() {
    return (
        <AuthorizationProvider>

            <Router >
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/admin">
                        <AdminDashboard />
                    </Route>
                    <Route exact path="/user">
                        <UserDashboard />
                    </Route>
                    <Route exact path="/accountholders">
                        <AccountHolders />
                    </Route>
                    <Route exact path="*">
                        <NoMatch />
                    </Route>
                </Switch>
                {/* <Footer /> */}
            </Router>

        </AuthorizationProvider>
    );
}

export default App;
