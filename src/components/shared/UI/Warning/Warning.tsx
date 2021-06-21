import React from 'react';
import PropTypes from 'prop-types';

import classes from './Warning.module.scss';

interface IWarning {
    warningHeading?: string
    warningText?: string
    onDiscard?: React.MouseEventHandler<HTMLButtonElement>
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
}

const Warning: React.FC<IWarning> = props => {
  return (
    <div className={classes.warningModal}>
      <h1>{props.warningHeading}</h1>
      <hr />
      <p>{props.warningText}</p>
      <div className={classes.buttonWrapper}>
        <button type='button' onClick={props.onDiscard}>
          Discard
        </button>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

Warning.propTypes = {
    warningHeading: PropTypes.string,
    warningText: PropTypes.string,
    onDiscard: PropTypes.func,
    onCancel: PropTypes.func
}

export default Warning;
