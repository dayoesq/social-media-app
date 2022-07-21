import { createContext } from 'react';

export type UserContext = {
    token: string | undefined;
    user: IUser | undefined;
    login: (token?: string, user?: IUser, date?: Date) => void;
    logout: () => void;
};

export const AuthContext = createContext<UserContext>({
    token: '',
    user: undefined,
    login: (token, user, date) => {},
    logout: () => {}
});

export default AuthContext;
