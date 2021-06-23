import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../Avatar/Avatar';

import classes from './CommentInputBox.module.scss';

interface ICommentInput {
  commentAuthorName?: string;
  commentAuthorImage?: string;
  onShowEmoji?: React.MouseEventHandler<SVGSVGElement>;
  className?: string;
  style?: React.CSSProperties;
}

const CommentInputBox: React.FC<ICommentInput> = props => {
  const [comment, setComment] = useState<string | undefined | null>(null);
  const commentRef = useRef<any>(null);

  const sendCommentHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (commentRef.current.textContent.trim().length === 0 || null) return;
      setComment(commentRef.current.textContent);
      alert(commentRef.current.textContent);
      // Should I make ajax call here?
    }
  };

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  return (
    <div className={classes.commentInputBox}>
      <Avatar
        small
        rightBig
        alt={props.commentAuthorName}
        src={props.commentAuthorImage}
      />
      <label htmlFor='commentbox'></label>
      <p
        contentEditable={true}
        placeholder='Your comment here...'
        onKeyPress={sendCommentHandler}
        suppressContentEditableWarning={true}
        ref={commentRef}
      >
        {comment}
      </p>
      <FontAwesomeIcon
        className={classes.smileIcon}
        icon={faSmile}
        size='2x'
        color='#9e9a9a'
        onClick={props.onShowEmoji}
        style={props.style}
      />
    </div>
  );
};

CommentInputBox.propTypes = {
  commentAuthorImage: PropTypes.string,
  commentAuthorName: PropTypes.string,
  onShowEmoji: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default CommentInputBox;
