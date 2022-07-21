import { FC, useContext } from 'react';
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
import { getAlias, getDateTime } from '../../utils/helpers';

import classes from './Post.module.scss';
import { ASSETS_URL } from '../../utils/constants';

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
    style?: React.CSSProperties;
    onDelete?: React.MouseEventHandler<HTMLDivElement>;
    onHide?: React.MouseEventHandler<HTMLDivElement>;
    onEdit?: React.MouseEventHandler<HTMLDivElement>;
    alias?: string;
};

const Post: FC<PostProps & IPost> = props => {
    const { user } = useContext(AuthContext);
    return (
        <li className={classes.post}>
            <div>
                <Avatar
                    big
                    alt={user?.firstName}
                    src={`${ASSETS_URL}/${user?.avatar}`}
                    rightBig
                    userName={user?.userName}
                />
            </div>

            <div>
                <div className={classes.postUserInfo}>
                    <h4>{user && user.firstName}</h4>
                    {props.postAuthor?.status === 'verified' && (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={classes.icon}
                        />
                    )}
                    <span>
                        {getAlias(
                            props.postAuthor.lastName
                                ? props.postAuthor.lastName
                                : ''
                        )}{' '}
                        .{' '}
                        {getDateTime(
                            props.postedAt ? props.postedAt : new Date()
                        )}
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
                            onDelete={props.onDelete}
                            onHide={props.onHide}
                            onEdit={props.onEdit}
                        />
                    )}
                </div>
                <p className={classes.postText}>{props.postBody}</p>
                {props.postImages ? (
                    <NavLink to='/'>
                        <div className={classes.postImg}>
                            <img
                                src={`${ASSETS_URL}/${props.postImages}`}
                                alt='Post'
                            />
                        </div>
                    </NavLink>
                ) : (
                    ''
                )}
                {props.postVideo ? (
                    <NavLink to='/'>
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
                ) : (
                    ''
                )}
                <div className={classes.postIcons}>
                    <NavLink to='/'>
                        <span className={classes.count}>
                            {props.postCommentCount}
                        </span>
                        <FontAwesomeIcon
                            icon={faComment}
                            size='2x'
                            color='#444'
                            className={classes.postIcon}
                        />
                    </NavLink>
                    <NavLink to='/'>
                        <span className={classes.count}>
                            {props.postRepostCount}
                        </span>
                        <FontAwesomeIcon
                            icon={faRetweet}
                            size='2x'
                            color='#444'
                            className={classes.postIcon}
                        />
                    </NavLink>
                    <NavLink to='/'>
                        <span className={classes.count}>
                            {props.postLikeCount}
                        </span>
                        <FontAwesomeIcon
                            icon={faHeart}
                            size='2x'
                            color='#444'
                            className={classes.postIcon}
                        />
                    </NavLink>
                    <NavLink to='/'>
                        <span className={classes.count}>
                            {props.postShareCount}
                        </span>
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
                {props.showCommentBox && <CommentInputBox {...props} />}
            </div>
        </li>
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
    alias: PropTypes.string
};

export default Post;
