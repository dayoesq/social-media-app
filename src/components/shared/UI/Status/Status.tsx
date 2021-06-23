import React, { useRef, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../Avatar/Avatar';
import { AuthContext } from '../../../../store/context';

import sampleUser from '../../../../assets/images/sample-img.jpg';

import classes from './Status.module.scss';
// import { isEmpty } from '../../../../utils/helpers';
import Button from '../../form-elements/Button/Button';
import WarningModal from '../WarningModal/WarningModal';

export type StatusProps = {
  onCloseStatus?: React.MouseEventHandler<SVGSVGElement>
};

const Status: React.FC<StatusProps> = props => {
  const statusRef = useRef<any | null | string | undefined>('');
  // const [statusPost, setStatusPost] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const authCtx = useContext(AuthContext);

  const closeWarning = () => {
    if (statusRef.current.textContent.length === 0) {
      setShowWarningModal(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    statusRef.current.focus();
  }, []);

  return (
    <React.Fragment>
      {showWarningModal && (
        <WarningModal
          showWarning={showWarningModal}
          warningHeading='Discard Post?'
          warningText='Do you really want to discard this post?'
          onDiscard={() => setShowWarningModal(false)}
          onCancel={closeWarning}
          onClick={closeWarning}
        />
      )}
      <div className={classes.status}>
        <div className={classes.statusHeader}>
          <FontAwesomeIcon
            icon={faTimes}
            size='2x'
            color='#1aa1f5'
            className={classes.iconTimes}
            onClick={props.onCloseStatus}
          />
          <Button type='button' primary small pillSmall>
            Post
          </Button>
        </div>
        <div className={classes.statusBody}>
          <Avatar small rightSmall alt='User' src={sampleUser} />
          <label htmlFor='statusPost'></label>
          <p
            contentEditable={true}
            placeholder={`What's up ${authCtx.user?.firstName}?`}
            className={classes.statusInput}
            ref={statusRef}
            suppressContentEditableWarning={true}
          >
            {/* {statusPost} */}
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
};

export default Status;
