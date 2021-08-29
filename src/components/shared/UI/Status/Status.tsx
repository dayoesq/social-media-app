import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../Avatar/Avatar';
import { AuthContext } from '../../../../store/context';
import Button from '../../form-elements/Button/Button';

import classes from './Status.module.scss';
// import ImageUpload from '../../form-elements/ImageUpload/ImageUpload';
// import { useForm } from '../../../../hooks/form';

export type StatusProps = {
  onCloseStatus?: React.MouseEventHandler<SVGSVGElement>;
  onSubmitPost: React.MouseEventHandler<HTMLButtonElement>;
  status?: string;
  onChangePost?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string | number | readonly string[] | undefined;
  disabled?: boolean;
  rows?: number;
};

const Status: React.FC<StatusProps> = props => {
  const statusRef = useRef<HTMLTextAreaElement>(null);
  const authCtx = useContext(AuthContext);
  // const [formState, inputHandler] = useForm(
  //   {
  //     postImage: {
  //       isValid: false,
  //       value: null
  //     },
  //     postImages: {
  //       isValid: false,
  //       value: null
  //     },
  //     postBody: {
  //       isValid: false,
  //       value: ''
  //     }
  //   },
  //   false
  // );

  //   const submitPostHandler = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const postDetails = {
  //       postBody: formState.inputs?.postBody.value,
  //       postImage: formState.inputs?.postImage.value,
  //       postImages: formState.inputs?.postImages.value
  //     };
  //     props?.onSubmitPost(postDetails);
  // 
  //   };

  useEffect(() => {
    statusRef.current?.focus();
  }, []);

  return (
    <React.Fragment>
      <form className={classes.status}>
        <div className={classes.statusHeader}>
          <FontAwesomeIcon
            icon={faTimes}
            size='2x'
            color='#1aa1f5'
            className={classes.iconTimes}
            onClick={props.onCloseStatus}
          />
          <Button
            type='submit'
            primary
            small
            pillSmall
            // onClick={props.onSubmitPost}
            disabled={props.disabled}
          >
            Post
          </Button>
        </div>
        <div className={classes.statusBody}>
          <Avatar
            small
            rightSmall
            alt={authCtx.user?.firstName}
            src={`${process.env.REACT_APP_BACK_ASSETS}/${authCtx.user?.avatar}`}
          />
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
            {/* <ImageUpload id="image" onInput={inputHandler} errorText="Please provide a valid image"/> */}
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
      </form>
    </React.Fragment>
  );
};

Status.propTypes = {
  onCloseStatus: PropTypes.func,
  // onSubmitPost: PropTypes.func,
  status: PropTypes.string,
  onChangePost: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number
};

export default Status;

