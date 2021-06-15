import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';

import classes from './WarningModal.module.scss';

interface IWarning {
  warningHeading?: string;
  warningText?: string;
  onDiscard?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}

const WarningModal: React.FC<IWarning> = props => {
  return (
    <React.Fragment>
      <Backdrop {...props}>
        <div className={classes.warningModal}>
          <h1>{props.warningHeading}</h1>
          <hr />
          <p>{props.warningText}</p>
          <div className={classes.buttonWrapper}>
            <button type="button" onClick={props.onDiscard}>Discard</button>
            <button type="button" onClick={props.onCancel}>Cancel</button>
          </div>
        </div>
      </Backdrop>
    </React.Fragment>
  );
};

WarningModal.propTypes = {
  warningHeading: PropTypes.string,
  warningText: PropTypes.string,
  onDiscard: PropTypes.func,
  onCancel: PropTypes.func
};

export default WarningModal;
