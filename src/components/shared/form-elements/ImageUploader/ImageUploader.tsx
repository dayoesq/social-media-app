import React from 'react';
import PropTypes from 'prop-types';
// import { Widget } from '@uploadcare/react-widget';

type ImageUploaderProps = {
  label?: string;
  labelName?: string;
  id?: string;
}
const ImageUploader: React.FC<ImageUploaderProps> = props => {
  return (
    <p>
      <label htmlFor={props.label} id={props.label}>{props.labelName}</label>
      <input
        type="hidden"
        role="uploadcare-uploader"
        data-image-shrink="1024x1024"
        data-crop="4:3"
      />
    </p>
  );
};

ImageUploader.propTypes = {
  label: PropTypes.string,
  labelName: PropTypes.string,
  id: PropTypes.string
};

export default ImageUploader;

// import React from 'react';
// import PropTypes from 'prop-types';
// import { Widget } from '@uploadcare/react-widget';
// 
// type ImageUploaderProps = {
//   label?: string;
//   labelName?: string;
//   id?: string;
// }
// const ImageUploader: React.FC<ImageUploaderProps> = props => {
//   return (
//     <p>
//       <label htmlFor={props.label} id={props.label}>{props.labelName}</label>
//       <Widget
//         publicKey={process.env.REACT_APP_UPLOADCARE_PUB_KEY}
//         previewStep={true}
//         // tabs='gphotos, dropbox, crop, onedrive'
//       />
//     </p>
//   );
// };
// 
// ImageUploader.propTypes = {
//   label: PropTypes.string,
//   labelName: PropTypes.string,
//   id: PropTypes.string
// };
// 
// export default ImageUploader;
