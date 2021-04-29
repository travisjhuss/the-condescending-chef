import { loginMessage, registrationMessage } from '../errors.reducer';

const initialState = '';

describe('Testing error messaging for login', () => {
  test('LOGIN_INPUT_ERROR', () => {
    const action = {
      type: 'LOGIN_INPUT_ERROR',
    };
    expect(loginMessage(initialState, action)).toEqual('Enter your username and password!');
  });

  test('LOGIN_FAILED', () => {
    const action = {
      type: 'LOGIN_FAILED',
    };
    expect(loginMessage(initialState, action)).toEqual(`Oops! The username and password didn't match. Try again!`);
  });

  test('LOGIN_FAILED_NO_CODE', () => {
    const action = {
      type: 'LOGIN_FAILED_NO_CODE',
    };
    expect(loginMessage(initialState, action)).toEqual(`Oops! Something went wrong! Is the server running?`);
  });

  test('CLEAR_LOGIN_ERROR', () => {
    const action = {
      type: 'CLEAR_LOGIN_ERROR',
    };
    expect(loginMessage(initialState, action)).toEqual('');
  });
});

describe('Testing error messaging for registration', () => {
   test('CLEAR_REGISTRATION_ERROR', () => {
      const action = {
        type: 'CLEAR_REGISTRATION_ERROR',
      };
      expect(registrationMessage(initialState, action)).toEqual('');
    });
  
    test('REGISTRATION_INPUT_ERROR', () => {
      const action = {
        type: 'REGISTRATION_INPUT_ERROR',
      };
      expect(registrationMessage(initialState, action)).toEqual('Choose a username and password!');
    });
  
    test('REGISTRATION_FAILED', () => {
      const action = {
        type: 'REGISTRATION_FAILED',
      };
      expect(registrationMessage(initialState, action)).toEqual("Oops! That didn't work. The username might already be taken. Try again!");
    });
  });
