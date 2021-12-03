import React, {
  FC,
  useRef,
  useState,
  useEffect,
  MutableRefObject,
} from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import classes from "./ImageUploader.module.scss";

type ImageUploaderProps = {
  id?: string;
  onInput: (...args: any) => void;
  errorText?: string;
  center?: boolean;
  accept?: string;
  width?: string;
  height?: string;
  iconClassName?: string;
};

const ImageUploader: FC<ImageUploaderProps> = (props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  const filePickerRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const len = files.length;
    if (len > 0) {
      const reader = new FileReader();
      const previewStr: string[] = [];
      const read = (index: number): void => {
        if (index < len) {
          const file = files[index];
          reader.onloadend = () => {
            previewStr.push(reader.result as string);
            read(index + 1);
          };
          reader.readAsDataURL(file);
        } else {
          setPreviewUrls(previewStr);
        }
      };
      read(0);
    }
  }, [files]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    let pickedFile: any;
    let fileIsValid = isValid;
    if (files && files.length > 0) {
      pickedFile = files;
      setFiles(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <>
      <input
        type="file"
        id={props.id}
        ref={filePickerRef}
        accept={props.accept}
        style={{ display: "none" }}
        onChange={pickHandler}
        multiple
      />
      <div
        className={`${classes.imageUpload} ${props.center && classes.center}`}
      >
        <ul
          className={classes.imageUpload__preview}
          style={{
            width: `${props.width}`,
            height: `${props.height}`,
          }}
        >
          {previewUrls &&
            previewUrls.map((preview: string, index: number) => (
              <li key={index}>
                <img
                  src={preview}
                  alt="Preview"
                  height={"5rem"}
                  width={"5rem"}
                />
              </li>
            ))}
        </ul>
        <FontAwesomeIcon
          icon={faImage}
          onClick={pickImageHandler}
          className={props.iconClassName}
        />
      </div>
      {!isValid && <p className={classes.errorText}>{props.errorText}</p>}
    </>
  );
};

ImageUploader.propTypes = {
  id: PropTypes.string,
  onInput: PropTypes.any,
  center: PropTypes.bool,
  accept: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  iconClassName: PropTypes.string,
};

export default ImageUploader;
