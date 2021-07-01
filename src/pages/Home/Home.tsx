import React, { useContext, useState } from 'react';
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


import sampleImg from '../../assets/images/sample-img.jpg';
import img1 from '../../assets/images/Finnsh Cat.jpeg';
import img2 from '../../assets/images/helsinki-church.jpeg';


import classes from './Home.module.scss';
import { isEmpty } from '../../utils/helpers';


const Home: React.FC = () => {
    const authCtx = useContext(AuthContext);
    const [showStatus, setShowStatus] = useState<boolean>(false);
    const [showSlider, setShowSlider] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);

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

    const submitPostHandler = () => {
        setShowStatus(false);
        console.log(status);
    };

    const cancelModalHandler = () => {
        if (isEmpty(status)) {
            setShowStatus(false);
        } else {
            setShowWarningModal(true);
        }
    };

    const removeWarningModalHandler = () => {
        setStatus('');
        setShowWarningModal(false);
        setShowStatus(false);
    };

    return (
        <React.Fragment>
            {
                showStatus &&
                <StatusModal showStatus={showStatus}
                    onCancelBackdrop={cancelModalHandler}
                    onCloseStatus={cancelModalHandler}
                    onChangePost={e => setStatus(e.target.value)}
                    onSubmitPost={submitPostHandler}
                    value={status}
                    disabled={!status}
                />
            }
            {
                showSlider &&
                <SliderModal showSlider={showSlider}
                    onCancelBackdrop={() => setShowSlider(false)}
                    closeSlider={() => setShowSlider(false)}
                />
            }

            {
                showWarningModal && (
                    <WarningModal
                        showWarning={showWarningModal}
                        warningHeading='Discard Post?'
                        warningText='Do you really want to discard this post?'
                        onDiscard={removeWarningModalHandler}
                        onCancel={() => setShowWarningModal(false)}
                        onClick={() => setShowWarningModal(false)}
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
                    <div className={classes.user} onClick={() => setShowSlider(true)}>
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
                            <input type="text" placeholder="What's up?" onClick={() => setShowStatus(true)} />
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
