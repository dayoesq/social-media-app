import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.scss';

interface IBackdrop {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
  show?: boolean;
}

const Backdrop: React.FC<IBackdrop> = ({onClick, children, show}) => {
  return (
    <React.Fragment>
      {
        show && (
          <div className={classes.backdrop} onClick={onClick}>
            {children}
          </div>
        )
      }

    </React.Fragment>
  );
};

Backdrop.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool
};

export default Backdrop;
