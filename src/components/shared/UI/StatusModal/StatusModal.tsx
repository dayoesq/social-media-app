import React from 'react';

// import Backdrop from '../Backdrop/Backdrop';

import Status from '../Status/Status';

const StatusModal: React.FC<{showStatus: boolean}> = props => {
  return (
    <React.Fragment>
      {props.showStatus && <Status {...props}/>}
    </React.Fragment>
  );
};


export default StatusModal;
