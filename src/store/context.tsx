import React, { createContext } from 'react';
import PropTypes from 'prop-types';

type UserContext = {
  token?: string | boolean;
  user?: IUser | null;
};

const authValue: UserContext = {
  token: '',
  user: null
};

export const AuthContext = createContext<UserContext>({
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