import React from 'react';
import '../../App.css';

class Footer extends React.Component {

    render() {
        return (
            <footer className="page-footer font-small bg-dark text-light pt-5">
                <div className="footer-copyright text-center py-3">© 2021 Copyright: <a href="https://www.meritamerica.org/">Merit Bank</a>
                </div>
            </footer>
        );
    }
}

export default Footer;
