import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Footer from '../Footer/Footer';
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
              <Typography color="secondary" variant="h6" style={{fontWeight: '500'}}>The</Typography>
              <Typography color="secondary" variant="h4" style={{fontWeight: '500'}}>Condescending</Typography>
              <Typography color="secondary" variant="h6" style={{fontWeight: '500'}}>Chef</Typography>
            </div>
          </center>
        </div>
        <center className="links">
          <Typography color="secondary" variant="h6">Chef {user.username}</Typography>
          <Button
            style={{marginTop: '20px'}}
            color="secondary"
            className={classes.button}
            startIcon={<HomeIcon />}
            onClick={() => history.push('/user')}
          >
            <Typography color="secondary" variant="h6">Dashboard</Typography>
          </Button>
          <br />
          <Button
            style={{marginTop: '10px'}}
            color="secondary"
            className={classes.button}
            startIcon={<MenuBookIcon />}
            onClick={() => history.push('/myRecipes')}
          >
            <Typography color="secondary" variant="h6">My Recipes</Typography>
          </Button>
          <br />
          <Button
            style={{marginTop: '10px'}}
            color="secondary"
            className={classes.button}
            startIcon={<AddToPhotosIcon />}
            onClick={() => history.push('/addRecipe')}
          >
            <Typography color="secondary" variant="h6">Add Recipe</Typography>
          </Button>
          <br />
          <Button
            style={{marginTop: '10px'}}
            color="secondary"
            className={classes.button}
            startIcon={<SearchIcon />}
            onClick={() => history.push('/search')}
          >
            <Typography color="secondary" variant="h6">Search</Typography>
          </Button>
          <br />
          <Button
            style={{marginTop: '10px'}}
            color="secondary"
            className={classes.button}
            startIcon={<InfoIcon />}
            onClick={() => history.push('/about')}
          >
            <Typography color="secondary" variant="h6">About the App</Typography>
          </Button>
          <br />
          <Button
            style={{marginTop: '10px'}}
            color="secondary"
            className={classes.button}
            startIcon={<ExitToAppIcon />}
            onClick={() => dispatch({ type: 'LOGOUT' })}
          >
            <Typography color="secondary" variant="h6">Logout</Typography>
          </Button>
          <Footer />
        </center>
      </div>
    </Drawer >
  );
}

export default Nav;
