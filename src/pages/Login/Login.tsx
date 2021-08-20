import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/shared/form-elements/Button/Button';

import Input from '../../components/shared/form-elements/Input/Input';
import { useForm } from '../../hooks/form';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_MINLENGTH
} from '../../utils/validators';
import { useHttpClient } from '../../hooks/http';
// import { useAuth } from '../../hooks/auth';

import classes from './Login.module.scss';
import Alert from '../../components/shared/UI/Alert/Alert';
import { AuthContext } from '../../store/context';

const Login: React.FC = () => {
    const [alert, setAlert] = useState<boolean>(false);
    const { error, isLoading, sendRequest } = useHttpClient();
    // const { token, login, user } = useAuth();
    // const history = useHistory();
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
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            }
        },
        false
    );

    const authSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await sendRequest<ResponseContext>(
            `${process.env.REACT_APP_BACK_URL}/users/login`,
            'POST',
            JSON.stringify({
                email: formState.inputs?.email.value,
                password: formState.inputs?.password.value
            }),
            { 'Content-Type': 'application/json' }
        )
        setAlert(true);
        authCtx.login(res.data.token, res.data.user);
    };

    return (
        <React.Fragment>
            <div className={classes.loginPage}>
                <div className={classes.login}>
                    <div className={classes.loginContent}>
                        <h2>Log in</h2>
                        {alert && <Alert success>Login successfull</Alert>}
                        {error && error.length > 0 && <Alert danger>{error}</Alert>}
                        <form
                            className={classes.loginForm}
                            onSubmit={authSubmitHandler}
                        >
                            <Input
                                element="input"
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="Enter email"
                                onInput={inputHandler}
                                errorText="Please provide a valid email"
                                validators={[VALIDATOR_EMAIL()]}
                                className={classes.loginInput}
                            />
                            <Input
                                element="input"
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Enter password"
                                onInput={inputHandler}
                                errorText="Password's length between 6 and 100"
                                validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(100)]}
                                className={classes.loginInput}
                            />
                            <div className={classes.loginFormWrapper}>
                                <Button
                                    type="submit"
                                    disabled={!formState.isValid}
                                    primary
                                    small
                                    pillSmall
                                >{!isLoading ? 'Log in' : 'Loging in...'}
                                </Button>
                                <Link to="/forgetPassword">
                                    Forget password?
                                </Link>
                            </div>
                        </form>
                    </div>
                    <footer className={classes.loginFooter}>
                        <p>
                            New to Utteran?
                            <Link to="/register">Sign up now</Link>
                        </p>
                        <p>
                            Already using Utteran?
                            <Link to="/activate">Verify your account</Link>
                        </p>
                    </footer>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;


