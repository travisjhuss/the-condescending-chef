import { useEffect, useState } from 'react';
// mui
import {TextField, Button, IconButton, makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles({
    input: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#94836d',
            },
            '&:hover fieldset': {
                borderColor: ' #ad4830',
                border:  '#a0432c 3px solid',
            }
        },
        backgroundColor: '#fff4dd',
        borderRadius: '3px',
    }
})

function AddUserRecipe() {

    const classes = useStyles();

    return(
        <div className="container add-recipe">
            <Typography>Add Your Own</Typography>
            <TextField
                variant="filled"
                label="Recipe Name"
                className={classes.input}
            >

            </TextField>
        </div>
    )
}

export default AddUserRecipe;