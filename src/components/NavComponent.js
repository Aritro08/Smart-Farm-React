import React, {useState, useEffect} from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavComponent = () => {

    const [path, setPath] = useState('/');

    useEffect(() => {
        setPath(window.location.pathname);
    }, [])

    return (
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav>
                        <Nav.Link className={path === '/' && 'active-link'} href='/'>Home</Nav.Link>
                        <Nav.Link className={path === '/predict-crop' && 'active-link'} href='/predict-crop'>Crop</Nav.Link>
                        <Nav.Link className={path === '/predict-fertilizer' && 'active-link'} href='/predict-fertilizer'>Fertilizer</Nav.Link>
                        <Nav.Link className={path === '/detect-disease' && 'active-link'} href='/detect-disease'>Disease</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
} 

export default NavComponent;