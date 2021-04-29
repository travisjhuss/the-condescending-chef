import { useState } from 'react';
import AddUserRecipe from '../AddUserRecipe/AddUserRecipe';
import AddOutsideRecipe from '../AddOutsideRecipe/AddOutsideRecipe';
// mui
import { Button, Typography } from '@material-ui/core';

function AddRecipe() {
    // states to determine what recipe form to show
    const [isUserRecipe, setIsUserRecipe] = useState(false);
    const [isOutsideRecipe, setIsOutsideRecipe] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    // function for determining which form is open and how to change
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
                {/* check if a form is already open */}
                {isFormOpen
                    ? 
                    // if form is open, show change form button
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
                    // otherwise show buttons to choose form
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