import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const useFetchAxios = (
  dataUrl: string,
  options?: AxiosRequestConfig
) => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
        setIsLoading(true);
        try {
          const response = await axios.get(dataUrl, {
            signal: controller.signal,
            ...options,
          });
          setResponse(response);
        } catch (err) {
          setError(err as AxiosError);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const cleanUp = () => {
      controller.abort();
      isMounted = false;
    };

    fetchData();

    return cleanUp;
  }, [dataUrl, options]);

  return [response, error, isLoading];
};
