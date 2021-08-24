import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.scss';

export interface IBackdrop {
  onCancelBackdrop?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

const Backdrop: React.FC<IBackdrop> = ({ onCancelBackdrop, style }) => {
  const content = <div className={classes.backdrop} onClick={onCancelBackdrop} style={style}></div>;
  const backdropPortal = document.getElementById('backdrop-portal') as HTMLElement;
  if (content) return ReactDOM.createPortal(content, backdropPortal);
  return null;
};

Backdrop.propTypes = {
  onCancelBackdrop: PropTypes.func,
  style: PropTypes.object
};

export default Backdrop;
