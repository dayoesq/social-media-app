import { createContext } from 'react';

export type UserContext = {
    token: string | undefined;
    user: IUser | null | undefined;
    login: (token?: string, user?: IUser, date?: Date) => void;
    logout: () => void;
};

export const AuthContext = createContext<UserContext>({
    token: '',
    user: null,
    login: () => {},
    logout: () => {},
});

export default AuthContext;
