import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { useHttpClient } from "../../hooks/http";
import { AuthContext } from "../../store/context";
import Post from "../Post/Post";
import Comments from "../Comments/Comments";

type PostProps = {
  posts?: IPost[];
  className?: string;
  comments?: IComment[];
  // onDelete?: any;
  // onHide?: any;
  // onEdit?: any;
};

const Posts: React.FC<PostProps> = (props) => {
  const { posts, className, comments } = props;
  const [show, setShow] = useState<number | null | undefined>(-1);
  const [showTooltip, setShowTooltip] = useState<number | null | undefined>(-1);
  const { sendRequest } = useHttpClient();
  const authCtx = useContext(AuthContext);

  const toggleComment = (index: number) => {
    return index === show ? setShow(-1) : setShow(index);
  };
  const toggleTooltip = (index: number) => {
    return index === showTooltip ? setShowTooltip(-1) : setShowTooltip(index);
  };

  const deletePostHandler = async (postId: any) => {
    try {
      const res = await sendRequest<{
        data: { postId: string };
        status: string;
      }>(`${process.env.REACT_APP_BACK_URL}/posts/${postId}`, "DELETE", null, {
        Authorization: `Bearer ${authCtx.token}`,
      });
      console.log(res.data.postId);
    } catch (err) {}
  };

  if (posts) {
    return (
      <div className={className}>
        {posts.map((post, index) => (
          <Post
            key={post._id}
            postImages={`${post.postImages ? post.postImages[0] : ""}`}
            postBody={post.postBody}
            postedAt={post.postedAt}
            postAuthor={post.postAuthor}
            postCommentCount={post.postCommentCount}
            postRepostCount={post.postRepostCount}
            postLoveCount={post.postLoveCount}
            postShareCount={post.postShareCount}
            postVideo={post.postVideo ? post.postVideo : ""}
            postVideoType={post.postVideoType ? post.postVideoType : ""}
            onModifyPost={() => toggleTooltip(index)}
            showCommentBox={show === index}
            showTooltip={showTooltip === index}
            onToggleComment={() => toggleComment(index)}
            onDelete={() => deletePostHandler(post._id)}
            // onEdit={onEditPost(null, post._id)}
            // onHide={onHidePost(null, post._id)}
          />
        ))}
        <Comments comments={comments} />
      </div>
    );
  }
  return null;
};

Posts.propTypes = {
  posts: PropTypes.array,
  className: PropTypes.string,
  comments: PropTypes.array,
  // onDelete: PropTypes.any,
  // onHide: PropTypes.any,
  // onEdit: PropTypes.any,
};

export default Posts;
