import React from 'react';
import PropTypes from 'prop-types';

import classes from './Alert.module.scss';

type AlertProps = {
  children: React.ReactNode;
  danger?: boolean;
  success?: boolean;
};

const Alert: React.FC<AlertProps> = props => {
  return (
    <div className={
      `${classes.alert} 
      ${props.danger && classes.danger} 
      ${props.success && classes.success}`}>
      {props.children}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node,
  danger: PropTypes.bool,
  success: PropTypes.bool
};

export default Alert;
