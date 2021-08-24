import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classes from './WarningBackdrop.module.scss';

export interface IWarningBackdrop {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

const WarningBackdrop: React.FC<IWarningBackdrop> = ({ onClick, style }) => {
  const content = (
    <div className={classes.warningBackdrop} onClick={onClick} style={style}></div>
  );
  const backdropPortal = document.getElementById(
    'warning-backdrop-portal'
  ) as HTMLElement;
  if (content) return ReactDOM.createPortal(content, backdropPortal);
  return null;
};

WarningBackdrop.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object
};

export default WarningBackdrop;
