import { useState } from 'react';
import AddUserRecipe from '../AddUserRecipe/AddUserRecipe';
import AddOutsideRecipe from '../AddOutsideRecipe/AddOutsideRecipe';
// mui
import { Button, Typography } from '@material-ui/core';

import './AddRecipe.css';

function AddRecipe() {
    // states to determine what recipe form to show
    const [isUserRecipe, setIsUserRecipe] = useState(false);
    const [isOutsideRecipe, setIsOutsideRecipe] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const clickUserRecipeForm = () => {
        setIsFormOpen(true);
        setIsUserRecipe(true);
        setIsOutsideRecipe(false);
    };

    const clickOutsideRecipeForm = () => {
        setIsFormOpen(true);
        setIsUserRecipe(false);
        setIsOutsideRecipe(true);
    };

    const changeForms = () => {
        setIsFormOpen(false);
        setIsUserRecipe(false);
        setIsOutsideRecipe(false);
    }

    return (
        <div className="add-recipe-container">
            <center>
                {isFormOpen
                    ? 
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={changeForms}
                    >
                        <Typography
                                variant="h6"
                                color="secondary"
                        >Change Form</Typography>
                    </Button>
                    :
                    <>
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
                        <Typography
                            color="secondary"
                            display="inline"
                        >
                            {' '}Or{' '}
                        </Typography>
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
                    </>
                }
            </center>
            {isUserRecipe ? <AddUserRecipe /> : null}
            {isOutsideRecipe ? <AddOutsideRecipe /> : null}
        </div>
    )
}

export default AddRecipe;