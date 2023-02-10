import { FC, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/shared/form-elements/Button/Button';
import { useHttpClient } from '../../hooks/http';
import classes from './Login.module.scss';
import Alert from '../../components/shared/UI/Alert/Alert';
import { AuthContext } from '../../store/context';
import { useForm } from '../../hooks/form';
import { Input } from '../../components/shared/form-elements/Input/Input';
import { isEmail, maxLength, minLength } from '../../utils/validators';
import { BASE_URL } from '../../utils/constants';

const Login: FC = () => {
    const [alert, setAlert] = useState<boolean>(false);
    const { error, isLoading, sendRequest } = useHttpClient();
    const authCtx = useContext(AuthContext);

    const [formState, inputHandler] = useForm<{
        email: {
            value: string;
            isValid: boolean;
        };
        password: {
            value: string;
            isValid: boolean;
        };
    }>(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const authLoginHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await sendRequest<ResponseContext>(
                `${BASE_URL}/users/login`,
                'POST',
                JSON.stringify({
                    email: formState.inputs?.email.value,
                    password: formState.inputs?.password.value
                }),
                { 'Content-Type': 'application/json' }
            );
            if (res.status === 'success') {
                setAlert(true);
                authCtx.login(
                    res.data.token,
                    res.data.user,
                    new Date(new Date().getTime() + 86400000)
                );
            }
        } catch (err) {}
    };

    return (
        <>
            <div className={classes.loginPage}>
                <div className={classes.login}>
                    <div className={classes.loginContent}>
                        {alert && <Alert success>Login successfull</Alert>}
                        {error && error.length > 0 && (
                            <Alert danger>{error}</Alert>
                        )}
                        <h2>Log in</h2>
                        <form
                            className={classes.loginForm}
                            onSubmit={authLoginHandler}
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
                                className={classes.loginInput}
                            />
                            <Input
                                element='input'
                                id='password'
                                type='password'
                                label='Password'
                                placeholder='Enter password'
                                onInput={inputHandler}
                                errorText="Password's length between 6 and 100"
                                validators={[minLength(6), maxLength(100)]}
                                className={classes.loginInput}
                            />
                            <div className={classes.loginFormWrapper}>
                                <Button
                                    type='submit'
                                    disabled={!formState.isValid}
                                    primary
                                    small
                                    pillSmall
                                >
                                    {!isLoading ? 'Log in' : 'Loging in...'}
                                </Button>
                                <Link to='/password-change-request'>
                                    Forget password?
                                </Link>
                            </div>
                        </form>
                    </div>
                    <footer className={classes.loginFooter}>
                        <p>
                            New to Utteran?
                            <Link to='/register'>Sign up now</Link>
                        </p>
                        <p>
                            Already using Utteran?
                            <Link to='/verify-account'>
                                Verify your account
                            </Link>
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Login;
