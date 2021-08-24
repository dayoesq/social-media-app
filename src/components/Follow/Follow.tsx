import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../shared/UI/Avatar/Avatar';
import Button from '../shared/form-elements/Button/Button';

import classes from './Follow.module.scss';

type FollowProps =  {
  src?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Follow: React.FC<FollowProps & IFollow> = props => {
  return (
    <div className={classes.followUser}>
      <Avatar big src={props.src} rightBig />
      <div className={classes.followUserInfo}>
        <h4>{props.followName}</h4>
        <p>{`@${props.followAlias}`}</p>
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

Follow.propTypes = {
  src: PropTypes.string,
  followName: PropTypes.string,
  followAlias: PropTypes.string,
  onClick: PropTypes.func
};


export default Follow;