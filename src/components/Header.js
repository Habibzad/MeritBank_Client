import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container } from 'react-bootstrap'
function Header() {
    return (
        <Navbar bg="info">
            <Container>
                <img src="/images/logo.png" height="35" alt="logo" />
                <Navbar.Brand href="#home">Merit Bank</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header
