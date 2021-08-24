import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SubFooter: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={className}>
      <ul>
        <li>
          <NavLink to="/home">Terms</NavLink>
        </li>
        <li>
          <NavLink to="/home">Privacy Policy</NavLink>
        </li>
        <li>
          <NavLink to="/home">Cookies</NavLink>
        </li>
        <li>
          <NavLink to="/home">About</NavLink>
        </li>
        <li>
          <NavLink to="/home">More</NavLink>
        </li>
      </ul>
    </footer>
  );
};

SubFooter.propTypes = {
  className: PropTypes.string,
};

export default SubFooter;