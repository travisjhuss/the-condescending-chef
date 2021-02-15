import { useHistory } from 'react-router-dom';

import { DialogActions, DialogTitle, Button } from '@material-ui/core';

function EditSuccess() {

    const history = useHistory();

    const goToRecipes = () => {
        history.push('/myRecipes')
    }

    return (
        <div style={{backgroundColor: '#fff4dd'}}>
            <DialogTitle style={{color: '#ad4830'}}>Edit Success!</DialogTitle>
            <DialogActions>
                <Button onClick={goToRecipes} color="primary">
                    MyRecipes
                </Button>
            </DialogActions>
        </div>
    )
};
export default EditSuccess;
