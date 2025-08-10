import { useEffect, useState } from 'react';
import { getAttemp } from '../../servise/getAttemp';

export const useGetAttemp = () => {
  const [attemp, setAttemp] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    getAttemp({
      setError,
      setIsLoading,
      setAttemp,
    });
  };

  useEffect(() => {
    getAttemp({
      setError,
      setIsLoading,
      setAttemp,
    });
  }, []);

  return {
    refetch,
    attemp,
    isLoading,
    error,
  };
};
