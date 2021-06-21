import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.scss';

export interface IBackdrop {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

const Backdrop: React.FC<IBackdrop> = ({ onClick, style }) => {
  const content = <div className={classes.backdrop} onClick={onClick} style={style}></div>;
  const backdropPortal = document.getElementById('backdrop-portal') as HTMLElement
  if (content) return ReactDOM.createPortal(content, backdropPortal);
  return null;
};

Backdrop.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object
};

export default Backdrop;
