import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import SubNav from '../../components/shared/UI/SubNav/SubNav';

import { useForm } from '../../hooks/form';
import { useHttpClient } from '../../hooks/http';

import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_EMAIL,
} from '../../utils/validators';

// import Input from '../../components/shared/form-elements/Input/Input';
import classes from './Login.module.scss';

const Login = () => {
    const { sendRequest, error } = useHttpClient();
    const history = useHistory();

    const authSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <React.Fragment>
            <div className="Login-Page">
                <SubNav className="Login-Page-Nav" />
                <div className="Login">
                    <div className="Login-Content">
                        <h2>Log in to Utteran</h2>
                        <form
                            className="Login-Form"
                            onSubmit={authSubmitHandler}
                        >
                            {error && (
                                <p style={{ color: 'red', fontSize: '1.3rem' }}>
                                    {error}
                                </p>
                            )}
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    value=""
                                    name="email"
                                    placeholder="Please enter email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    value=""
                                    name="email"
                                    placeholder="Please enter email"
                                />
                            </div>
                            <div className="Login-Form-Input-Wrapper">
                                <button type="submit">Sign in</button>
                                <Link to="/forgetPassword">
                                    Forget password?
                                </Link>
                            </div>
                        </form>
                    </div>
                    <footer className="Login-Footer">
                        <p>
                            New to RelatE?
                            <Link to="/register">Sign up now</Link>
                        </p>
                        <p>
                            Already using Utteran?
                            <Link to="/activate">Activate your account</Link>
                        </p>
                    </footer>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
