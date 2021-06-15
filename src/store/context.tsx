import React, { createContext } from 'react';
import PropTypes from 'prop-types';

type UserContext = {
  id?: string | null;
  isLoggedIn?: boolean;
  token?: string | boolean | null;
  user?: IUser | null;
  post?:  IPost | null
};

const authValue: UserContext = {
  id: null,
  isLoggedIn: false,
  token: '' || null,
  user: null,
  post: null
};

export const AuthContext = createContext<UserContext>({
  id: null,
  isLoggedIn: false,
  token: null,
  user: null,
  post: null
});

const AuthContextProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node
};

export default AuthContextProvider;