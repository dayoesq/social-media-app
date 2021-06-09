import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

type SubFooter = {
    className?: string;
};

const SubFooter: React.FC<SubFooter> = (props) => {
    return (
        <footer className={props.className}>
            <ul>
                <li>
                    <Link to="/home">Terms</Link>
                </li>
                <li>
                    <Link to="/home">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/home">Cookies</Link>
                </li>
                <li>
                    <Link to="/home">About</Link>
                </li>
                <li>
                    <Link to="/home">More</Link>
                </li>
            </ul>
        </footer>
    );
};

SubFooter.propTypes = {
    className: PropTypes.string,
};
