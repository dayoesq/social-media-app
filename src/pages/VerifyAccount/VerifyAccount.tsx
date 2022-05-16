import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/form-elements/Button/Button';
import { useHttpClient } from '../../hooks/http';

import classes from './VerifyAccount.module.scss';
import Alert from '../../components/shared/UI/Alert/Alert';
import { useForm } from '../../hooks/form';
import { Input } from '../../components/shared/form-elements/Input/Input';
import { isEmail, isRequired } from '../../utils/validators';

const VerifyAccount: React.FC = () => {
    const [alert, setAlert] = useState<boolean>(false);
    const { error, isLoading, sendRequest } = useHttpClient();

    const history = useNavigate();

    const [formState, inputHandler] = useForm<{
        email: {
            value: string;
            isValid: boolean;
        };
        verifyEmailToken: {
            value: string;
            isValid: boolean;
        };
    }>(
        {
            email: {
                value: '',
                isValid: false,
            },
            verifyEmailToken: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await sendRequest<ResponseDataUser>(
                `${process.env.REACT_APP_BACK_URL}/users/verify-email`,
                'POST',
                JSON.stringify({
                    email: formState.inputs?.email.value,
                    verifyEmailToken: formState.inputs?.verifyEmailToken.value,
                }),
                { 'Content-Type': 'application/json' }
            );
            if (res.status === 'success') {
                setAlert(true);
                setTimeout(() => {
                    history('/login');
                }, 1000);
            }
        } catch (err) {}
    };

    return (
        <React.Fragment>
            <div className={classes.verifyPage}>
                <div className={classes.verify}>
                    <div className={classes.verifyContent}>
                        {alert && (
                            <Alert success>Account verified successfully</Alert>
                        )}
                        {error && error.length > 0 && (
                            <Alert danger>{error}</Alert>
                        )}
                        <h2>verify account</h2>
                        <form
                            className={classes.verifyForm}
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
                                validators={[isEmail()]}
                                className={classes.verifyInput}
                            />
                            <Input
                                element='input'
                                id='verifyEmailToken'
                                type='password'
                                label='Token'
                                placeholder='Enter token'
                                onInput={inputHandler}
                                errorText='Please enter a valid token'
                                validators={[isRequired()]}
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
