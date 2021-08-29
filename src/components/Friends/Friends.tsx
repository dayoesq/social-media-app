import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Follow from '../Friend/Friend';
import SubFooter from '../shared/UI/SubFooter/SubFooter';

import classes from '../Friend/Friend.module.scss';

type FriendsProps = {
  friends?: IUser[];
};

const Friends: React.FC<FriendsProps> = (props) => {
  const followHandler = (id?: string) => {
    alert(id);
  };
  if (props.friends) {
    if(props.friends.length > 0) {
      return (
        <div className={classes.friend}>
          <h4 className={classes.friendHeading}>Some possible friends</h4>
          {props.friends.map(friend => (
            <Follow
              key={friend._id}
              src={`${process.env.REACT_APP_BACK_ASSETS}/${friend.avatar}`}
              alias={friend.lastName?.toLocaleLowerCase()}
              firstName={friend.firstName}
              onClick={() => followHandler(friend._id)}
            />
          ))}
          <div className={classes.friendLink}>
            <NavLink to='/home'>Show more</NavLink>
          </div>
          <SubFooter className={classes.friendFooter} />
        </div>
      );
    } else {
      return null;
    }
  }
  return null;
   
};

Friends.propTypes = {
  friends: PropTypes.array
};

export default Friends;
