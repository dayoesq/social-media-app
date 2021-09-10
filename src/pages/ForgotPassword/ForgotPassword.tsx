import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/shared/form-elements/Button/Button';

import Input from '../../components/shared/form-elements/Input/Input';
import { useForm } from '../../hooks/form';
import { VALIDATOR_EMAIL } from '../../utils/validators';
import { useHttpClient } from '../../hooks/http';

import classes from './ForgotPassword.module.scss';
import Alert from '../../components/shared/UI/Alert/Alert';

const ForgotPassword: React.FC = () => {
  const [alert, setAlert] = useState<boolean>(false);
  const { error, isLoading, sendRequest } = useHttpClient();

  const history = useHistory();

  const [formState, inputHandler] = useForm<{
        email: {
            value: string
            isValid: boolean
        }
    }>(
      {
        email: {
          value: '',
          isValid: false
        }
      },
      false
    );

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await sendRequest<ResponseDataUser>(
        `${process.env.REACT_APP_BACK_URL}/users/password-change-request`,
        'POST',
        JSON.stringify({
          email: formState.inputs?.email.value
        }),
        { 'Content-Type': 'application/json' }
      );
      if (res.status === 'success') {
        setAlert(true);
        setTimeout(() => {
          history.replace('/login');
        }, 1000);
      }
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <div className={classes.passwordChangeRequestPage}>
        <div className={classes.passwordChangeRequest}>
          <div className={classes.passwordChangeRequestContent}>
            {alert && (
              <Alert success>A link has been sent to your email</Alert>
            )}
            {error && error.length > 0 && (
              <Alert danger>{error}</Alert>
            )}
            <h2>Change Password Request</h2>
            <form
              className={classes.passwordChangeRequestForm}
              onSubmit={submitHandler}
            >
              <Input
                element='input'
                id='email'
                type='email'
                label='Email'
                placeholder='Enter email'
                onInput={inputHandler}
                errorText='Please provide a valid email'
                validators={[VALIDATOR_EMAIL()]}
                className={classes.passwordChangeRequestInput}
              />
              <div className={classes.passwordChangeRequestFormWrapper}>
                <Button
                  type='submit'
                  disabled={!formState.isValid}
                  primary
                  small
                  pillSmall
                >
                  {!isLoading ? 'Submit' : 'Sending...'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
