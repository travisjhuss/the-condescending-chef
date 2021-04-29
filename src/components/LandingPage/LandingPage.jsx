import './LandingPage.css';

// Material UI imports
import { Typography } from '@material-ui/core';
import LocalDiningIcon from '@material-ui/icons/LocalDining';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
// custom hook
import useStyles from '../../hooks/useStyles';

function LandingPage() {
  const classes = useStyles();

  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_2"></div>
        <div className="grid-col grid-col_8">
          <Typography variant="h4" color="secondary">
            Welcome to{' '}
          </Typography>
          <Typography variant="h3" color="secondary">
            The Condescending Chef <LocalDiningIcon className={classes.logo} />
          </Typography>
          <br />
          <Typography variant="body1" color="secondary">
            Think of it as your own personal Gordon Ramsey. An online community
            and database of recipes reviewed by real chefs giving you the
            feedback you seek.
          </Typography>
          <br />
          <Typography variant="body1" color="secondary">
            Drawing from decades of real restaurant experience, our chefs will
            take the time to dig through the recipe and give feedback. Feedback
            can include not just a review of a given recipe but also tips to
            make it better or certain substitutions to consider. With the "The
            Condescending Chef" you'll get the hard truth and come out a better
            cook able to tackle any challenge in your kitchen.
          </Typography>
          <hr className="line-break" />
        </div>
        <div className="grid-col grid-col_2"></div>
        <div className="grid-col grid-col_2"></div>
        <div className="grid-col grid-col_4">
          <center>
            <Typography variant="h5" color="secondary">
              Already a member?
            </Typography>
            <LoginForm />
          </center>
        </div>
        <div className="grid-col grid-col_4">
          <center>
            <Typography variant="h5" color="secondary">
              New here?
            </Typography>
            <RegisterForm />
          </center>
        </div>
        <div className="grid-col grid-col_2"></div>
      </div>
    </div>
  );
}

export default LandingPage;
