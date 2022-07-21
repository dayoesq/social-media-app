import { FC, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faListAlt,
    faBookmark,
    faChartLine,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

import Avatar from '../Avatar/Avatar';
import { useHttpClient } from '../../../../hooks/http';
import { AuthContext } from '../../../../store/context';
import classes from './SidebarSlider.module.scss';
import Button from '../../form-elements/Button/Button';
import { ASSETS_URL, BASE_URL } from '../../../../utils/constants';

export type SliderProps = {
    closeSlider?: React.MouseEventHandler<SVGSVGElement>;
};

const SidebarSlider: FC<SliderProps> = props => {
    const { sendRequest } = useHttpClient();
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            await sendRequest<Logout>(`${BASE_URL}/users/logout`, 'GET', null, {
                Authorization: `Bearer ${authCtx.token}`
            });
            authCtx.logout();
            navigate('/');
        } catch (err) {}
    };
    return (
        <div className={classes.sidebarSlider}>
            <div className={classes.header}>
                <h2>Account info</h2>
                <FontAwesomeIcon
                    icon={faTimes}
                    className={classes.iconTimes}
                    onClick={props.closeSlider}
                />
            </div>
            <div className={classes.user}>
                <Avatar
                    small
                    src={`${ASSETS_URL}/${authCtx.user?.avatar}`}
                    userName={authCtx.user?.userName}
                />
                <span>+</span>
            </div>
            <div className={classes.userInfo}>
                <h4>{authCtx.user?.firstName}</h4>
                <p>{`@${authCtx.user?.lastName?.toLocaleLowerCase()}`}</p>
            </div>
            <div className={classes.following}>
                {authCtx.user?.followerCount && (
                    <p>
                        <span>{authCtx.user?.followingCount}</span> Following
                    </p>
                )}
                {authCtx.user?.followerCount && (
                    <p>
                        <span>{authCtx.user?.followerCount}</span> Followers
                    </p>
                )}
            </div>
            <div className={classes.list_1}>
                <ul>
                    <li>
                        <NavLink to={`/${authCtx.user?.userName}`}>
                            <FontAwesomeIcon
                                icon={faUser}
                                size='1x'
                                color='#9e9a9a'
                                className={classes.icon}
                            />
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <FontAwesomeIcon
                                icon={faListAlt}
                                size='1x'
                                color='#9e9a9a'
                                className={classes.icon}
                            />
                            Lists
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <FontAwesomeIcon
                                icon={faBookmark}
                                size='1x'
                                color='#9e9a9a'
                                className={classes.icon}
                            />
                            Bookmarks
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>
                            <FontAwesomeIcon
                                icon={faChartLine}
                                size='1x'
                                color='#9e9a9a'
                                className={classes.icon}
                            />
                            Analytics
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className={classes.list_2}>
                <ul>
                    <li>
                        <NavLink to='#'>Settings and Privacy</NavLink>
                    </li>
                    <li>
                        <NavLink to='#'>Help Center</NavLink>
                    </li>
                    <li>
                        <Button
                            type='button'
                            primary
                            small
                            pillSmall
                            onClick={logoutHandler}
                        >
                            Log Out
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

SidebarSlider.propTypes = {
    closeSlider: PropTypes.func
};

export default SidebarSlider;
