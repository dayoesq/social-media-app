import { FC } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Status, { StatusProps } from '../Status/Status';
import Backdrop, { IBackdrop } from '../Backdrop/Backdrop';

type StatusModalProps = {
    showStatus?: boolean;
    props?: React.PropsWithChildren<StatusModalProps>;
};

const StatusOverlay: React.FC<StatusProps> = props => {
    const statusPortal = document.getElementById(
        'status-portal'
    ) as HTMLElement;
    return ReactDOM.createPortal(<Status {...props} />, statusPortal);
};

const StatusModal: FC<StatusModalProps & IBackdrop & StatusProps> = props => {
    return (
        <>
            <Backdrop {...props} />
            <StatusOverlay {...props} />
        </>
    );
};

StatusModal.propTypes = {
    showStatus: PropTypes.bool,
    props: PropTypes.object
};

export default StatusModal;
