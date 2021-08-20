import { useState, useEffect, useCallback } from 'react';

let logoutTimer: NodeJS.Timeout;
export const useAuth = () => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<IUser>();
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();

  const login = useCallback(
    (token, user, expirationDate) => {
      setUser(user);
      setToken(token);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 86400000)
      setTokenExpirationDate(tokenExpirationDate)
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
    setTokenExpirationDate(null);
    sessionStorage.removeItem('user');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime()

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem('user')!)
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.user,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);
  return { token, user, logout, login };
};