import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './BtnFat.module.scss';


interface IButton {
  href?: string;
  children: React.ReactNode;
  exact?: boolean;
  style?: React.CSSProperties;
  to?: any;
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
    if (props.to) {
        return (
            <NavLink
                to={props.to}
                exact={props.exact}
                className={classes.btnFat}
                style={props.style}
            >
                {props.children}
            </NavLink>
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
    children: PropTypes.node,
    to: PropTypes.string,
    exact: PropTypes.bool
};

export default BtnFat;
