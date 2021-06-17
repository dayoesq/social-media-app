import React from 'react';
import PropTypes from 'prop-types';

import classes from './Avatar.module.scss';

interface IAvatar {
    className?: string;
    small?: boolean;
    big?: boolean;
    leftSmall?: boolean;
    rightSmall?: boolean;
    leftBig?: boolean;
    rightBig?: boolean;
    src?: string;
    alt?: string;
    style?: React.CSSProperties;
}

const Avatar: React.FC<IAvatar> = props => {
    return (
        <div
            className={`${classes.image} ${props.small && classes.small} 
            ${props.big && classes.big} 
            ${props.leftSmall && classes.leftSmall} 
            ${props.leftBig && classes.leftBig}
            ${props.rightSmall && classes.rightSmall}
            ${props.rightBig && classes.rightBig}`}
            style={props.style}
        >
            <img src={props.src} alt={props.alt} />
        </div>
    );
};

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    small: PropTypes.bool,
    big: PropTypes.bool,
    leftSmall: PropTypes.bool,
    leftBig: PropTypes.bool,
    rightSmall: PropTypes.bool,
    rightBig: PropTypes.bool,
    style: PropTypes.object
};

export default Avatar;
