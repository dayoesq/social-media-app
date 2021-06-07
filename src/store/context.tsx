import React, { createContext } from 'react';
import PropTypes from 'prop-types';

type UserContext = {
  id: string | null,
  isLoggedIn: boolean,
  token: string | boolean | null
};

const authValue: UserContext = {
  id: null,
  isLoggedIn: false,
  token: ''
};

export const AuthContext = createContext<UserContext>({
  id: null,
  isLoggedIn: false,
  token: null
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