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

import classes from './Post.module.scss';
import { getAlias, getDateTime } from '../../utils/helpers';

type PostProps = {
  onModifyPost?: React.MouseEventHandler<SVGSVGElement>;
  onToggleComment?: React.MouseEventHandler<SVGSVGElement>;
  showCommentBox?: boolean
  showTooltip?: boolean;
  postAuthor?: IUser | null;
  postedAt?: Date | string | number;
  postBody?: string;
  postImage?: string;
  postVideo?: string;
  postVideoType?: string;
  postCommentCount?: number;
  postRepostCount?: number;
  postLikeCount?: number;
  postShareCount?: number;
};

const Post: React.FC<PostProps & IPost> = props => {
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
          {props.postAuthor?.status === 'verified' && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={classes.icon}
            />
          )}
          <span>
            {`@${getAlias(props)}`} . {getDateTime(props.postedAt ? props.postedAt : new Date())}
          </span>
          <FontAwesomeIcon
            icon={faEllipsisH}
            onClick={props.onModifyPost}
            className={classes.iconEllipsis}
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
        <p className={classes.postText}>{props.postBody}</p>
        {props.postImage && (
          <NavLink to='/home'>
            <div className={classes.postImg}>
              <img src={`${process.env.REACT_APP_BACK_ASSETS}/${props.postImage}`} alt='Post' />
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
              className={classes.postIcon}
            />
          </NavLink>
          <NavLink to='/home'>
            <span className={classes.count}>{props.postRepostCount}</span>
            <FontAwesomeIcon
              icon={faRetweet}
              size='2x'
              color='#444'
              className={classes.postIcon}
            />
          </NavLink>
          <NavLink to='/home'>
            <span className={classes.count}>{props.postLikeCount}</span>
            <FontAwesomeIcon
              icon={faHeart}
              size='2x'
              color='#444'
              className={classes.postIcon}
            />
          </NavLink>
          <NavLink to='/home'>
            <span className={classes.count}>{props.postShareCount}</span>
            <FontAwesomeIcon
              icon={faShareAlt}
              size='2x'
              color='#444'
              className={classes.postIcon}
            />
          </NavLink>
          <FontAwesomeIcon
            icon={faEdit}
            size='2x'
            color='#444'
            onClick={props.onToggleComment}
            className={classes.postIcon}
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
  postedAt: PropTypes.any,
  postBody: PropTypes.string,
  postImage: PropTypes.string,
  postCommentCount: PropTypes.number,
  postRepostCount: PropTypes.number,
  postShareCount: PropTypes.number,
  postLikeCount: PropTypes.number,
  onModifyPost: PropTypes.func,
  postVideo: PropTypes.string,
  postVideoType: PropTypes.string,
  onToggleComment: PropTypes.func,
  postAuthor: PropTypes.any
};

export default Post;
