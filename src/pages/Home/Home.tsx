import { useContext, useReducer, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHashtag,
    faBell,
    faEnvelope,
    faHome,
    faSearch,
    faChevronDown,
    faStar,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

import Avatar from '../../components/shared/UI/Avatar/Avatar';
import { AuthContext } from '../../store/context';
import Friends from '../../components/Friends/Friends';
import StatusModal from '../../components/shared/UI/StatusModal/StatusModal';
import SliderModal from '../../components/shared/UI/SliderModal/SliderModal';
import WarningModal from '../../components/shared/UI/WarningModal/WarningModal';
import homeReducer from '../../reducers/homeReducer';
import {
    ASSETS_URL,
    BASE_URL,
    CANCEL_WARNING_MODAL,
    DISCARD_STATUS_MODAL,
    SHOW_HIDE_WARNING_MODAL,
    SHOW_STATUS_MODAL,
    TOGGLE_SHOW_SLIDER
} from '../../utils/constants';
import { useHttpClient } from '../../hooks/http';

import classes from './Home.module.scss';
import Post from '../../components/Post/Post';
import Comments from '../../components/Comments/Comments';

type TempComments = {
    comments?: IComment[];
};

const Home: React.FC<TempComments> = ({ comments }) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [friends, setFriends] = useState<IUser[]>([]);
    const { token, user } = useContext(AuthContext);
    const { isLoading, sendRequest } = useHttpClient();

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

    const [state, dispatch] = useReducer(homeReducer, {
        showStatus: false,
        showSlider: false,
        postBody: '',
        showWarningModal: false,
        rows: 5,
        minRows: 5,
        maxRows: 10
    });

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            (async () => {
                try {
                    const res = await sendRequest<ResponseDataPosts>(
                        `${BASE_URL}/posts`,
                        'GET',
                        null,
                        { Authorization: `Bearer ${token}` }
                    );
                    setPosts(res.data);
                } catch (err) {}
            })();
        }
        return () => {
            isMounted = false;
        };
    }, [sendRequest, token]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            (async () => {
                try {
                    const res = await sendRequest<ResponseDataUsers>(
                        `${BASE_URL}/users/friends`,
                        'GET',
                        null,
                        { Authorization: `Bearer ${token}` }
                    );
                    setFriends(res.data);
                } catch (err) {}
            })();
        }
        return () => {
            isMounted = false;
        };
    }, [sendRequest, token]);

    const deletePostHandler = async (postId: any) => {
        try {
            await sendRequest<{
                data: { postId: string };
                status: string;
            }>(`${BASE_URL}/posts/${postId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            });

            const remainingPosts = posts.filter(post => post._id !== postId);
            setPosts(remainingPosts);
        } catch (err) {}
    };

    const showStatusHandler = () => {
        dispatch({ type: SHOW_STATUS_MODAL });
    };

    const submitPostHandler = async (data: {
        postBody: string;
        postImages: string[];
    }) => {
        try {
            const res = await sendRequest<{ data: IPost; status: string }>(
                `${BASE_URL}/posts`,
                'POST',
                data,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            const updatedPosts = [res.data, ...posts];
            setPosts(updatedPosts);
            dispatch({ type: DISCARD_STATUS_MODAL });
        } catch (err) {}
    };

    const cancelStatusModalHandler = () => {
        dispatch({ type: SHOW_HIDE_WARNING_MODAL });
    };

    const removeWarningModalHandler = () => {
        dispatch({ type: DISCARD_STATUS_MODAL });
    };

    const cancelWarningModalHandler = () => {
        dispatch({ type: CANCEL_WARNING_MODAL });
    };

    const showHideSliderHandler = () => {
        dispatch({ type: TOGGLE_SHOW_SLIDER });
    };

    const showSlideHandler = () => {
        dispatch({ type: TOGGLE_SHOW_SLIDER });
    };

    return (
        <>
            {state.showStatus && (
                <StatusModal
                    showStatus={state.showStatus}
                    onCancelBackdrop={cancelStatusModalHandler}
                    onCloseStatus={cancelStatusModalHandler}
                    onSubmitPost={submitPostHandler}
                    rows={state.rows}
                />
            )}
            {state.showSlider && (
                <SliderModal
                    showSlider={state.showSlider}
                    onCancelBackdrop={showHideSliderHandler}
                    closeSlider={showHideSliderHandler}
                />
            )}

            {state.showWarningModal && (
                <WarningModal
                    showWarning={state.showWarningModal}
                    warningHeading='Discard Post?'
                    warningText='Do you really want to discard this post?'
                    onDiscard={removeWarningModalHandler}
                    onCancel={cancelWarningModalHandler}
                    onClick={cancelWarningModalHandler}
                />
            )}

            <div className={classes.feedsPage}>
                <nav className={classes.feedsNav}>
                    <div className={classes.feedsIcons}>
                        <NavLink to='/'>
                            <FontAwesomeIcon
                                icon={faHome}
                                size='1x'
                                color='#9e9a9a'
                            />
                        </NavLink>
                        <NavLink to='/'>
                            <FontAwesomeIcon
                                icon={faHashtag}
                                size='1x'
                                color='#9e9a9a'
                            />
                        </NavLink>
                        <NavLink to='/'>
                            <FontAwesomeIcon
                                icon={faBell}
                                size='1x'
                                color='#9e9a9a'
                            />
                        </NavLink>
                        <NavLink to='/'>
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                size='1x'
                                color='#9e9a9a'
                            />
                        </NavLink>
                    </div>
                    <div className={classes.searchBar}>
                        <FontAwesomeIcon
                            icon={faSearch}
                            size='1x'
                            className={classes.searchIcon}
                        />
                        <input type='text' placeholder='Search' />
                    </div>
                    <div className={classes.user} onClick={showSlideHandler}>
                        <Avatar
                            small
                            alt={user?.firstName}
                            src={`${ASSETS_URL}/${user?.avatar}`}
                            userName={user?.userName}
                        />
                        <NavLink
                            to={`/${user?.userName}`}
                            className={classes.userLink}
                        >
                            {user?.firstName}
                        </NavLink>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            size='2x'
                            color='#444'
                            className={classes.chevDown}
                        />
                    </div>
                </nav>

                <div className={classes.feedsContent}>
                    {/* {isLoading && <p>Loading...</p>} */}
                    <div className={classes.feedsHeader}>
                        <div className={classes.headerTop}>
                            <h4>Home</h4>
                            {isLoading && (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    color='#1aa1f5'
                                    size='2x'
                                />
                            )}
                            <FontAwesomeIcon
                                icon={faStar}
                                color='#1aa1f5'
                                size='2x'
                            />
                        </div>
                        <div className={classes.headerPost}>
                            <Avatar
                                small
                                src={`${ASSETS_URL}/${user?.avatar}`}
                                userName={user?.userName}
                            />
                            <input
                                type='text'
                                placeholder="What's up?"
                                onClick={showStatusHandler}
                            />
                        </div>
                    </div>
                    {!isLoading && (
                        <>
                            <ul className={classes.posts}>
                                {posts.map((post, index) => (
                                    <Post
                                        key={post._id}
                                        postImages={`${
                                            post.postImages
                                                ? post.postImages[0]
                                                : ''
                                        }`}
                                        postBody={post.postBody}
                                        postedAt={post.postedAt}
                                        postAuthor={post.postAuthor}
                                        postCommentCount={post.postCommentCount}
                                        postRepostCount={post.postRepostCount}
                                        postLoveCount={post.postLoveCount}
                                        postShareCount={post.postShareCount}
                                        alias={post.postAuthor.alias}
                                        postVideo={
                                            post.postVideo ? post.postVideo : ''
                                        }
                                        postVideoType={
                                            post.postVideoType
                                                ? post.postVideoType
                                                : ''
                                        }
                                        onModifyPost={() =>
                                            toggleTooltip(index)
                                        }
                                        showCommentBox={show === index}
                                        showTooltip={showTooltip === index}
                                        onToggleComment={() =>
                                            toggleComment(index)
                                        }
                                        onDelete={() =>
                                            deletePostHandler(post._id)
                                        }
                                    />
                                ))}
                                <Comments comments={comments} />
                            </ul>
                            <Friends friends={friends} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
