import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Post from '../Post/Post';
import Comments from '../Comments/Comments';

type PostProps = {
  posts?: IPost[];
  className?: string;
  comments?: IComment[];
};

const Posts: React.FC<PostProps> = props => {
  const [show, setShow] = useState<number | null | undefined>(-1);
  const [showTooltip, setShowTooltip] = useState<number | null | undefined>(
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

  if (props.posts) {
    return (
      <div className={props.className}>
        {props.posts.map((post, index) => (
          <Post
            key={post._id}
            postImage={`${post.postImage ? post.postImage : ''}`}
            postBody={post.postBody}
            postedAt={post.postedAt}
            postAuthor={post.postAuthor}
            postCommentCount={post.postCommentCount}
            postRepostCount={post.postRepostCount}
            postLoveCount={post.postLoveCount}
            postShareCount={post.postShareCount}
            postVideo={post.postVideo ? post.postVideo : ''}
            postVideoType={post.postVideoType ? post.postVideoType : ''}
            onModifyPost={() => toggleTooltip(index)}
            showCommentBox={show === index}
            showTooltip={showTooltip === index}
            onToggleComment={() => toggleComment(index)}
          />
        ))}
        <Comments comments={props.comments} />
      </div>
    );

  }
  return null;  
};

Posts.propTypes = {
  posts: PropTypes.array,
  className: PropTypes.string,
  comments: PropTypes.array
};

export default Posts;
