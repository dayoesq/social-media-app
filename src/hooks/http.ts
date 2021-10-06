import { useState, useCallback, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../store/context';
import {
  LOG_IN_OR_SIGN_UP, 
  LOG_USER_OUT, 
  USER_DOES_NOT_EXIST, 
  USER_NOT_FOUND
} from '../utils/constants';

type Body = {
    [key: string]: string
}

type HttpRequest = {
    isLoading: boolean;
    error: string[] | null;
    clearError: () => void;
    sendRequest:<Type> (
        url: RequestInfo,
        method?: string,
        body?: string | null,
        headers?: Body
    ) => Promise<Type>;
};

export const useHttpClient = (): HttpRequest => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[] | null>([]);
  const authCtx = useContext(AuthContext);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      const httpAbortCtrl: AbortController = new AbortController();
      setIsLoading(true);
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        const initialError: string[] = [];
        const errors = err.message.split('.');
        if (errors.length > 0) {
          errors.forEach((err: string) => {
            if (err.includes('Cast to ObjectId')) {
              err = `Invalid ${err.split('path')[1]} id`;
            } 
            initialError.push(err);
            setError(initialError);
          });
        }
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const errorMessage = [
      LOG_IN_OR_SIGN_UP,
      USER_DOES_NOT_EXIST,
      LOG_USER_OUT,
      USER_NOT_FOUND
    ];
    if (error) {
      error.forEach(err => {
        if (errorMessage.includes(err)) {
          authCtx.logout();
        }
      });
    }
  }, [authCtx, error]);


  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) clearError();
    return () => {
      isMounted = false;
    };
  }, [error]);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) =>
        abortCtrl.abort()
      );
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
