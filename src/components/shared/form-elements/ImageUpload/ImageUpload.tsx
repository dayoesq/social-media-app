import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

type ImageProps = {
  id: string;
  errorText?: string;
  onInput: (id: string, pickedFile: File, isValid: boolean) => void;
}

const ImageUpload: React.FC<ImageProps> = props => {
  const [file, setFile] = useState<File | undefined>();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };

  const pickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile: any;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div>
      <input
        type='file'
        id={props.id}
        ref={filePickerRef}
        accept='.jpg, .jpeg, .png'
        style={{ display: 'none' }}
        onChange={pickHandler}
      />
      <div>
        <FontAwesomeIcon
          icon={faImage}
          size='2x'
          color='#1aa1f5'
          onClick={pickImageHandler}
          // className={classes.icon}
        />
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

ImageUpload.propTypes = {
  id: PropTypes.any,
  errorText: PropTypes.string,
  onInput: PropTypes.any
};

export default ImageUpload;
