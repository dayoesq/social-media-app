import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Comment from '../Comment/Comment';

import classes from './Comments.module.scss';

type CommentsProps = {
    comments?: IComment[];
};

const Comments: React.FC<CommentsProps> = (props) => {
    const [show, setShow] = useState<number | undefined | null>(-1);
    const [showTooltip, setShowTooltip] = useState<number | undefined | null>(
        -1
    );

    const toggleComment = (index: number) => {
        return index === show ? setShow(-1) : setShow(index);
    };

    const toggleTooltip = (index: number) => {
        return index === showTooltip
            ? setShowTooltip(-1)
            : setShowTooltip(index);
    };

    if (props.comments) {
        return (
            <div className={classes.comments}>
                {props.comments.map((comment, index) => (
                    <Comment
                        key={comment._id}
                        commentBody={comment.commentBody}
                        commentAuthorName={comment.commentAuthor}
                        commentAuthorImage={comment.commentAuthorAvatar}
                        show={show === index}
                        onToggleComment={() => toggleComment(index)}
                        onClick={() => toggleTooltip(index)}
                        showTooltip={showTooltip === index}
                        {...props}
                    />
                ))}
            </div>
        );
    }
    return null;
};

Comments.propTypes = {
    comments: PropTypes.array,
};

export default Comments;
