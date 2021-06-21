import React, { useContext } from 'react';
import { AuthorizationContext } from '../../AuthorizationContext'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import '../../App.css';

function Header() {
    const [store, setStore] = useContext(AuthorizationContext);
    const isLoggedIn = store.isLoggedIn;
    const user = store.username

    const logout = () => {
        setStore({
            jwt: '',
            role: '',
            username: '',
            isLoggedIn: false
        })
        localStorage.clear()
    }

    const loggedInUser = `${user}`
    return (
        <Navbar bg="" className="header justify-content-end">
            {
                isLoggedIn
                    ?
                    <Link className="login-btn" to="/login" onClick={logout}>Hello, {loggedInUser}! Logout</Link>
                    :
                    <Link className="login-btn" to="/login"><i className="fas fa-user" style={{ marginRight: '7px' }}></i>Login</Link>
            }
        </Navbar>
    );
}

export default Header

