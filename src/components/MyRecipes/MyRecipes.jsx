import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// MUI
import { Button, Typography } from '@material-ui/core';
import './MyRecipes.css';

function MyRecipes() {

    const history = useHistory();
    const dispatch = useDispatch();
    const userRecipes = useSelector(store => store.userRecipes);

    useEffect(() => {
        dispatch({ type: 'FETCH_MY_RECIPES' });
        // dispatch({type: 'CLEAR_SEARCH'});
    }, []);

    console.log('userRecipes:', userRecipes);
    return(
        <div className="test">
            <Typography variant="h1" color="secondary">In MyRecipes</Typography>
        </div>
    )
}

export default MyRecipes;