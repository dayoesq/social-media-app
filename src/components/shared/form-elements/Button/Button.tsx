import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './Button.scss';

interface IButton {
  href?: string;
  to?: string;
  children: React.ReactNode;
  exact?: boolean;
  style: React.CSSProperties | undefined;
  disabled?: boolean | undefined;
  type?: 'button' | 'submit' | 'reset';
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  size?: string;
  rounded?: string;
  color?: string;
  shape?: string;
}

const Button: React.FC<IButton> = props => {
  if (props.href) {
    return (
      <a className={classes.button}
        href={props.href}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <NavLink
        to={props.to}
        exact={props.exact}
        className={classes.button}
        style={props.style}
      >
        {props.children}
      </NavLink>
    );
  }
  return (
    <button
      className='Button'
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  type: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
  to: PropTypes.string,
  exact: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
  shape: PropTypes.string,
  rounded: PropTypes.string
};

export default Button;
