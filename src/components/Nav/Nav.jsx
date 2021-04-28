import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../Footer/Footer';
import './Nav.css';
import {
  Typography,
  Button,
  makeStyles,
  Drawer,
  Divider,
} from '@material-ui/core';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
  },
  logo: {
    color: '#94836d',
    fontSize: '150px',
    position: 'absolute',
    marginLeft: '-70px',
    marginTop: '-29px',
  },
});

function Nav() {
  const user = useSelector((store) => store.user);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/home');
  };

  return (
    // switch to styled div
    <Drawer anchor="left" variant="permanent" open={true}>
      <div className="drawer">
        <div className="drawer-top">
          <center>
            <div className="logo">
              <LocalDiningIcon className={classes.logo} />
            </div>
            <div className="title">
              <Typography
                color="secondary"
                variant="h6"
                style={{ fontWeight: '500' }}
              >
                The
              </Typography>
              <Typography
                color="secondary"
                variant="h4"
                style={{ fontWeight: '500' }}
              >
                Condescending
              </Typography>
              <Typography
                color="secondary"
                variant="h6"
                style={{ fontWeight: '500' }}
              >
                Chef
              </Typography>
            </div>
          </center>
        </div>
        <center className="links">
          <Typography color="secondary" variant="h6">
            Welcome, Chef {user.username}
          </Typography>
          <hr></hr>
          <Button
            style={{ marginTop: '10px' }}
            color="secondary"
            className={classes.button}
            startIcon={<SearchIcon />}
            onClick={() => history.push('/search')}
          >
            <Typography color="secondary" variant="h6">
              Browse
            </Typography>
          </Button>
          <br />
          {!user.id ? (
            <>
              <Button
                style={{ marginTop: '10px' }}
                color="secondary"
                className={classes.button}
                startIcon={<LockOpenOutlinedIcon />}
                onClick={() => history.push('/login')}
              >
                <Typography color="secondary" variant="h6">
                  Login
                </Typography>
              </Button>
              <br/>
              <Button
                style={{ marginTop: '10px' }}
                color="secondary"
                className={classes.button}
                startIcon={<VpnKeyOutlinedIcon />}
                onClick={() => history.push('/registration')}
              >
                <Typography color="secondary" variant="h6">
                  Register
                </Typography>
              </Button>
            </>
          ) : (
            <>
              <Button
                style={{ marginTop: '10px' }}
                color="secondary"
                className={classes.button}
                startIcon={<HomeIcon />}
                onClick={() => history.push('/user')}
              >
                <Typography color="secondary" variant="h6">
                  Dashboard
                </Typography>
              </Button>
              <Button
                style={{ marginTop: '10px' }}
                color="secondary"
                className={classes.button}
                startIcon={<AccountBalanceIcon />}
                onClick={() => history.push('/hardTruth')}
              >
                <Typography color="secondary" variant="h6">
                  The Hard Truth
                </Typography>
              </Button>
              <br />
              <Button
                style={{ marginTop: '10px' }}
                color="secondary"
                className={classes.button}
                startIcon={<MenuBookIcon />}
                onClick={() => history.push('/myRecipes')}
              >
                <Typography color="secondary" variant="h6">
                  My Recipes
                </Typography>
              </Button>
              <br />
              <Button
                style={{ marginTop: '10px' }}
                color="secondary"
                className={classes.button}
                startIcon={<AddToPhotosIcon />}
                onClick={() => history.push('/addRecipe')}
              >
                <Typography color="secondary" variant="h6">
                  Add Recipe
                </Typography>
              </Button>
              <br />
              <Button
                style={{ marginTop: '10px' }}
                color="secondary"
                className={classes.button}
                startIcon={<ExitToAppIcon />}
                onClick={logout}
              >
                <Typography color="secondary" variant="h6">
                  Logout
                </Typography>
              </Button>
              <br />
            </>
          )}

          <br />
          <Button
            style={{ marginTop: '10px' }}
            color="secondary"
            className={classes.button}
            startIcon={<InfoIcon />}
            onClick={() => history.push('/about')}
          >
            <Typography color="secondary" variant="h6">
              About the App
            </Typography>
          </Button>
          <br />
          {user.access_level === 2 && (
            <Button
              style={{ marginTop: '10px' }}
              color="secondary"
              className={classes.button}
              startIcon={<RateReviewIcon />}
              onClick={() => history.push('/admin')}
            >
              <Typography color="secondary" variant="h6">
                Admin
              </Typography>
            </Button>
          )}

          <Footer />
        </center>
      </div>
    </Drawer>
  );
}

export default Nav;
