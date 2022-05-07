import React from 'react';
import PropTypes from 'prop-types';

import classes from './BtnFat.module.scss';


interface IButton {
  href?: string;
  children: React.ReactNode;
  exact?: boolean;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const BtnFat: React.FC<IButton> = props => {
  if (props.href) {
    return (
      <a
        className={classes.btnFat}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  return (
    <button
      className={classes.btnFat}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

BtnFat.propTypes = {
  href: PropTypes.string,
  type: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  // children: PropTypes.node,
  exact: PropTypes.bool
};

export default BtnFat;
