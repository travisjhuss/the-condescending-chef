import { useEffect, useState } from 'react';
import AddUserRecipe from '../AddUserRecipe/AddUserRecipe';
import AddOutsideRecipe from '../AddOutsideRecipe/AddOutsideRecipe';
// mui
import { Button, makeStyles, Typography } from '@material-ui/core';

import './AddRecipe.css';

function AddRecipe() {
    // states to determine what recipe form to show
    const [isUserRecipe, setIsUserRecipe] = useState(false);
    const [isOutsideRecipe, setIsOutsideRecipe] = useState(false);

    const clickUserRecipeForm = () => {
        console.log('clicked User recipe');
        setIsUserRecipe(true);
        setIsOutsideRecipe(false);
    };

    const clickOutsideRecipeForm = () => {
        console.log('clicked outside recipe');
        setIsUserRecipe(false);
        setIsOutsideRecipe(true);
    };

    return (
        <div className="add-recipe-container">
            <center>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={clickUserRecipeForm}
                >
                    <Typography
                        variant="h6"
                        color="secondary"
                    >Add your own recipe</Typography>
                </Button>
                {' '}
                <Typography
                    color="secondary"
                    display="inline"
                >
                    Or
                </Typography>
                {' '}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={clickOutsideRecipeForm}
                >
                    <Typography
                        variant="h6"
                        color="secondary"
                    >
                        Add an outside recipe</Typography>
                </Button>
            </center>
            {isUserRecipe ? <AddUserRecipe /> : null}
            {isOutsideRecipe ? <AddOutsideRecipe /> : null}
        </div>
    )
}

export default AddRecipe;