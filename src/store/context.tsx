import { createContext } from 'react';
// import PropTypes from 'prop-types';

type UserContext = {
  token?: string | boolean;
  user?: IUser | null;
  login: (token?: string, user?: IUser, date?: Date) => void;
  logout: () => void;
};

// const authValue: UserContext = {
//   token: '',
//   user: null,
//   login: () => { },
//   logout: () => { }
// };

export const AuthContext = createContext<UserContext>({
  token: '',
  user: null,
  login: () => { },
  logout: () => { }
});

// const AuthContextProvider: React.FC = ({ children }) => {
//   return (
//     <AuthContext.Provider value={authValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// 
// AuthContextProvider.propTypes = {
//   children: PropTypes.node
// };

export default AuthContext;