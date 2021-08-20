import React from 'react'
// import { Link } from 'react-router-dom'
import Button from '../../components/shared/form-elements/Button/Button'

import Input from '../../components/shared/form-elements/Input/Input'
import { useForm } from '../../hooks/form'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from '../../utils/validators'
import { useHttpClient } from '../../hooks/http';

import classes from './VerifyAccount.module.scss'

const VerifyAccount: React.FC = () => {
  const { error, isLoading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm<{
    email: {
      value: string
      isValid: boolean
    }
    verifyEmailToken: {
      value: string
      isValid: boolean
    }
  }>(
    {
      email: {
        value: '',
        isValid: false
      },
      verifyEmailToken: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const authSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await sendRequest<ResponseDataUser>(
      `${process.env.REACT_APP_BACK_URL}/users/signup`,
      'POST',
      JSON.stringify({
        email: formState.inputs?.email.value,
        verifyEmailToken: formState.inputs?.verifyEmailToken.value
      }),
      { 'Content-Type': 'application/json' }
    );
    console.log(res.data);

  };

  return (
    <React.Fragment>
      <div className={classes.verifyPage}>
        <div className={classes.verify}>
          <div className={classes.verifyContent}>
            <h2>verify account</h2>
            {error && error.length > 0 && <p style={{color: 'red'}}>{error}</p>}
            <form
              className={classes.verifyForm}
              onSubmit={authSubmitHandler}
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
                className={classes.verifyInput}
              />
              <Input
                element='input'
                id='verifyEmailToken'
                type='password'
                label='Token'
                placeholder='Enter token'
                onInput={inputHandler}
                errorText="Please enter a valid token"
                validators={[
                  VALIDATOR_REQUIRE()
                ]}
                className={classes.verifyInput}
              />
              <div className={classes.verifyFormWrapper}>
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

export default VerifyAccount;

