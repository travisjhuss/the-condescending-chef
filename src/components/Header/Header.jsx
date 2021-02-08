import Nav from '../Nav/Nav';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css';

function Header() {

    const user = useSelector((store) => store.user);

    // state for drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <AppBar position="fixed" id="header" color="secondary">
            <Toolbar>
                <IconButton onClick={() => toggleDrawer()} color="primary">
                    <MenuIcon />
                </IconButton>
                <Typography
                    id="header-title"
                    variant="h4"
                    color="primary"
                >
                    The Condescending Chef
                </Typography>
            </Toolbar>

            <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer()}>
                <Nav />
            </Drawer>
        </AppBar>
    )
}

export default Header;