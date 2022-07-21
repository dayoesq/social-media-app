import React from 'react';
import PropTypes from 'prop-types';

import classes from './Avatar.module.scss';
import { Link } from 'react-router-dom';

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
    userName?: IUser['userName'];
}

const Avatar: React.FC<IAvatar> = props => {
    return (
        <Link to={`/${props.userName}`}>
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
        </Link>
    );
};

Avatar.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    small: PropTypes.bool,
    big: PropTypes.bool,
    leftSmall: PropTypes.bool,
    leftBig: PropTypes.bool,
    rightSmall: PropTypes.bool,
    rightBig: PropTypes.bool,
    style: PropTypes.object,
    userName: PropTypes.string
};

export default Avatar;
