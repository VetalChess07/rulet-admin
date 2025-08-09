import { useEffect, useState } from 'react';
import { getAllPrizes } from '../../servise/prizesServise';
import type { Prize } from '../../types/prizes';

export const useGetPrizes = () => {
  const [prizes, setPrizes] = useState<Prize[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    getAllPrizes({
      setError,
      setIsLoading,
      setPrizes,
    });
  };

  useEffect(() => {
    getAllPrizes({
      setError,
      setIsLoading,
      setPrizes,
    });
  }, []);

  return {
    refetch,
    prizes,
    isLoading,
    error,
  };
};
