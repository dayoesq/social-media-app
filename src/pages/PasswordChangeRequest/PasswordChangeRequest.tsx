import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/shared/form-elements/Button/Button';
import { useHttpClient } from '../../hooks/http';
import Alert from '../../components/shared/UI/Alert/Alert';

import classes from './PasswordChangeRequest.module.scss';
import { useForm } from '../../hooks/form';
import { Input } from '../../components/shared/form-elements/Input/Input';
import { isEmail } from '../../utils/validators';
import { BASE_URL } from '../../utils/constants';

const PasswordChangeRequest: React.FC = () => {
    const [alert, setAlert] = useState<boolean>(false);
    const { error, isLoading, sendRequest } = useHttpClient();

    const navigate = useNavigate();

    const [formState, inputHandler] = useForm<{
        email: {
            value: string;
            isValid: boolean;
        };
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
                `${BASE_URL}/users/password-change-request`,
                'POST',
                JSON.stringify({
                    email: formState.inputs?.email.value
                }),
                { 'Content-Type': 'application/json' }
            );
            if (res.status === 'success') {
                setAlert(true);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        } catch (err) {}
    };

    return (
        <>
            <div className={classes.passwordChangeRequestPage}>
                <div className={classes.passwordChangeRequest}>
                    <div className={classes.passwordChangeRequestContent}>
                        {alert && (
                            <Alert success>
                                A link has been sent to your email
                            </Alert>
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
                                validators={[isEmail()]}
                                className={classes.passwordChangeRequestInput}
                            />
                            <div
                                className={
                                    classes.passwordChangeRequestFormWrapper
                                }
                            >
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
        </>
    );
};

export default PasswordChangeRequest;
