import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../shared/UI/Avatar/Avatar';
import Button from '../shared/form-elements/Button/Button';

import classes from './Friend.module.scss';

type FriendProps =  {
  src?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  alias?: string;
}

const Friend: React.FC<FriendProps & IUser> = props => {
  return (
    <div className={classes.friendUser}>
      <Avatar big src={props.src} rightBig />
      <div className={classes.friendUserInfo}>
        <h4>{props.firstName}</h4>
        <p>{`@${props.alias}`}</p>
      </div>
      <Button
        type='submit'
        primaryInverse
        small
        pillSmall
        style={{ marginLeft: 'auto' }}
        onClick={props.onClick}
      >
        Follow
      </Button>
    </div>
  );
};

Friend.propTypes = {
  alias: PropTypes.string,
  src: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onClick: PropTypes.func
};


export default Friend;