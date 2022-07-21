import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEdit, faHeart } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../shared/UI/Avatar/Avatar';
import CommentInputBox from '../shared/UI/CommentInputBox/CommentInputBox';
import Tooltip from '../shared/UI/Tooltip/Tooltip';

import classes from './Comment.module.scss';

interface IComment {
  show?: boolean;
  commentAuthorName?: string;
  commentAuthorImage?: string;
  commentBody?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  onToggleComment?: React.MouseEventHandler<SVGSVGElement>;
  onIncreaseLike?: React.MouseEventHandler<SVGSVGElement>;
  showTooltip?: boolean;
}

const Comment: React.FC<IComment> = props => {
  return (
    <>
      <div className={classes.commentContainer}>
        <div className={classes.comment}>
          <div className={classes.wrapper}>
            <Avatar
              alt={props.commentAuthorName}
              rightSmall
              small
              src={`${process.env.REACT_APP_BACK_ASSETS}/${props.commentAuthorImage}`}
            />
            <div className={classes.body}>
              <p>{props.commentBody}</p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faEllipsisH}
            onClick={props.onClick}
          />
          {props.showTooltip && (
            <Tooltip
              style={{
                position: 'absolute',
                top: '2.7rem',
                right: '0.05rem'
              }}
              {...props}
            />
          )}
        </div>
        <div className={classes.editHeartWrapper}>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={props.onToggleComment}
            color='#868383'
          />
          <FontAwesomeIcon
            icon={faHeart}
            onClick={props.onIncreaseLike}
            color='#868383'
          />
          <span>2h</span>
        </div>
      </div>

      {props.show && (
        <CommentInputBox {...props}
          style={{ marginRight: '4rem' }}
        />
      )}
    </>
  );
};

Comment.propTypes = {
  commentBody: PropTypes.string,
  commentAuthorName: PropTypes.string,
  commentAuthorImage: PropTypes.string,
  onClick: PropTypes.func,
  onToggleComment: PropTypes.func,
  onIncreaseLike: PropTypes.func,
  show: PropTypes.bool,
  showTooltip: PropTypes.bool
};

export default Comment;