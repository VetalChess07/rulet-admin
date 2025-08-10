import { Prize } from '@/entities/prizes';
import { VerticalSlot } from '../VerticalSlot/VerticalSlot';

interface RouletteGameProps {
  error: string | null;
  isLoading: boolean;
  prizes: Prize[] | null;
  refetch: () => void;
}

export const RouletteGame = (props: RouletteGameProps) => {
  const { error, isLoading, prizes, refetch } = props;

  return (
    <VerticalSlot
      errorPrizes={error}
      isLoadingPrizes={isLoading}
      prizes={prizes}
      refetchPrizes={refetch}
    />
  );
};
