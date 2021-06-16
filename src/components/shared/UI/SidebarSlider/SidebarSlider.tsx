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
import { AuthContext } from '../../../../store/context';
import classes from './SidebarSlider.module.scss';

type SliderProps = {
  closeSlider?: React.MouseEventHandler<SVGSVGElement>;
};

const SidebarSlider: React.FC<SliderProps> = props => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.sidebarSlider}>
      <div className={classes.header}>
        <h2>Account info</h2>
        <FontAwesomeIcon
          icon={faTimes}
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
            <NavLink to='#'>Log Out</NavLink>
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
