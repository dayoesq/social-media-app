import { createContext } from 'react';

type UserContext = {
  token?: string | boolean;
  user?: IUser | null;
  login: (token?: string, user?: IUser, date?: Date) => void;
  logout: () => void;
};

export const AuthContext = createContext<UserContext>({
  token: '',
  user: null,
  login: () => { },
  logout: () => { }
});

export default AuthContext;