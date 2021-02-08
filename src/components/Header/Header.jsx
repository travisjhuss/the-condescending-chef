import { Typography, Button, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function Header({toggleDrawer}) {
    return (
        <Toolbar>
            <IconButton onClick={() => toggleDrawer()}>
                <MenuIcon />
            </IconButton>
        <p>This is the header</p>
        </Toolbar>
    )
}

export default Header;