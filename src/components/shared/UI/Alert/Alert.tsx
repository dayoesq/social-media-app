import React from 'react';
import PropTypes from 'prop-types';

import classes from './Alert.module.scss';

type AlertProps = {
  children?: React.ReactNode;
  danger?: boolean;
  success?: boolean;
  style?: React.CSSProperties;
};

const Alert: React.FC<AlertProps> = props => {
  return (
    <div className={
      `${classes.alert} 
      ${props.danger && classes.danger} 
      ${props.success && classes.success}`}
    style={props.style}
    >
      {props.children}
      
    </div>
  );
};

Alert.propTypes = {
  danger: PropTypes.bool,
  success: PropTypes.bool,
  style: PropTypes.object
};

export default Alert;
