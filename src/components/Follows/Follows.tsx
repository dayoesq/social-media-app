import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Follow from '../Follow/Follow';
import SubFooter from '../shared/UI/SubFooter/SubFooter';

import classes from '../Follow/Follow.module.scss';

type FollowsProps = {
  follows?: IFollow[];
};

const Follows: React.FC<FollowsProps> = (props) => {
  const followHandler = (id?: string) => {
    alert(id);
  };
  if (props.follows) {
    return (
      <div className={classes.follow}>
        <h4 className={classes.followHeading}>Who to follow</h4>
        {props.follows.map(follow => (
          <Follow
            key={follow._id}
            src={follow.followImage}
            followAlias={follow.followAlias}
            followName={follow.followName}
            onClick={() => followHandler(follow._id)}
          />
        ))}
        <div className={classes.followLink}>
          <NavLink to='/home'>Show more</NavLink>
        </div>
        <SubFooter className={classes.followFooter} />
      </div>
    );

  }
  return null;
   
};

Follows.propTypes = {
  follows: PropTypes.array
};

export default Follows;
