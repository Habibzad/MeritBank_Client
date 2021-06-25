import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthorizationProvider } from './AuthorizationContext'

import Landing from './components/landing_page/Landing'
import Login from './components/login/Login'
import AdminDashboard from './components/admin_dashboard/AdminDash'
import UserDashboard from './components/user_dashboard/UserDash'
import NoMatch from './components/shared/NoMatch';

function App() {
    return (
        <AuthorizationProvider>
            <Router >
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
                    <Route exact path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>

        </AuthorizationProvider>
    );
}

export default App;
