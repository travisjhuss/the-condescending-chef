import { useHistory } from 'react-router-dom';
// MUI
import { DialogActions, DialogTitle, Button } from '@material-ui/core';

// success message for when recipe added
function AddSuccess() {
  const history = useHistory();

  const addAnother = () => {
    history.push('/addRecipe');
  };

  const goHome = () => {
    history.push('/myRecipes');
  };

  return (
    <div style={{ backgroundColor: '#fff4dd' }}>
      <DialogTitle style={{ color: '#ad4830' }}>Recipe Added!</DialogTitle>
      <DialogActions>
        <Button onClick={addAnother} color="primary">
          Add Another
        </Button>
        <Button onClick={goHome} color="primary" autoFocus>
          View myRecipes
        </Button>
      </DialogActions>
    </div>
  );
}
export default AddSuccess;
