import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './HeaderStyle.css';
const Header = () => {
    const links = [
        { link: '/', to: 'Home' },
        { link: '/customers', to: 'customers' },
        { link: '/transactions', to: 'transactions' },
    ];
    return (
        <Container className='d-flex justify-content-center my-5'>
            <Navbar>
                <Nav className='me-auto'>
                    {links.map((nav) => (
                        <NavLink
                            end
                            to={nav.link}
                            className='mx-3 text-decoration-none'
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? '#000000' : '#5C5C5C',
                                };
                            }}
                        >
                            {nav.to}
                        </NavLink>
                    ))}
                </Nav>
            </Navbar>
        </Container>
    );
};

export default Header;
