import { useState, useEffect } from 'react';
import axios from 'axios';

const useGet = (url, options = {}) => {
    const {
        initialState = null,
        headers = {},
        autoFetch = true,
        timeout = 5000,
        retries = 0,
        onSuccess = () => { },
        onError = () => { }
    } = options;

    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const reload = () => {
        setRefetch(prev => !prev);
    };

    const fetchWithRetry = async (retriesLeft) => {
        try {
            const response = await axios.get(url, {
                headers,
                timeout
            });

            setData(response.data);
            setError(null);
            onSuccess(response.data);

        } catch (err) {
            if (retriesLeft > 0) {
                return fetchWithRetry(retriesLeft - 1);
            }

            const errorMessage = err.response?.data?.message || 'Error al obtener los datos';
            setError(errorMessage);
            setData(initialState);
            onError(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchWithRetry(retries);
            setLoading(false);
        };

        if (url && autoFetch) {
            fetchData();
        }

    }, [url, refetch]);

    return {
        data,
        loading,
        error,
        reload
    };
};

export default useGet;