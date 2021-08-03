import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../Avatar/Avatar';
import { AuthContext } from '../../../../store/context';

import Button from '../../form-elements/Button/Button';

import classes from './Status.module.scss';
import sampleUser from '../../../../assets/images/sample-img.jpg';

export type StatusProps = {
  onCloseStatus?: React.MouseEventHandler<SVGSVGElement>;
  onSubmitPost?: React.MouseEventHandler<HTMLButtonElement>;
  status?: string;
  onChangePost?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string | number | readonly string[] | undefined;
  disabled?: boolean;
  rows?: number;
};

const Status: React.FC<StatusProps> = props => {
  const statusRef = useRef<HTMLTextAreaElement>(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    statusRef.current?.focus();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.status}>
        <div className={classes.statusHeader}>
          <FontAwesomeIcon
            icon={faTimes}
            size='2x'
            color='#1aa1f5'
            className={classes.iconTimes}
            onClick={props.onCloseStatus}
          />
          <Button type='button' primary small pillSmall onClick={props.onSubmitPost} disabled={props.disabled}>
            Post
          </Button>
        </div>
        <div className={classes.statusBody}>
          <Avatar small rightSmall alt='User' src={sampleUser} />
          <label htmlFor='status'></label>
          <textarea
            className={classes.statusInput}
            ref={statusRef}
            id="status"
            placeholder={`What's on your mind ${authCtx.user?.firstName}?`}
            value={props.value}
            onChange={props.onChangePost}
            rows={props.rows}
          />
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
  onCloseStatus: PropTypes.func,
  onSubmitPost: PropTypes.func,
  status: PropTypes.string,
  onChangePost: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number
};

export default Status;

