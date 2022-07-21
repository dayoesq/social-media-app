import { useState, useEffect, useCallback } from 'react';
import { UserContext } from '../store/context';

// let logoutTimer: any;
let logoutTimer: NodeJS.Timeout;
export const useAuth = (): UserContext => {
    const [token, setToken] = useState<string | undefined>('');
    const [user, setUser] = useState<IUser | undefined>({});
    const [tokenExpirationDate, setTokenExpirationDate] = useState<
        Date | undefined
    >();

    const login = useCallback(
        (token?: string, user?: IUser, expirationDate?: Date) => {
            setUser(user);
            setToken(token);
            const tokenExpirationDate =
                expirationDate || new Date(new Date().getTime() + 86400000);
            setTokenExpirationDate(tokenExpirationDate);
            sessionStorage.setItem(
                'user',
                JSON.stringify({
                    token,
                    user,
                    expiration: tokenExpirationDate.toISOString()
                })
            );
        },
        []
    );
    // Empty session storage of context data
    const logout = useCallback(() => {
        setUser(undefined);
        setToken('');
        setTokenExpirationDate(undefined);
        sessionStorage.removeItem('user');
    }, []);

    useEffect(() => {
        if (token && token.length > 0 && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();

            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('user')!);
        if (
            storedData &&
            storedData.token.length > 0 &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(
                storedData.token,
                storedData.user,
                new Date(storedData.expiration)
            );
        }
    }, [login]);
    return { token, user, logout, login };
};
