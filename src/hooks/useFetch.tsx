import { useEffect, useState } from "react";
import { useCache } from "../contexts/Cache";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

type CustomAxiosConfig = AxiosRequestConfig & {
  key: string;
  initialEnabled?: boolean;
  cache?: {
    enabled?: boolean;
  };
};

export default function useFetch({
  key,
  initialEnabled = true,
  cache,
  ...axiosConfig
}: CustomAxiosConfig) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<unknown>();
  const { getCache, setCache } = useCache();

  const refetch = () => {
    setLoading(true);
    setError(undefined);
    if (cache?.enabled && getCache(key) !== undefined) {
      setData(getCache(key));
      setLoading(false);
      setError(undefined);
      return;
    }
    axios(axiosConfig)
      .then(({ data }) => {
        setData(data);
        if (cache?.enabled) setCache(key, data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (initialEnabled) refetch();
  }, []);

  return { loading, data, error, refetch } as const;
}
