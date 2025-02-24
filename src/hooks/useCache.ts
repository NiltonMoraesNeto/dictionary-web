'use client';

import { useState, useEffect } from 'react';

const cache = new Map();

export function useCache<T>(key: string, fetchFn: () => Promise<T>, ttl = 60000) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = cache.get(key);
        if (cachedData) {
          const { data, timestamp } = cachedData;
          if (Date.now() - timestamp < ttl) {
            setData(data);
            setLoading(false);
            return;
          }
        }

        const freshData = await fetchFn();
        cache.set(key, { data: freshData, timestamp: Date.now() });
        setData(freshData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, fetchFn, ttl]);

  return { data, loading, error };
}