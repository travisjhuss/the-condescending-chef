import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DialogActions, DialogTitle, Button } from '@material-ui/core';

function AddSuccess() {

    const history = useHistory();

    const addAnother = () => {
        history.push('/addRecipe')
    }

    const goHome = () => {
        history.push('/user')
    }

    return (
        <div style={{backgroundColor: '#fff4dd'}}>
            <DialogTitle style={{color: '#ad4830'}}>Recipe Added!</DialogTitle>
            <DialogActions>
                <Button onClick={addAnother} color="primary">
                    Add Another
                </Button>
                <Button onClick={goHome} color="primary" autoFocus>
                    Go Home
                </Button>
            </DialogActions>
        </div>
    )
};
export default AddSuccess;


