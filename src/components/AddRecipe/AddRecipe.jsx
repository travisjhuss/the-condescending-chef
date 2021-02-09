import { useEffect, useState } from 'react';
// mui
import {TextField, Button, IconButton, makeStyles} from '@material-ui/core';

import './AddRecipe.css';

const useStyles = makeStyles({
    input: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#94836d',
            },
            '&:hover fieldset': {
                borderColor: ' #ad4830',
                border:  '#a0432c 2px solid',
            }
        },
        backgroundColor: '#fff4dd',
        borderRadius: '6px',
    }
})

function AddRecipe() {

    const classes = useStyles();

    return (
        <div className="container add-recipe">
            <TextField
                variant="outlined"
                className={classes.input}
            >

            </TextField>
        </div>
    )
}

export default AddRecipe;