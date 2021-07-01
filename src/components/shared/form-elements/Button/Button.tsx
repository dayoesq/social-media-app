import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './Button.module.scss';

interface IButton {
    className?: string;
    href?: string;
    to?: string;
    children?: React.ReactNode;
    exact?: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement> | any; 
    primaryInverse?: boolean;
    small?: boolean;
    big?: boolean;
    medium?: boolean;
    long?: boolean;
    primary?: boolean;
    secondary?: boolean;
    default?: boolean;
    pillSmall?: boolean;
    pillBig?: boolean;
    pillLong?: boolean;
}

const Button: React.FC<IButton> = props => {
    if (props.to) {
        return (
            <NavLink
                className={`${classes.button} ${props.primary && classes.primary} 
                ${props.secondary && classes.secondary} ${props.default && classes.default} ${props.primaryInverse && classes.primaryInverse}
                ${props.small && classes.small} ${props.pillSmall && classes.pillSmall}
                ${props.long && classes.long} ${props.pillLong && classes.pillLong}`}
                to={props.to}
                exact={props.exact}
                style={props.style}
            >
                {props.children}
            </NavLink>
        );
    }
    return (
        <button
            className={`${classes.button} ${props.primary && classes.primary} 
            ${props.secondary && classes.secondary} ${props.default && classes.default} ${props.primaryInverse && classes.primaryInverse}
            ${props.small && classes.small} ${props.pillSmall && classes.pillSmall}
            ${props.long && classes.long} ${props.pillLong && classes.pillLong}`}
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
    className: PropTypes.string,
    primary: PropTypes.bool,
    default: PropTypes.bool,
    primaryInverse: PropTypes.bool,
    small: PropTypes.bool,
    big: PropTypes.bool,
    medium: PropTypes.bool,
    long: PropTypes.bool,
    pillSmall: PropTypes.bool,
    pillBig: PropTypes.bool

};

export default Button;

