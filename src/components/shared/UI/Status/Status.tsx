import React, { useRef, useEffect, useContext, MutableRefObject } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faTimes } from "@fortawesome/free-solid-svg-icons";

import Avatar from "../Avatar/Avatar";
import { AuthContext } from "../../../../store/context";
import Button from "../../form-elements/Button/Button";
import { useForm } from "@dayoesq/input-component";
import ImageUploader from "../../form-elements/ImageUploader/ImageUploader";

import classes from "./Status.module.scss";

export type StatusProps = {
  onCloseStatus?: React.MouseEventHandler<SVGSVGElement>;
  onSubmitPost?: any;
  onChangePost?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string | number | readonly string[] | undefined;
  disabled?: boolean;
  rows?: number;
};

const Status: React.FC<StatusProps> = (props) => {
  const statusRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const authCtx = useContext(AuthContext);
  const [formState, inputHandler] = useForm<{
    postBody: {
      isValid: boolean;
      value: string;
    };
    postImages: {
      isValid: boolean;
      value: string[];
    };
  }>(
    {
      postBody: {
        isValid: false,
        value: "",
      },
      postImages: {
        isValid: false,
        value: [],
      },
    },
    false
  );

  const submitPostHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postBody", formState.inputs?.postBody.value);
    formData.append("postImages", formState.inputs?.postImages.value[0]);
    formData.append("postImages", formState.inputs?.postImages.value[1]);
    formData.append("postImages", formState.inputs?.postImages.value[2]);
    formData.append("postImages", formState.inputs?.postImages.value[3]);
    formData.append("postImages", formState.inputs?.postImages.value[4]);
    props.onSubmitPost(formData);
  };

  useEffect(() => {
    statusRef.current?.focus();
  }, []);

  return (
    <React.Fragment>
      <form
        className={classes.status}
        onSubmit={submitPostHandler}
        encType="multipart/form-data"
      >
        <div className={classes.statusHeader}>
          <FontAwesomeIcon
            icon={faTimes}
            size="2x"
            color="#1aa1f5"
            className={classes.iconTimes}
            onClick={props.onCloseStatus}
          />
          <Button
            type="submit"
            primary
            small
            pillSmall
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
          <label htmlFor="postBody"></label>
          <textarea
            className={classes.statusInput}
            ref={statusRef}
            id="postBody"
            name="postBody"
            placeholder={`What's on your mind ${authCtx.user?.firstName}?`}
            value={props.value}
            onChange={props.onChangePost}
            rows={props.rows}
          />
        </div>
        <div className={classes.statusFooter}>
          <div className={classes.statusIcons}>
            <FontAwesomeIcon
              icon={faSmile}
              size="2x"
              color="#1aa1f5"
              className={classes.icon}
            />
          </div>
          <ImageUploader
            id="postImages"
            accept=".png, .jpeg, .jpg"
            onInput={inputHandler}
            iconClassName={classes.imageUploader}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

Status.propTypes = {
  onCloseStatus: PropTypes.func,
  onSubmitPost: PropTypes.func,
  // status: PropTypes.string,
  onChangePost: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
};

export default Status;
