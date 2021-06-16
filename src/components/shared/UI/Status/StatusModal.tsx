import React from 'react';
import Backdrop, { IBackdrop } from '../Backdrop/Backdrop';
import Status from './Status';

const StatusModal: React.FC<IBackdrop> = props => {
  return (
    <React.Fragment>
      <Backdrop {...props}>
        <Status />
      </Backdrop>
    </React.Fragment>
  );
};

export default StatusModal;