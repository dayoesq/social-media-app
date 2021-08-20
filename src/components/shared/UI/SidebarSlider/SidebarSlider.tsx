import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
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

export type SliderProps = {
  closeSlider?: React.MouseEventHandler<SVGSVGElement>;
};

type Logout = {
  status: string;
};

const SidebarSlider: React.FC<SliderProps> = props => {
  const { sendRequest } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const logoutHandler = async () => {
    await sendRequest<Logout>(`${process.env.REACT_APP_BACK_URL}/users/logout`,
      'GET',
      null,
      { Authorization: `Bearer ${authCtx.token}` }
    );
    authCtx.logout();
  }
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
        <Avatar small src={authCtx.user?.avatar} />
        <span>+</span>
      </div>
      <div className={classes.userInfo}>
        <h4>{authCtx.user?.firstName}</h4>
        <p>{`@${authCtx.user?.alias}`}</p>
      </div>
      <div className={classes.following}>
        <p>
          <span>{authCtx.user?.followingCount}</span> Following
        </p>
        <p>
          <span>{authCtx.user?.followerCount}</span> Followers
        </p>
      </div>
      <div className={classes.list_1}>
        <ul>
          <li>
            <NavLink to={`/users/profile/${authCtx.user?._id}`}>
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
