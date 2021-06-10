import React, { useContext } from 'react';
import { AuthorizationContext } from '../../AuthorizationContext'
import { Link } from 'react-router-dom'
import { Container, Navbar, NavDropdown } from 'react-bootstrap'
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

                        <NavDropdown
                            id="d3"
                            title={loggedInUser}
                            menuVariant="dark"
                        >
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>

                        : <Link className="login-btn" to="/login"><i className="fas fa-user"></i> Login</Link>
                }
            </Navbar>

            <Navbar className="navbar navbar-expand-lg shadow navbar-light bg-white">
                <Container>
                    <Link to="/">
                        <img src="/images/logo.png" height="35" alt="logo" />
                    </Link>
                    <ul className="nav ml-auto nav-flex-icons">
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.meritamerica.org/">
                                <i class="grey-text fab fa-facebook-square fa-2x"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link waves-effect waves-light" href="https://www.meritamerica.org/">
                                <i className="grey-text fab fa-instagram fa-2x"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link waves-effect waves-light" href="https://www.meritamerica.org/"><i class="grey-text fab fa-twitter fa-2x"></i></a>
                        </li>
                    </ul>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header

