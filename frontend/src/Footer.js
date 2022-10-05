import React from 'react';

const Footer = () => {
    const footerStyle = {
        position: 'fixed',
        width: '100%',
        left: 0,
        bottom: 0,
        margin: 0,
    };
    return (
        <p className='text-center bg-dark text-light p-2' style={footerStyle}>
            All rights reserved &copy; HX-BANK-2022
        </p>
    );
};

export default Footer;
