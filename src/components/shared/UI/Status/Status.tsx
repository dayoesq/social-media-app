import React, { useRef, useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage,
    faCamera,
    faChartBar,
    faSmile,
    faTimes
} from '@fortawesome/free-solid-svg-icons'
import Avatar from '../Avatar/Avatar';
import WarningModal from '../WarningModal/WarningModal';
import { AuthContext } from '../../../../store/context';

import sampleUser from '../../../../assets/images/sample-img.jpg';

import classes from './Status.module.scss';
import { isEmpty } from '../../../../utils/helpers';


const Status: React.FC = () => {
  const statusRef = useRef<any>(null);
  const [statusPost, setStatusPost] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const authCtx = useContext(AuthContext);

  const postStatusHandler = () => {
    if (isEmpty(statusRef.current.textContent)) return;
      alert(statusRef.current.textContent);
  };

  const setPostHandler = () => {
    if (isEmpty(statusRef.current.textContent)) return;
    setStatusPost(statusRef.current.textContent);
  };

  const cancelWarningHandler = () => {
    setShowWarningModal(false);
  };

  const discardHandler = () => {
    setShowWarningModal(false);
  };

  const closeWarning = () => {
    if (isEmpty(statusRef.current.textContent)) {
      setShowWarningModal(false);
    } else {
      setShowWarningModal(true);
    }
  };

  useEffect(() => {
    statusRef.current.focus();
  });

  return (
    <React.Fragment>
      {showWarningModal && (
        <WarningModal
          onCancel={cancelWarningHandler}
          onDiscard={discardHandler}
          warningText='Once deleted, the post is gone!'
          warningHeading='Discard Post?'
        />
      )}
      <div className={classes.status}>
        <div className={classes.statusHeader}>
          <FontAwesomeIcon
            icon={faTimes}
            size='2x'
            color='#1aa1f5'
            onClick={closeWarning}
          />
          <button
            type='submit'
            onClick={() => {
              postStatusHandler();
              setPostHandler();
            }}
            disabled={isEmpty(statusRef.current.textContent)}
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
            />
            <FontAwesomeIcon
              icon={faCamera}
              size='2x'
              color='#1aa1f5'
            />
            <FontAwesomeIcon
              icon={faChartBar}
              size='2x'
              color='#1aa1f5'
            />
            <FontAwesomeIcon
              icon={faSmile}
              color='#1aa1f5'
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};


export default Status;