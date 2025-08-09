import { useEffect, useState } from 'react';
import { getAllEvents } from '../getAllEvents';
import type { DailyBonuses } from '../../types/dailyBonuses';

export const useGetAllEvents = () => {
  const [allEvents, setAllEvents] = useState<DailyBonuses[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    getAllEvents({
      setError,
      setIsLoading,
      setAllEvents,
    });
  };

  useEffect(() => {
    getAllEvents({
      setError,
      setIsLoading,
      setAllEvents,
    });
  }, []);

  return {
    refetch,
    allEvents,
    isLoading,
    error,
  };
};
