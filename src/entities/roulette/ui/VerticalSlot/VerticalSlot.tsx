import React, { useEffect, useState } from 'react';
import cls from './VerticalSlot.module.scss';
import { GetResultGameResponse, SlotData } from '../../model/types/roulette';
import { RouletteFooter } from '../RouletteFooter/RouletteFooter';
import { BOX_SHADOW } from '@/shared/conts/ui';
import { ModalGameLose } from '../ModalGameLose/ModalGameLose';

import img1 from '@shared/assets/images/item.png';
import img2 from '@shared/assets/images/kristall.png';
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

  const [initSlot, setInitSlot] = useState();

  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotData[]>();
  const [isLoading, setIsLoading] = useState(false);

  const centerIndex = Math.floor(VISIBLE_SLOTS / 2);

  const startSpin = async () => {
    if (spinning) return;

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

  const createInitData = (prizes: Prize[]): SlotData[] => {
    return prizes.map((p) => {
      // picture содержит строки с 4 картинками через запятую
      const urls = p.picture.split(',').map((url) => `${imgApi}${url}`);

      return urls as SlotData; // SlotData — массив из 4 картинок
    });
  };

  function createRows(
    images: string[],
    imagesPerRow: number,
    rowCount: number,
  ): string[][] {
    const result: string[][] = [];

    for (let i = 0; i < rowCount; i++) {
      const row: string[] = [];
      for (let j = 0; j < imagesPerRow; j++) {
        // берем картинку по индексу с циклом по массиву
        const index = (i * imagesPerRow + j) % images.length;
        row.push(...images[index]);
      }
      result.push(row);
    }

    return result;
  }

  useEffect(() => {
    console.log(prizes);
    if (prizes) {
      const images = createInitData(prizes);
      const matrix = createRows(images, 4, 9);
      console.log(matrix);
      setInitSlot(matrix);
      setSlots(matrix);
    }
  }, [prizes]);

  useEffect(() => {
    console.log('slots', slots);
  }, [slots]);

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
        if (!slot) return null; // если slot нет — пропускаем
        return (
          <div
            key={`${idx}-${columnIndex}`}
            className={cls.slotItem}
            style={{
              height: SLOT_HEIGHT,
              lineHeight: SLOT_HEIGHT + 'px',
            }}
          >
            <img src={slot[columnIndex]} alt={`slot-${columnIndex}`} />
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

      <RouletteFooter onClick={startSpin} disabled={spinning} />

      {/* Показываем только модал проигрыша */}
      <ModalGameLose open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
