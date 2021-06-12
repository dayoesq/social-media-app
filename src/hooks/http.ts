import { useState, useCallback, useRef, useEffect } from 'react';

type HttpRequest = {
    isLoading: boolean;
    error: string[] | null;
    clearError: () => void;
    sendRequest: (
        url: string,
        method?: string,
        body?: string,
        headers?: Record<string, unknown>
    ) => Promise<unknown>;
};

export const useHttpClient = (): HttpRequest => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string[] | null>([]);

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
            } catch (err) {
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

    const clearError = () => {
        setTimeout(() => {
            setError(null);
        }, 5000);
    };

    useEffect(() => {
        clearError();
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
