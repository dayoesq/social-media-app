import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove } from '@fortawesome/free-solid-svg-icons';

const SubNav: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <nav className={className}>
            <ul>
                <li>
                    <Link to='/'>
                        <FontAwesomeIcon
                            icon={faDove}
                            size='2x'
                            color='#1aa1f5'
                        ></FontAwesomeIcon>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/about'></Link>
                </li>
                <li>
                    <Link to='/language'>Language: English</Link>
                </li>
            </ul>
        </nav>
    );
};

SubNav.propTypes = {
    className: PropTypes.string,
};

export default SubNav;
