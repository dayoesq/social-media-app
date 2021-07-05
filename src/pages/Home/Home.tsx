import React, { useContext, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHashtag,
    faBell,
    faEnvelope,
    faHome,
    faSearch,
    faChevronDown,
    faStar
} from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../components/shared/UI/Avatar/Avatar';
import { AuthContext } from '../../store/context';
import Posts from '../../components/Posts/Posts';
import Follows from '../../components/Follows/Follows';
import StatusModal from '../../components/shared/UI/StatusModal/StatusModal';
import SliderModal from '../../components/shared/UI/SliderModal/SliderModal';
import WarningModal from '../../components/shared/UI/WarningModal/WarningModal';
import homeReducer from '../../reducers/homeReducer';
import {
    CANCEL_WARNING_MODAL,
    CHANGE_POST_STATUS,
    DISCARD_STATUS_MODAL,
    SHOW_HIDE_WARNING_MODAL,
    SHOW_STATUS_MODAL,
    SUBMIT_POST,
    TOGGLE_SHOW_SLIDER
} from '../../utils/constants';

import sampleImg from '../../assets/images/sample-img.jpg';
import img1 from '../../assets/images/Finnsh Cat.jpeg';
import img2 from '../../assets/images/helsinki-church.jpeg';

import classes from './Home.module.scss';


const Home: React.FC = () => {
    const authCtx = useContext(AuthContext);
    const [state, dispatch] = useReducer(homeReducer, {
        showStatus: false,
        showSlider: false,
        status: '',
        showWarningModal: false,
        rows: 5,
        minRows: 5,
        maxRows: 10
    });
   

    // Dummy data
    const posts = [
        {
            _id: 'p1',
            postAuthor: 'Oladayo',
            postAuthorImage: sampleImg,
            postedAt: new Date().toLocaleString(),
            postBody: 'Gone are the days when it took forever to receive letters. It now takes just a few seconds. We have really moved on as a generation. So much development. To all of my friends on utteran, this is to announce my appearance. There is more to come. Stay tuned. Love you all',
            postImage: img1,
            postCommentCount: 20,
            postLoveCount: 4,
            postShareCount: 500

        },
        {
            _id: 'p2',
            postAuthor: 'Sola',
            postAuthorImage: sampleImg,
            postedAt: new Date().toLocaleString(),
            postBody: 'My very first post on this platform',
            postImage: img2,
            postCommentCount: 400,
            postLoveCount: 300,
            postShareCount: 500

        },
        {
            _id: 'p3',
            postAuthor: 'Sola',
            postAuthorImage: sampleImg,
            postedAt: new Date().toLocaleString(),
            postBody: 'My very first post on this platform',
            postImage: img2,
            postCommentCount: 400,
            postLoveCount: 300,
            postShareCount: 500

        },
    ];

    const follows = [
        {
            _id: 'p4',
            followImage: sampleImg,
            followAlias: 'solaola',
            followName: 'Olusola'
        },
        {
            _id: 'p6',
            followImage: sampleImg,
            followAlias: 'solaola',
            followName: 'Olusola'
        },
    ];

    const changePostHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: CHANGE_POST_STATUS,
            value: e.target.value,
            scrollHeight: e.target.scrollHeight,
            scrollTop: e.target.scrollTop,
            rows: e.target.rows
        });
    };
    
    const showStatusHandler = () => {
        dispatch({ type: SHOW_STATUS_MODAL});
    };

    const submitPostHandler = () => {
        dispatch({ type: SUBMIT_POST });
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
        <React.Fragment>
            {
                state.showStatus &&
                <StatusModal showStatus={state.showStatus}
                    onCancelBackdrop={cancelStatusModalHandler}
                    onCloseStatus={cancelStatusModalHandler}
                    onChangePost={changePostHandler}
                    onSubmitPost={submitPostHandler}
                    value={state.status}
                    disabled={!state.status}
                    rows={state.rows}
                />
            }
            {
                state.showSlider &&
                <SliderModal showSlider={state.showSlider}
                    onCancelBackdrop={showHideSliderHandler}
                    closeSlider={showHideSliderHandler}
                />
            }

            {
                state.showWarningModal && (
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
                        <NavLink to="/home"><FontAwesomeIcon icon={faHome} size="1x" color="#9e9a9a" /></NavLink>
                        <NavLink to="/home"><FontAwesomeIcon icon={faHashtag} size="1x" color="#9e9a9a" /></NavLink>
                        <NavLink to="/home"><FontAwesomeIcon icon={faBell} size="1x" color="#9e9a9a" /></NavLink>
                        <NavLink to="/home"><FontAwesomeIcon icon={faEnvelope} size="1x" color="#9e9a9a" /></NavLink>
                    </div>
                    <div className={classes.searchBar}>
                        <FontAwesomeIcon icon={faSearch} size="1x" className={classes.searchIcon} />
                        <input type="text" placeholder="Search" />
                    </div>
                    <div className={classes.user} onClick={showSlideHandler}>
                        <Avatar small alt={authCtx.user?.firstName} src={sampleImg} />
                        <NavLink to="/home" className={classes.userLink}>{authCtx.user?.firstName}</NavLink>
                        <FontAwesomeIcon icon={faChevronDown} size="2x" color="#444" className={classes.chevDown} />
                    </div>
                </nav>
                <div className={classes.feedsContent}>
                    <div className={classes.feedsHeader}>
                        <div className={classes.headerTop}>
                            <h4>Home</h4>
                            <FontAwesomeIcon icon={faStar} color="#1aa1f5" size="2x" />
                        </div>
                        <div className={classes.headerPost}>
                            <Avatar small src={sampleImg} />
                            <input type="text" placeholder="What's up?" onClick={showStatusHandler} />
                        </div>
                    </div>
                    <Posts posts={posts} className={classes.posts} />
                    <Follows follows={follows} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;

