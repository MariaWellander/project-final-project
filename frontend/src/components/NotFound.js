import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Img } from './GlobalStyles';
import logo from 'images/logo.png';

const NotFound = () => {
    return (
    <>
        <header>
            <Img src={logo} alt="logo" />
            <Button>
            <Link to="/login">Go to Login</Link>
            </Button>
        </header>
        <h2>Not Found...</h2>
    </>
    )
}

export default NotFound;