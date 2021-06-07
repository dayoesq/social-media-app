import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faComment,
  faUserFriends
} from '@fortawesome/free-solid-svg-icons';


import classes from './Landing.modules.scss';


const Landing: React.FC = () => {
  
  return (
    <div className={classes.landing}>
      <div className={classes.left}>
        <div className={classes.leftContent}>
          <div>
            <FontAwesomeIcon icon={faSearch} size='3x' />
            <h3>Find your interests</h3>
          </div>
          <div>
            <FontAwesomeIcon icon={faUserFriends} size='3x' />
            <h3>Explore what people are talking about</h3>
          </div>
          <div>
            <FontAwesomeIcon icon={faComment} size='3x' />
            <h3>Join the people</h3>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <ul className={classes.footerList}>
          <li>
            <NavLink to='#'>About</NavLink>
          </li>
          <li>
            <NavLink to='#'>Brand</NavLink>
          </li>
          <li>
            <NavLink to='#'>Contact</NavLink>
          </li>
          <li>
            <NavLink to='#'>Apps</NavLink>
          </li>
          <li>
            <NavLink to='#'>Settings</NavLink>
          </li>
          <li>
            <NavLink to='#'>Privacy</NavLink>
          </li>
          <li>
            <NavLink to='#'>Developers</NavLink>
          </li>
          <li>
            <NavLink to='#'>&copy; 2019 RelatE</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Landing;

