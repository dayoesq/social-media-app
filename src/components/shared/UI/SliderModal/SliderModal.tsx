import { FC } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Backdrop, { IBackdrop } from '../Backdrop/Backdrop';
import SidebarSlider, { SliderProps } from '../SidebarSlider/SidebarSlider';

type SliderModalProps = {
    showSlider?: boolean;
    props?: React.PropsWithChildren<SliderModalProps>;
};

const SliderOverlay: FC<SliderProps> = props => {
    const sidebarPortal = document.getElementById(
        'sidebar-portal'
    ) as HTMLElement;
    return ReactDOM.createPortal(<SidebarSlider {...props} />, sidebarPortal);
};

const SidebarModal: React.FC<
    SliderModalProps & IBackdrop & SliderProps
> = props => {
    return (
        <>
            <Backdrop {...props} />
            <SliderOverlay {...props} />
        </>
    );
};

SidebarModal.propTypes = {
    showSlider: PropTypes.bool,
    props: PropTypes.object
};

export default SidebarModal;
