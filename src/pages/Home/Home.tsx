import React, { useContext, useReducer, useEffect, useState } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import Avatar from '../../components/shared/UI/Avatar/Avatar';
import { AuthContext } from '../../store/context';
import Posts from '../../components/Posts/Posts';
import Friends from '../../components/Friends/Friends';
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
import { useHttpClient } from '../../hooks/http';
import Spinner from '../../components/shared/UI/Spinner/Spinner';

import classes from './Home.module.scss';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [friends, setFriends] = useState<IUser[]>([]);
  const authCtx = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [state, dispatch] = useReducer(homeReducer, {
    showStatus: false,
    showSlider: false,
    status: '',
    showWarningModal: false,
    rows: 5,
    minRows: 5,
    maxRows: 10,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchPostHandler = async () => {
      try {
        const res = await sendRequest<ResponseDataPosts>(`${process.env.REACT_APP_BACK_URL}/posts`,
          'GET',
          null,
          { Authorization: `Bearer ${authCtx.token}` });
        setPosts(res.data);
      } catch (err) { }
    };
    if (isMounted) fetchPostHandler();
    return () => {
      isMounted = false;
    };
  }, [sendRequest, authCtx.token]);
  
  useEffect(() => {
    let isMounted = true;
    const fetchFriendsHandler = async () => {
      try {
        const res = await sendRequest<ResponseDataUsers>(`${process.env.REACT_APP_BACK_URL}/users/friends`,
          'GET',
          null,
          { Authorization: `Bearer ${authCtx.token}` });
        setFriends(res.data);
      } catch (err) { }
    };
    if (isMounted) fetchFriendsHandler();
    return () => {
      isMounted = false;
    };
  }, [sendRequest, authCtx.token]);

  const changePostHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: CHANGE_POST_STATUS,
      value: e.target.value,
      scrollHeight: e.target.scrollHeight,
      scrollTop: e.target.scrollTop,
      rows: e.target.rows,
    });
  };

  const showStatusHandler = () => {
    dispatch({ type: SHOW_STATUS_MODAL });
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
      {state.showStatus && (
        <StatusModal
          showStatus={state.showStatus}
          onCancelBackdrop={cancelStatusModalHandler}
          onCloseStatus={cancelStatusModalHandler}
          onChangePost={changePostHandler}
          onSubmitPost={submitPostHandler}
          value={state.status}
          disabled={!state.status}
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
          warningHeading="Discard Post?"
          warningText="Do you really want to discard this post?"
          onDiscard={removeWarningModalHandler}
          onCancel={cancelWarningModalHandler}
          onClick={cancelWarningModalHandler}
        />
      )}

      <div className={classes.feedsPage}>
        <nav className={classes.feedsNav}>
          <div className={classes.feedsIcons}>
            <NavLink to="/home">
              <FontAwesomeIcon
                icon={faHome}
                size="1x"
                color="#9e9a9a"
              />
            </NavLink>
            <NavLink to="/home">
              <FontAwesomeIcon
                icon={faHashtag}
                size="1x"
                color="#9e9a9a"
              />
            </NavLink>
            <NavLink to="/home">
              <FontAwesomeIcon
                icon={faBell}
                size="1x"
                color="#9e9a9a"
              />
            </NavLink>
            <NavLink to="/home">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="1x"
                color="#9e9a9a"
              />
            </NavLink>
          </div>
          <div className={classes.searchBar}>
            <FontAwesomeIcon
              icon={faSearch}
              size="1x"
              className={classes.searchIcon}
            />
            <input type="text" placeholder="Search" />
          </div>
          <div className={classes.user} onClick={showSlideHandler}>
            <Avatar
              small
              alt={authCtx.user?.firstName}
              src={`${process.env.REACT_APP_BACK_ASSETS}/${authCtx.user?.avatar}`}
            />
            <NavLink to="/home" className={classes.userLink}>
              {authCtx.user?.firstName}
            </NavLink>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="2x"
              color="#444"
              className={classes.chevDown}
            />
          </div>
        </nav>
        {isLoading && <Spinner />}
        <div className={classes.feedsContent}>
          <div className={classes.feedsHeader}>
            <div className={classes.headerTop}>
              <h4>Home</h4>
              <FontAwesomeIcon
                icon={faStar}
                color="#1aa1f5"
                size="2x"
              />
            </div>
            <div className={classes.headerPost}>
              <Avatar small src={`${process.env.REACT_APP_BACK_ASSETS}/${authCtx.user?.avatar}`} />
              <input
                type="text"
                placeholder="What's up?"
                onClick={showStatusHandler}
              />
            </div>
          </div>
          <Posts posts={posts} className={classes.posts} />
          <Friends friends={friends} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
