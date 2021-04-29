import Alert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';

// Alert shown when required fields are missing from recipe form
function AddFail({ handleFailClose }) {
  return (
    <Alert
      onClose={handleFailClose}
      severity="error"
      style={{ backgroundColor: '#fff4dd' }}
    >
      <Typography color="primary">Missing *required fields.</Typography>
    </Alert>
  );
}

export default AddFail;
