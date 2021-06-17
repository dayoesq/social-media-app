import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faComment,
    faUserFriends,
    faDove
} from '@fortawesome/free-solid-svg-icons';

import BtnFat from '../../components/shared/form-elements/BtnFat/BtnFat';
import Button from '../../components/shared/form-elements/Button/Button';
import Input from '../../components/shared/form-elements/Input/Input';
import { useForm } from '../../hooks/form';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_MINLENGTH
} from '../../utils/validators';

import classes from './Landing.module.scss';
import style from './Footer.module.scss';

const Landing: React.FC = () => {
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
    const authSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={classes.landing}>
            <div className={classes.leftRightWrapper}>
                <div className={classes.left}>
                    <div className={classes.leftContent}>
                        <div>
                            <FontAwesomeIcon icon={faSearch} size="3x" />
                            <h3>Find your interests</h3>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUserFriends} size="3x" />
                            <h3>Explore what people are talking about</h3>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faComment} size="3x" />
                            <h3>Join the community</h3>
                        </div>
                    </div>
                </div>
                <div className={classes.right}>
                    <form className={classes.rightContentForm} onSubmit={authSubmitHandler}>
                        <div>
                            <Input
                                element="input"
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="Enter email"
                                onInput={inputHandler}
                                errorText="Please provide a valid email"
                                validators={[VALIDATOR_EMAIL()]}
                                className={classes.landingInput}
                            />
                        </div>
                        <div>
                            <Input
                                element="input"
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Enter password"
                                onInput={inputHandler}
                                errorText="Password's length between 6 and 100"
                                validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(100)]}
                                className={classes.landingInput}
                            />
                        </div>
                        <BtnFat type='submit' disabled={!formState.isValid}>Log in</BtnFat>
                    </form>
                    <div className={classes.middleContent}>
                        <FontAwesomeIcon
                            icon={faDove} size="3x"
                            color="#1aa1f5"
                            style={{ marginBottom: '2rem' }} />
                        <h1>Explore what is happening in the world</h1>
                        <h4>Join Utteran today</h4>
                        <Button type="button" to="/login">Login</Button>
                        <Button type="button" to="/register">Register</Button>
                    </div>
                </div>
            </div>
            
            <div className={style.footer}>
                <ul className={style.footerList}>
                    <li>
                        <NavLink to="#">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Brand</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Contact</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Apps</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Settings</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Privacy</NavLink>
                    </li>
                    <li>
                        <NavLink to="#">Developers</NavLink>
                    </li>
                    <li>
                        &copy; 2019 - {new Date().getFullYear()} Utteran
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Landing;
