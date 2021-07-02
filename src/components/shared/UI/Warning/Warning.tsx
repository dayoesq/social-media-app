import React from 'react';
import PropTypes from 'prop-types';

import classes from './Warning.module.scss';
import Button from '../../form-elements/Button/Button';

export interface IWarning {
    warningHeading?: string
    warningText?: string
    onDiscard?: React.MouseEventHandler<HTMLButtonElement>
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
}

const Warning: React.FC<IWarning> = props => {
  return (
    <div className={classes.warning}>
      <h1>{props.warningHeading}</h1>
      <hr />
      <p>{props.warningText}</p>
      <div className={classes.buttonWrapper}>
        <Button
          type='button'
          onClick={props.onDiscard}
          danger
          small
          pillSmall
        >
          Discard
        </Button>
        <Button
          type='button'
          onClick={props.onCancel}
          primary
          small
          pillSmall
        >
          Cancel
        </Button>
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
