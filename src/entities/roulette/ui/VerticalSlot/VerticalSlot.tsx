import { useEffect, useMemo, useState } from 'react';
import cls from './VerticalSlot.module.scss';
import { SlotData } from '../../model/types/roulette';
import { RouletteFooter } from '../RouletteFooter/RouletteFooter';
import { BOX_SHADOW } from '@/shared/conts/ui';
import { ModalGameLose } from '../ModalGameLose/ModalGameLose';

import { getResultGame } from '../../model/servise/getResultGame';
import { Prize } from '@/entities/prizes';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { CircularProgress } from '@mui/material';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

const SLOT_HEIGHT = 73;
const VISIBLE_SLOTS = 3;
const SPIN_ROUNDS = 3;

// const initData = [
//   [img1, img1, img1, img1],
//   [img1, img1, img1, img1],
//   [img1, img1, img1, img1],
//   [img1, img1, img1, img1],
//   [img1, img1, img1, img1],
//   [img1, img1, img1, img1],
//   [img1, img1, img1, img1],
//   ['img1', 'img1', 'img1', 'img1'],
//   [img1, img1, img1, img2],
// ];

interface VerticalSlotProps {
  errorPrizes: string | null;
  isLoadingPrizes: boolean;
  prizes: Prize[] | null;
  refetchPrizes: () => void;
}

export const VerticalSlot = (props: VerticalSlotProps) => {
  const { errorPrizes, isLoadingPrizes, prizes } = props;

  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const [transition, setTransition] = useState('');

  const [initSlot, setInitSlot] = useState<SlotData[]>();

  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotData[]>();
  const [isLoading, setIsLoading] = useState(false);

  const createInitData = (prizes: Prize[]): SlotData[] => {
    return prizes.map((p) => {
      const urls = p.picture.split(',').map((url) => `${imgApi}${url}`);

      return urls as SlotData; // SlotData — массив из 4 картинок
    });
  };

  const images = useMemo(() => {
    if (prizes) {
      return createInitData(prizes);
    }
  }, [prizes]);

  const centerIndex = Math.floor(VISIBLE_SLOTS / 2);

  const startSpin = async () => {
    if (spinning) return;
    if (!images || !initSlot) return null;
    const matrix = createRows(images, 4, 9);
    setInitSlot(matrix);
    const res = await getResultGame({
      setError,
      setIsLoading,
    });

    const newSlot = res?.prizes?.map((data) => data.picture) ?? [
      'h',
      'httpsfield_of_luck_image/bcf8dc03-61a1-41f2-8dba-7928b66250d9.png',
      'https://promo.donatov.et/field_of_luck_image/bcf8dc03-61a1-41f2-8dba-7928b66250d9.png',
      'https://promo.donaov.net/field_of_luck_image/bcf8dc03-61a1-41f2-8dba-7928b66250d9.png',
    ];

    const newData = [
      ...initSlot.slice(0, initSlot.length - 1),
      newSlot as SlotData,
      initSlot[initSlot.length - 1],
    ];
    setSlots(newData);

    requestAnimationFrame(() => {
      setSpinning(true);
      setTransition('none');
      setOffset(0);

      setTimeout(() => {
        setTransition('transform 3s ease-out');

        const finalIndex =
          (SPIN_ROUNDS - 1) * newData.length + (newData.length - 1);
        const finalOffset =
          finalIndex * SLOT_HEIGHT - centerIndex * SLOT_HEIGHT;

        setOffset(finalOffset);
      }, 50);

      setTimeout(() => {
        setSpinning(false);
        setOpen(true);
      }, 3100);
    });
  };

  function shuffleArray<T>(array: T[] | undefined): T[] | null {
    if (array) {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    } else {
      return null;
    }
  }

  function createRows(
    images: SlotData[] | undefined,
    imagesPerRow: number,
    rowCount: number,
  ): SlotData[] | undefined {
    const shuffled = shuffleArray<SlotData>(images);

    const result: SlotData[] = [];

    if (shuffled) {
      for (let i = 0; i < rowCount; i++) {
        const row: SlotData[] = [];
        for (let j = 0; j < imagesPerRow; j++) {
          const index = (i * imagesPerRow + j) % shuffled.length;
          const res = shuffled[index];
          row.push(res);
        }
        // @ts-ignore
        result.push(row);
      }

      return result;
    }
  }

  useEffect(() => {
    if (prizes) {
      const matrix = createRows(images, 4, 9);
      if (matrix) {
        setInitSlot(matrix);
        setSlots(matrix);
      }
    }
  }, [prizes]);

  const repeatedSlots = Array.from({ length: SPIN_ROUNDS }).flatMap(
    () => slots,
  );

  const renderColumn = (columnIndex: 0 | 1 | 2 | 3) => (
    <div
      className={cls.column}
      style={{
        transform: `translateY(-${offset}px)`,
        transition,
      }}
    >
      {repeatedSlots?.map((slot, idx) => {
        if (!slot) return null;
        return (
          <div
            key={`${idx}-${columnIndex}`}
            className={cls.slotItem}
            style={{
              height: SLOT_HEIGHT,
              lineHeight: SLOT_HEIGHT + 'px',
            }}
          >
            <img
              className={cls.img}
              src={slot[columnIndex]}
              alt={`slot-${columnIndex}`}
            />
          </div>
        );
      })}
    </div>
  );

  if (isLoadingPrizes)
    return (
      <div className={cls.loader}>
        <CircularProgress sx={{ color: 'var(--accent-color)' }} />
      </div>
    );

  if (errorPrizes) return <ErrorAlert />;

  return (
    <div>
      <div
        className={cls.VerticalSlotMachine}
        style={{ height: SLOT_HEIGHT * VISIBLE_SLOTS * 1.1 }}
      >
        <div className={cls.columnsWrapper}>
          {renderColumn(0)}
          {renderColumn(1)}
          {renderColumn(2)}
          {renderColumn(3)}
        </div>
        <div className={cls.glowInner}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cls.glowInnerItem}
              style={{
                boxShadow: spinning ? BOX_SHADOW : 'none',
                borderTop: spinning ? '1px solid var(--accent-color)' : 'none',
                borderBottom: spinning
                  ? '1px solid var(--accent-color)'
                  : 'none',
              }}
            >
              <div
                className={cls.light}
                style={{
                  background: spinning
                    ? `linear-gradient(
                        180deg,
                        rgba(220, 224, 237, 0) 0%,
                        rgba(220, 224, 237, 0.02) 100%
                      )`
                    : 'none',
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <RouletteFooter onClick={startSpin} disabled={spinning || isLoading} />

      {/* Показываем только модал проигрыша */}
      <ModalGameLose open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
