import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.scss';

export interface IBackdrop {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  show?: boolean;
}

const Backdrop: React.FC<IBackdrop> = ({onClick, style, show}) => {
  return (
    <React.Fragment>
      {show && (
        <div className={classes.backdrop} onClick={onClick} style={style}></div>)
      }
    </React.Fragment>
  );
};

Backdrop.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  show: PropTypes.bool
};

export default Backdrop;
