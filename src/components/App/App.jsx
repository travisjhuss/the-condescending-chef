import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AddRecipe from '../AddRecipe/AddRecipe';
import AboutPage from '../AboutPage/AboutPage';
import UserDashboard from '../UserDashboard/UserDashboard';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Nav from '../Nav/Nav';
import MyRecipes from '../MyRecipes/MyRecipes';
import RecipeDetail from '../RecipeDetail/RecipeDetail';
import EditRecipe from '../EditRecipe/EditRecipe';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AdminFeedbackPage from '../AdminFeedbackPage/AdminFeedbackPage';
import { useSelector } from 'react-redux';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';

// const font = "'Fraunces', serif;"
const font = "'Josefin Slab', serif;"

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  },
  palette: {
    primary: {
      main: '#ad4830'
    },
    secondary: {
      main: '#fff4dd'
    }
  },
})

function App() {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {user.id && <Nav />}
        <div>

          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserDashboard />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/user"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/user"
            >
              <RegisterPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/user"
            >
              <LandingPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows AddRecipe else shows LoginPage
              exact
              path="/addRecipe"
            >
              <AddRecipe />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows MyRecipes else shows LoginPage
              exact
              path="/myRecipes"
            >
              <MyRecipes />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows RecipeDetails else shows LoginPage
              exact
              path="/recipeDetails/:id"
            >
              <RecipeDetail />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows EditRecipe else shows LoginPage
              exact
              path="/editRecipe/:id"
            >
              <EditRecipe />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows AdminDashboard else shows LoginPage
              exact
              path="/admin"
            >
              <AdminDashboard />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows AdminFeedbackPage else shows LoginPage
              exact
              path="/admin/feedback/:id"
            >
              <AdminFeedbackPage />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
