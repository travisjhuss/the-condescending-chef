import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Typography, Button, makeStyles, Drawer } from '@material-ui/core';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles({
  button: {
    textTransform: 'none',
  },
  logo: {
    color: '#94836d',
    fontSize: '150px',
    position: 'absolute',
    marginLeft: '-70px',
    marginTop: '-29px'
  },
})

function Nav() {
  const user = useSelector((store) => store.user);

  const history = useHistory();
  const classes = useStyles();

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <Drawer anchor="left" variant="permanent" open={true}>
      <div className="drawer">
        <div className="drawer-top">
          <center>
            <div className="logo">
              <LocalDiningIcon className={classes.logo} />
            </div>
            <div className="title">
              <Typography color="secondary" variant="h6">The</Typography>
              <Typography color="secondary" variant="h4">Condescending</Typography>
              <Typography color="secondary" variant="h6">Chef</Typography>
            </div>
          </center>
        </div>
        <center className="links">
          <Typography color="primary" variant="subtitle1">Chef {user.username}</Typography>
          <Button
            style={{marginTop: '20px'}}
            color="primary"
            className={classes.button}
            startIcon={<HomeIcon />}
            onClick={() => history.push('/user')}
          >
            <Typography color="primary" variant="body1">Dashboard</Typography>
          </Button>
          <br />
          <Button
            color="primary"
            className={classes.button}
            startIcon={<MenuBookIcon />}
            onClick={() => history.push('/myRecipes')}
          >
            <Typography color="primary" variant="body1">My Recipes</Typography>
          </Button>
          <br />
          <Button
            color="primary"
            className={classes.button}
            startIcon={<AddToPhotosIcon />}
            onClick={() => history.push('/addRecipe')}
          >
            <Typography color="primary" variant="body1">Add Recipe</Typography>
          </Button>
          <br />
          <Button
            color="primary"
            className={classes.button}
            startIcon={<SearchIcon />}
            onClick={() => history.push('/search')}
          >
            <Typography color="primary" variant="body1">Search</Typography>
          </Button>
          <br />
          <Button
            color="primary"
            className={classes.button}
            startIcon={<InfoIcon />}
            onClick={() => history.push('/about')}
          >
            <Typography color="primary" variant="body1">About the App</Typography>
          </Button>
          <br />
          <Button
            color="primary"
            className={classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={() => dispatch({ type: 'LOGOUT' })}
          >
            <Typography color="primary" variant="body1">Logout</Typography>
          </Button>
        </center>
      </div>
    </Drawer >
  );
}

export default Nav;
