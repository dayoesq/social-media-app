import { FC } from 'react';
import PropTypes from 'prop-types';

import classes from './Spinner.module.scss';

const Spinner: FC<{ asOverlay?: boolean }> = ({ asOverlay }) => {
    return (
        <div className={`${asOverlay && classes.overlay}`}>
            <div className={classes.spinner}></div>
        </div>
    );
};

Spinner.propTypes = {
    asOverlay: PropTypes.bool
};

export default Spinner;
