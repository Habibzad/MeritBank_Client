import React from 'react';
import '../../App.css';

function Footer() {
    return (
        <div>
            <footer className="page-footer font-small bg-dark text-light pt-5">
                <div className="footer-copyright text-center py-3">© 2021 Copyright: <a href="https://www.meritamerica.org/">Merit Bank</a>
                </div>
                <div>
                    <ul className="nav ml-auto nav-flex-icons">
                        <li className="nav-item">
                            <a className="" href="https://www.meritamerica.org/">

                                <i class="grey-text fab fa-facebook-square fa-2x"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="" href="https://www.meritamerica.org/">
                                <i className="grey-text fab fa-instagram fa-2x"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link waves-effect waves-light" href="https://www.meritamerica.org/"><i className="grey-text fab fa-twitter fa-2x"></i></a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer

