import React, { useRef, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faSmile,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import Avatar from '../Avatar/Avatar';
// import WarningModal from '../WarningModal/WarningModal';
import { AuthContext } from '../../../../store/context';

import sampleUser from '../../../../assets/images/sample-img.jpg';

import classes from './Status.module.scss';
import { isEmpty } from '../../../../utils/helpers';
// import Backdrop from '../Backdrop/Backdrop';

export type StatusProps = {
  onCloseStatus?: React.MouseEventHandler<SVGSVGElement>;
};

const Status: React.FC<StatusProps> = props => {
  const statusRef = useRef<any | null | string | undefined>(undefined);
  const [statusPost, setStatusPost] = useState('');
  // const [showWarningModal, setShowWarningModal] = useState(false);
  const authCtx = useContext(AuthContext);

  const postStatusHandler = () => {
    if (isEmpty(statusRef.current.textContent)) return;
      alert(statusRef.current.textContent);
  };

  const setPostHandler = () => {
    if (isEmpty(statusRef.current.textContent)) return;
    setStatusPost(statusRef.current.textContent);
  };

  // const cancelWarningHandler = () => {
  //   setShowWarningModal(false);
  // };

  // const discardHandler = () => {
  //   setShowWarningModal(false);
  // };

  // const closeWarning = () => {
  //   if (isEmpty(statusRef.current.textContent)) {
  //     setShowWarningModal(false);
  //   } else {
  //     setShowWarningModal(true);
  //   }
  // };
// 
//   const checkText = () => {
// 
//   }

  useEffect(() => {
    statusRef.current.focus();
  });

  return (
    <React.Fragment>
       {/* <WarningModal
                showWarningModal={showWarningModal}
            />
            {showWarningModal && (
                <Backdrop show={showWarningModal} onClick={cancelWarningHandler}/>
            )} */}
      <div className={classes.status}>
        <div className={classes.statusHeader}>
          <FontAwesomeIcon
            icon={faTimes}
            size='2x'
            color='#1aa1f5'
            className={classes.iconTimes}
            onClick={props.onCloseStatus}
          />
          <button
            type='submit'
            onClick={() => {
              postStatusHandler();
              setPostHandler();
            }}
            // disabled={statusRef.current.textContent }
          >
            Post
          </button>
        </div>
        <div className={classes.statusBody}>
          <Avatar
            small
            rightSmall
            alt='User'
            src={sampleUser} />
          <p
            contentEditable={true}
            placeholder={`What's up ${authCtx.user?.firstName}?`}
            className={classes.statusInput}
            ref={statusRef}
            suppressContentEditableWarning={true}
          >
            {statusPost}
          </p>
        </div>
        <div className={classes.footer}>
          <div className={classes.statusIcons}>
            <FontAwesomeIcon
              icon={faImage}
              size='2x'
              color='#1aa1f5'
              className={classes.icon}
            />
            <FontAwesomeIcon
              icon={faSmile}
              size='2x'
              color='#1aa1f5'
              className={classes.icon}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Status.propTypes = {
  onCloseStatus: PropTypes.func
}


export default Status;
