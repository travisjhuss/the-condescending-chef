import Nav from '../Nav/Nav';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, IconButton, Drawer, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';

function Header() {
    return (
            <Drawer anchor="left" variant="permanent" open={true}>
                <Nav />
            </Drawer>
    )
}

export default Header;