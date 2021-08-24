import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useForm } from '../../hooks/form';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD_CONFIRM
} from '../../utils/validators';
import Input from '../../components/shared/form-elements/Input/Input';
import Button from '../../components/shared/form-elements/Button/Button';
import { useHttpClient } from '../../hooks/http';
import Alert from '../../components/shared/UI/Alert/Alert';

import classes from './Register.module.scss';

const Register: React.FC = () => {
  const [alert, setAlert] = useState<boolean>(false);
  const { error, sendRequest } = useHttpClient();

  const history = useHistory();
  const [formState, inputHandler] = useForm<{
        firstName: {
            value: string;
            isValid: boolean;
        };
        lastName: {
            value: string;
            isValid: boolean;
        };
        email: {
            value: string;
            isValid: boolean;
        };
        password: {
            value: string;
            isValid: boolean;
        };
        passwordConfirm: {
            value: string;
            isValid: boolean;
        };
    }>(
      {
        firstName: {
          value: '',
          isValid: false
        },
        lastName: {
          value: '',
          isValid: false
        },
        email: {
          value: '',
          isValid: false
        },
        password: {
          value: '',
          isValid: false
        },
        passwordConfirm: {
          value: '',
          isValid: false
        }
      },
      false
    );

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await sendRequest<ResponseDataUser>(
        `${process.env.REACT_APP_BACK_URL}/users/signup`,
        'POST',
        JSON.stringify({
          firstName: formState.inputs?.firstName.value,
          lastName: formState.inputs?.lastName.value,
          email: formState.inputs?.email.value,
          password: formState.inputs?.password.value,
          passwordConfirm: formState.inputs?.passwordConfirm.value
        }),
        { 'Content-Type': 'application/json' }
      );

      if (res.status === 'success') {
        setAlert(true);
        setTimeout(() => {
          history.replace('/verify-account');
        }, 1000);
      }
    } catch (err) { }
        
  };

  return (
    <React.Fragment>
      <div className={classes.registerPage}>
        <div className={classes.register}>
          <div className={classes.registerContent}>
            {alert && <Alert success>Registeration successfull</Alert>}
            {error && error.length > 0 && <Alert danger>{error}</Alert>}
            <h2>Sign up</h2>
            <form
              className={classes.registerForm}
              onSubmit={registerHandler}
            >
              <div className={classes.registerInputWrapper}>
                <Input
                  element='input'
                  id='firstName'
                  label='Firstname'
                  type='text'
                  placeholder='Firstname'
                  onInput={inputHandler}
                  errorText='Name must be between 2 to 20 characters long'
                  validators={[
                    VALIDATOR_MINLENGTH(2),
                    VALIDATOR_MAXLENGTH(20)
                  ]}
                  className={classes.registerInput}
                  style={{ marginRight: '1rem' }}
                />
                <Input
                  element='input'
                  id='lastName'
                  label='Lastname'
                  type='text'
                  placeholder='Lastname'
                  onInput={inputHandler}
                  errorText='Name must be between 2 to 20 characters long'
                  validators={[
                    VALIDATOR_MINLENGTH(2),
                    VALIDATOR_MAXLENGTH(20)
                  ]}
                  className={classes.registerInput}
                />
              </div>
              <div style={{ paddingRight: '1rem' }}>
                <Input
                  element='input'
                  id='email'
                  label='Email'
                  type='email'
                  placeholder='Email'
                  onInput={inputHandler}
                  errorText='Please provide a valid email'
                  validators={[VALIDATOR_EMAIL()]}
                  className={classes.registerInput}
                  style={{ width: '100%' }}
                />
              </div>
              <div className={classes.registerInputWrapper}>
                <Input
                  element='input'
                  id='password'
                  label='Password'
                  placeholder='Password'
                  type='password'
                  onInput={inputHandler}
                  errorText="Password's length between 6 and 100"
                  validators={[
                    VALIDATOR_MINLENGTH(6),
                    VALIDATOR_MAXLENGTH(100)
                  ]}
                  className={classes.registerInput}
                  style={{ marginRight: '1rem' }}
                />

                <Input
                  element='input'
                  id='passwordConfirm'
                  label='Repeat Password'
                  placeholder='Repeat Password'
                  type='password'
                  onInput={inputHandler}
                  errorText="Passwords don't match"
                  validators={[
                    VALIDATOR_PASSWORD_CONFIRM(formState.inputs?.password.value)
                  ]}
                  className={classes.registerInput}
                />
                                    
              </div>
                    
              <Button
                type='submit'
                disabled={!formState.isValid}
                primary
                long
                pillLong
              >
                Sign up
              </Button>
            </form>
          </div>
          <footer className={classes.registerFooter}>
            <p>
                Already registered?
              <NavLink to='/login'>Log in</NavLink>
            </p>
            <p>By clicking the <strong>Sign up</strong> button, you are creating an account, and agree to Utteran&#39;s <NavLink to='#'><strong>Terms of Service</strong></NavLink> and <NavLink to='#'><strong>Privacy Policy</strong></NavLink></p>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
