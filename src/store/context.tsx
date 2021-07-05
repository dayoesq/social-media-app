import React, { createContext } from 'react';
import PropTypes from 'prop-types';

type UserContext = {
  id?: string;
  isLoggedIn?: boolean;
  token?: string | boolean;
  user?: IUser | null;
};

const authValue: UserContext = {
  id: '',
  isLoggedIn: false,
  token: '',
  user: null
};

export const AuthContext = createContext<UserContext>({
  id: '',
  isLoggedIn: false,
  token: '',
  user: null
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