import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faRetweet,
  faHeart,
  faShareAlt,
  faCheckCircle,
  faEllipsisH,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

import CommentInputBox from '../shared/UI/CommentInputBox/CommentInputBox';
import Avatar from '../shared/UI/Avatar/Avatar';
import Tooltip from '../shared/UI/Tooltip/Tooltip';
import { AuthContext } from '../../store/context';

import classes from './Post.module.scss'

type PostProps = {
  onModifyPost?: React.MouseEventHandler<SVGSVGElement>;
  onToggleComment?: React.MouseEventHandler<SVGSVGElement>;
  showCommentBox?: boolean
  showTooltip?: boolean;
  authorAlias?: string;
  postedAt?: Date;
  postContent?: string;
  postImage?: string;
  postVideo?: string;
  postVideoType?: string;
  postCommentCount?: number;
  postRepostCount?: number;
  postLikeCount?: number;
  postShareCount?: number;
};

const Post: React.FC<PostProps & IPost> = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.post}>
      <Avatar
        big
        alt={authCtx.user?.firstName}
        src={authCtx.user?.avatar}
        rightBig
        // style={{ flexShrink: '0', marginRight: '1.5rem' }}
      />
      <div>
        <div className={classes.postUserInfo}>
          <h4>{authCtx.user?.firstName}</h4>
          {authCtx.user?.isVerified && (
            <FontAwesomeIcon
              icon={faCheckCircle}
            />
          )}
          <span>
            {`@${props.authorAlias}`} . {props.postedAt}
          </span>
          <FontAwesomeIcon
            icon={faEllipsisH}
            onClick={props.onModifyPost}
          />
          {props.showTooltip && (
            <Tooltip
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '.5rem'
              }}
              {...props}
            />
          )}
        </div>
        <p className={classes.postText}>{props.postContent}</p>
        {props.postImage && (
          <NavLink to='/home'>
            <div className={classes.postImg}>
              <img src={props.postImage} alt='Post' />
            </div>
          </NavLink>
        )}
        {props.postVideo && (
          <NavLink to='/home'>
            <div className={classes.postImg}>
              <video controls autoPlay muted>
                <source
                  src={props.postVideo}
                  type={props.postVideoType}
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </NavLink>
        )}
        <div className={classes.postIcons}>
          <NavLink to='/home'>
            <span className={classes.count}>{props.postCommentCount}</span>
            <FontAwesomeIcon
              icon={faComment}
              size='2x'
              color='#444'
            />
          </NavLink>
          <NavLink to='/home'>
            <span className={classes.count}>{props.postRepostCount}</span>
            <FontAwesomeIcon
              icon={faRetweet}
              size='2x'
              color='#444'
            />
          </NavLink>
          <NavLink to='/home'>
            <span className={classes.count}>{props.postLikeCount}</span>
            <FontAwesomeIcon
              icon={faHeart}
              size='2x'
              color='#444'
            />
          </NavLink>
          <NavLink to='/home'>
            <span className={classes.count}>{props.postShareCount}</span>
            <FontAwesomeIcon
              icon={faShareAlt}
              size='2x'
              color='#444'
            />
          </NavLink>
          <FontAwesomeIcon
            icon={faEdit}
            size='2x'
            color='#444'
            onClick={props.onToggleComment}
          />
        </div>
        {props.showCommentBox && (
          <CommentInputBox {...props}
          />
        )}
      </div>
    </div>
  );
};

Post.propTypes = {
  showTooltip: PropTypes.bool,
  showCommentBox: PropTypes.bool,
  authorAlias: PropTypes.string,
  postedAt: PropTypes.any,
  postContent: PropTypes.string,
  postImage: PropTypes.string,
  postCommentCount: PropTypes.number,
  postRepostCount: PropTypes.number,
  postShareCount: PropTypes.number,
  postLikeCount: PropTypes.number,
  onModifyPost: PropTypes.func,
  postVideo: PropTypes.string,
  postVideoType: PropTypes.string,
  onToggleComment: PropTypes.func
};

export default Post;
