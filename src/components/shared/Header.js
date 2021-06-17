import React, { useContext } from 'react';
import { AuthorizationContext } from '../../AuthorizationContext'
import { Link } from 'react-router-dom'
import { Navbar, NavDropdown } from 'react-bootstrap'
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

    const loggedInUser = `Welcome, ${user}`
    return (
        <div className="">
            <Navbar bg="dark" className="justify-content-end">
                {
                    isLoggedIn
                        ?
                        <NavDropdown title={loggedInUser}>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        :
                        <Link className="login-btn" to="/login"><i className="fas fa-user"></i> Login</Link>
                }
            </Navbar>
        </div>
    );
}

export default Header

