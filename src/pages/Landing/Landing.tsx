import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faComment,
    faUserFriends,
    faDove
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/shared/form-elements/Button/Button';

import classes from './Landing.module.scss';
import style from './Footer.module.scss';

const Landing: React.FC = () => {
    const authSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={classes.landing}>
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
                        <h3>Join the people</h3>
                    </div>
                </div>
            </div>
            <div className={classes.right}>
                <form className={classes.rightContentForm} onSubmit={authSubmitHandler}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className={classes.landingInput} type="email" name="email" id="email" placeholder="Enter email..." />
                    </div>
                    <div>
                        <label htmlFor="password">Email</label>
                        <input className={classes.landingInput} type="password" name="password" id="password" placeholder="Enter password..." />
                    </div>
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
                        <NavLink to="#">
                            &copy; 2019 - {new Date().getFullYear()} Utteran
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Landing;
