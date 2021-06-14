import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import classes from './Tooltip.module.scss';

interface ITooltip {
  style?: React.CSSProperties;
  onDelete?: React.MouseEventHandler<HTMLDivElement>;
  onHide?: React.MouseEventHandler<HTMLDivElement>;
  onEdit?: React.MouseEventHandler<HTMLDivElement>;
  text?: string;
}

const Tooltip: React.FC<ITooltip> = props => {
    return (
        <div className={classes.tooltip} style={props.style}>
            <div onClick={props.onDelete}>
                <FontAwesomeIcon icon={faTrashAlt} size='1x' color='#9e9a9a' />
                <p>Delete {props.text}</p>
            </div>
            <div onClick={props.onHide}>
                <FontAwesomeIcon icon={faSave} size='1x' color='#9e9a9a' />
                <p>Hide {props.text}</p>
            </div>
            <div onClick={props.onEdit}>
                <FontAwesomeIcon icon={faEdit} size='1x' color='#9e9a9a' />
                <p>Edit {props.text}</p>
            </div>
        </div>
    )
}

Tooltip.propTypes = {
  onDelete: PropTypes.func,
  onHide: PropTypes.func,
  onEdit: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object
};

export default Tooltip;
