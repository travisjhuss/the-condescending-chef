import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
// MUI
import { Typography, Button } from '@material-ui/core';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="container">
      <center style={{ marginTop: '100px', marginBottom: '50px' }}>
        <RegisterForm />

        <Button
          color="secondary"
          onClick={() => {
            history.push('/login');
          }}
        >
          <Typography variant="subtitle2">Login</Typography>
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
