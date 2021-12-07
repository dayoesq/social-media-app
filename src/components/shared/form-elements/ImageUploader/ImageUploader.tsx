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
  const [error, setError] = useState<any>();

  const filePickerRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const len = files.length;
    if (len > 0) {
      const reader = new FileReader();
      const previewStr: string[] = [];
      const read = (i: number) => {
        if (i < len) {
          const file = files[i];
          reader.onloadend = () => {
            previewStr.push(reader.result as string);
            read(i + 1);
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
    const len = files?.length as number;
    let pickedFile: any;
    let fileIsValid = isValid;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.size > 3000000) {
          setIsValid(false);
          fileIsValid = false;
          setError("Invalid file size");
          return;
        }
      });
    }
    if (files && len > 0 && len < 6) {
      pickedFile = files;
      setFiles(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
      setError("Only 5 images allowed per upload!");
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
            previewUrls.map((preview: string, i: number) => (
              <li key={i}>
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
      {!isValid && <p className={classes.errorText}>{error}</p>}
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
