import React from 'react';
import '../App.css';
import { Navbar, Container } from 'react-bootstrap'
import Header from './shared/Header';
import Footer from './shared/Footer'
const Landing = () => {
    return (
        <div className="App">
            <Header />
            <Navbar className="navbar navbar-expand-lg shadow navbar-light bg-white">
                <Container>
                    <img src="/images/logo.png" height="35" alt="logo" />
                    <ul className="nav ml-auto nav-flex-icons">
                        <li className="nav-item">
                            <a className="nav-link-header waves-effect waves-light" href="https://www.meritamerica.org/">
                                Checking
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link-header waves-effect waves-light" href="https://www.meritamerica.org/">
                                Savings
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link-header waves-effect waves-light" href="https://www.meritamerica.org/">
                                CD Accounts
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link-header waves-effect waves-light" href="https://www.meritamerica.org/">
                                IRA Accounts
                            </a>
                        </li>
                    </ul>
                </Container>
            </Navbar>
            <div className="mb-3 b12" >
                <div className="b13"></div>
            </div>
            <div className="container b14" >
                <div className="d-flex flex-column text-white py-3 align-items-center">
                    <h1 className="font-weight-bold text-center pb-3">.</h1>
                    <h1 className="font-weight-bold text-center pb-3">.</h1>
                </div>
            </div>
            <div className="container">
                <div className="row py-4">
                    <div className="col-md-3 col-sm-6 pb-3 px-2 card-mobile">
                        <div className="card card-body text-center shadow rounded-lg">
                            <p><i className="landing-fa fab fa-cc-visa fa-3x"></i></p>
                            <h4 className="landing-text">Credit Cards</h4>
                            <p className="landing-text">Lorem ipsum</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 pb-3 px-2 card-mobile">
                        <div className="card card-body text-center shadow rounded-lg">
                            <p><i className="landing-fa fas fa-dollar-sign fa-3x"></i></p>
                            <h4 className="landing-text">Competative Interest Rates</h4>
                            <i className=""></i>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 pb-3 px-2 card-mobile">
                        <div className="card card-body text-center shadow rounded-lg">
                            <p><i className="landing-fa fas fa-tachometer-alt fa-3x"></i></p>
                            <h4 className="landing-text">Free Credit Score</h4>
                            <p className="landing-text">Lorem ipsum</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 pb-3 px-2 card-mobile">
                        <div className="card card-body text-center shadow rounded-lg">
                            <p><i className="landing-fa fas fa-mobile-alt fa-3x"></i></p>
                            <h4 className="landing-text">Mobile Banking</h4>
                            <p className="landing-text">Lorem ipsum</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <div className="jumbotron landing-jumbo" >
                    <h1 className="font-weight-bold text-center pb-3">Open The Account's You Need</h1>
                    <h3 className="h5 text-center">Stay in control of <br />your finances any time.</h3>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Landing

