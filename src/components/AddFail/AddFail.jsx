import Alert from '@material-ui/lab/Alert';
import {Typography} from '@material-ui/core';

function AddFail({handleFailClose}) {
    return(
        <Alert
            onClose={handleFailClose}
            severity="error"
            style={{backgroundColor: '#fff4dd'}}
        >
            <Typography color="primary">Missing *required fields.</Typography>
        </Alert>
    )
}

export default AddFail;