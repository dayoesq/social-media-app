import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
// import Status from '../../components/shared/UI/Status/Status';
// import Posts from '../../components/Posts/Posts';
// import Follows from '../../components/Follows/Follows';
// import SidebarSlider from '../../components/shared/UI/SidebarSlider/SidebarSlider';
// // import SidebarModal from '../../components/shared/UI/S'
import StatusModal from '../../components/shared/UI/StatusModal/StatusModal';
// // import WarningModal from '../../shared/components/ui-elements/WarningModal';
// // import WarningBackdrop from '../../shared/components/ui-elements/WarningBackdrop';

import sampleImg from '../../assets/images/sample-img.jpg'

import classes from './Home.module.scss';
import Backdrop from '../../components/shared/UI/Backdrop/Backdrop';

const Home: React.FC = () => {
    const authCtx = useContext(AuthContext);
    const [showStatus, setShowStatus] = useState<boolean>(false);

    return (
        <React.Fragment>
             <StatusModal
                showStatus={showStatus}
            />
            {showStatus && (
                <Backdrop show={showStatus} onClick={() => setShowStatus(false)}/>
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
                    <div className={classes.user} onClick={() => alert('Drawer')}>
                        <Avatar small alt="Ola" src={sampleImg} />
                        <NavLink to="/home" className={classes.userLink}>{authCtx.user?.firstName}</NavLink>
                        <FontAwesomeIcon icon={faChevronDown} size="2x" color="#444" />
                    </div>
                </nav>
                <div className={classes.feedsContent}>
                    <div className={classes.feedsHeader}>
                        <div className={classes.headerTop}>
                            <h4>Home</h4>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className={classes.headerPost}>
                            <Avatar small src={sampleImg} />
                            <input type="text" placeholder="What's up?" onClick={() => setShowStatus(true)} />
                        </div>
                    </div>
                    {/* <Posts
            posts={posts}
            className="Posts"
            comments={comments}
            commentUsername={user.username}
            commentUserImage={user.userImage}
            onKeyPress={sendComment}
            onShowEmoji={onShowEmoji}
            showPostHandler={showPostHandler}
            commentAuthorImage={commentAuthor.image}
            commentAuthorName={commentAuthor.name}
          /> */}
                    {/* <Follows follows={follows} /> */}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
