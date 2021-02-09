import { useEffect, useState } from 'react';
import AddUserRecipe from '../AddUserRecipe/AddUserRecipe';
import AddOutsideRecipe from '../AddOutsideRecipe/AddOutsideRecipe';
// mui
import { Dialog, Button, IconButton, makeStyles, Typography } from '@material-ui/core';

import './AddRecipe.css';

const useStyles = makeStyles({
    input: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#94836d',
            },
            '&:hover fieldset': {
                borderColor: ' #ad4830',
                border: '#a0432c 3px solid',
            }
        },
        backgroundColor: '#fff4dd',
        borderRadius: '3px',
    }
})

function AddRecipe() {
    // states to determine what recipe form to show
    const [isUserRecipe, setIsUserRecipe] = useState(false);
    const [isOutsideRecipe, setIsOutsideRecipe] = useState(false);

    // toggle based on choose
    // form responds based on that
    // pop up dialog?

    const classes = useStyles();

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
                {isUserRecipe ? <AddUserRecipe/> : null}
                {isOutsideRecipe? <AddOutsideRecipe/> : null}

            </center>
        </div>
    )
}

export default AddRecipe;