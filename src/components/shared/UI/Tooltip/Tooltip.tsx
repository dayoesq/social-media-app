import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import classes from "./Tooltip.module.scss";

interface ITooltip {
  style?: React.CSSProperties;
  onDelete?: React.MouseEventHandler<HTMLDivElement>;
  onHide?: React.MouseEventHandler<HTMLDivElement>;
  onEdit?: React.MouseEventHandler<HTMLDivElement>;
}

const Tooltip: React.FC<ITooltip> = (props) => {
  const { style, onDelete, onHide, onEdit } = props;
  return (
    <div className={classes.tooltip} style={style}>
      <div onClick={onDelete}>
        <FontAwesomeIcon icon={faTrashAlt} size="1x" color="#9e9a9a" />
        <p>Delete</p>
      </div>
      <div onClick={onHide}>
        <FontAwesomeIcon icon={faSave} size="1x" color="#9e9a9a" />
        <p>Hide</p>
      </div>
      <div onClick={onEdit}>
        <FontAwesomeIcon icon={faEdit} size="1x" color="#9e9a9a" />
        <p>Edit</p>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  onDelete: PropTypes.func,
  onHide: PropTypes.func,
  onEdit: PropTypes.func,
  style: PropTypes.object,
};

export default Tooltip;
