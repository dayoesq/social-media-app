import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Warning, { IWarning } from '../Warning/Warning';
import WarningBackdrop, { IWarningBackdrop } from '../WarningBackdrop/WarningBackdrop';

type WarningModalProps = {
  showWarning?: boolean;
  props?: React.PropsWithChildren<WarningModalProps>;
};

const WarningOverlay: React.FC<WarningModalProps> = props => {
  const warningPortal = document.getElementById('warning-portal') as HTMLElement;
  return ReactDOM.createPortal(<Warning {...props} />, warningPortal);
};

const WarningModal: React.FC<WarningModalProps &
  IWarningBackdrop &
  IWarning> = props => {
    return (
      <React.Fragment>
        <WarningBackdrop {...props} />
        <WarningOverlay {...props} />
      </React.Fragment>
    );
  };

WarningModal.propTypes = {
  showWarning: PropTypes.bool,
  props: PropTypes.object
};

export default WarningModal;
