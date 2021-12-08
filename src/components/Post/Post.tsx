import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faRetweet,
  faHeart,
  faShareAlt,
  faCheckCircle,
  faEllipsisH,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import CommentInputBox from "../shared/UI/CommentInputBox/CommentInputBox";
import Avatar from "../shared/UI/Avatar/Avatar";
import Tooltip from "../shared/UI/Tooltip/Tooltip";
import { AuthContext } from "../../store/context";
import { getAlias, getDateTime } from "../../utils/helpers";

import classes from "./Post.module.scss";

type PostProps = {
  onModifyPost?: React.MouseEventHandler<SVGSVGElement>;
  onToggleComment?: React.MouseEventHandler<SVGSVGElement>;
  showCommentBox?: boolean;
  showTooltip?: boolean;
  postAuthor?: IUser | null;
  postedAt?: Date | string | number;
  postBody?: string;
  postImages?: string;
  postVideo?: string;
  postVideoType?: string;
  postCommentCount?: number;
  postRepostCount?: number;
  postLikeCount?: number;
  postShareCount?: number;
  onDelete?: any;
  onHide?: any;
  onEdit?: any;
  // onDelete?: React.MouseEventHandler<HTMLDivElement>;
  // onHide?: React.MouseEventHandler<HTMLDivElement>;
  // onEdit?: React.MouseEventHandler<HTMLDivElement>;
};

const Post: React.FC<PostProps & IPost> = (props) => {
  const {
    postImages,
    postBody,
    postCommentCount,
    postRepostCount,
    postLikeCount,
    postShareCount,
    postVideo,
    postVideoType,
    postAuthor,
    postedAt,
    onToggleComment,
    showCommentBox,
    onModifyPost,
    showTooltip,
    onDelete,
    onHide,
    onEdit,
  } = props;
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.post}>
      <div>
        <Avatar
          big
          alt={authCtx.user?.firstName}
          src={`${process.env.REACT_APP_BACK_ASSETS}/${authCtx.user?.avatar}`}
          rightBig
        />
      </div>

      <div>
        <div className={classes.postUserInfo}>
          <h4>{authCtx.user?.firstName}</h4>
          {postAuthor?.status === "verified" && (
            <FontAwesomeIcon icon={faCheckCircle} className={classes.icon} />
          )}
          <span>
            {`@${getAlias(props)}`} .{" "}
            {getDateTime(postedAt ? postedAt : new Date())}
          </span>
          <FontAwesomeIcon
            icon={faEllipsisH}
            onClick={onModifyPost}
            className={classes.iconEllipsis}
          />
          {showTooltip && (
            <Tooltip
              style={{
                position: "absolute",
                top: "1.5rem",
                right: ".5rem",
              }}
              onDelete={onDelete}
              onHide={onHide}
              onEdit={onEdit}
            />
          )}
        </div>
        <p className={classes.postText}>{postBody}</p>
        {postImages ? (
          <NavLink to="/home">
            <div className={classes.postImg}>
              <img
                src={`${process.env.REACT_APP_BACK_ASSETS}/${postImages}`}
                alt="Post"
              />
            </div>
          </NavLink>
        ) : (
          ""
        )}
        {postVideo ? (
          <NavLink to="/home">
            <div className={classes.postImg}>
              <video controls autoPlay muted>
                <source src={postVideo} type={postVideoType} />
                Your browser does not support the video tag.
              </video>
            </div>
          </NavLink>
        ) : (
          ""
        )}
        <div className={classes.postIcons}>
          <NavLink to="/home">
            <span className={classes.count}>{postCommentCount}</span>
            <FontAwesomeIcon
              icon={faComment}
              size="2x"
              color="#444"
              className={classes.postIcon}
            />
          </NavLink>
          <NavLink to="/home">
            <span className={classes.count}>{postRepostCount}</span>
            <FontAwesomeIcon
              icon={faRetweet}
              size="2x"
              color="#444"
              className={classes.postIcon}
            />
          </NavLink>
          <NavLink to="/home">
            <span className={classes.count}>{postLikeCount}</span>
            <FontAwesomeIcon
              icon={faHeart}
              size="2x"
              color="#444"
              className={classes.postIcon}
            />
          </NavLink>
          <NavLink to="/home">
            <span className={classes.count}>{postShareCount}</span>
            <FontAwesomeIcon
              icon={faShareAlt}
              size="2x"
              color="#444"
              className={classes.postIcon}
            />
          </NavLink>
          <FontAwesomeIcon
            icon={faEdit}
            size="2x"
            color="#444"
            onClick={onToggleComment}
            className={classes.postIcon}
          />
        </div>
        {showCommentBox && <CommentInputBox {...props} />}
      </div>
    </div>
  );
};

Post.propTypes = {
  showTooltip: PropTypes.bool,
  showCommentBox: PropTypes.bool,
  postedAt: PropTypes.any,
  postBody: PropTypes.string,
  postImages: PropTypes.string,
  postCommentCount: PropTypes.number,
  postRepostCount: PropTypes.number,
  postShareCount: PropTypes.number,
  postLikeCount: PropTypes.number,
  onModifyPost: PropTypes.func,
  postVideo: PropTypes.string,
  postVideoType: PropTypes.string,
  onToggleComment: PropTypes.func,
  postAuthor: PropTypes.any,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onHide: PropTypes.func,
};

export default Post;
