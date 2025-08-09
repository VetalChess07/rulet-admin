import React, { useEffect, useState } from 'react';
import cls from './VerticalSlot.module.scss';
import { GetResultGameResponse, SlotData } from '../../model/types/roulette';
import { RouletteFooter } from '../RouletteFooter/RouletteFooter';
import { BOX_SHADOW } from '@/shared/conts/ui';
import { ModalGameLose } from '../ModalGameLose/ModalGameLose';

import img1 from '@shared/assets/images/item.png';
import img2 from '@shared/assets/images/kristall.png';
import { getResultGame } from '../../model/servise/getResultGame';

const SLOT_HEIGHT = 73;
const VISIBLE_SLOTS = 3;
const SPIN_ROUNDS = 3;

const initData = [
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  ['img1', 'img1', 'img1', 'lose'],
  [img1, img1, img1, 'lose'],
];

export const VerticalSlot = () => {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const [transition, setTransition] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotData[]>(initData);
  const [isLoading, setIsLoading] = useState(false);

  const centerIndex = Math.floor(VISIBLE_SLOTS / 2);

  const startSpin = async () => {
    if (spinning) return;

    const res = await getResultGame({
      setError,
      setIsLoading,
    });

    const newSlot = res?.prizes?.map((data) => data.picture) ?? [
      'https://promo.donatov.net/field_of_luck_image/bcf8dc03-61a1-41f2-8dba-7928b66250d9.png',
      'https://promo.donatov.net/field_of_luck_image/bcf8dc03-61a1-41f2-8dba-7928b66250d9.png',
      'https://promo.donatov.net/field_of_luck_image/bcf8dc03-61a1-41f2-8dba-7928b66250d9.png',
      'win',
    ];

    const newData = [
      ...initData.slice(0, initData.length - 1),
      newSlot as SlotData,
      initData[initData.length - 1],
    ];
    setSlots(newData);

    // Ждём следующего кадра, чтобы точно получить обновлённые данные в DOM
    requestAnimationFrame(() => {
      setSpinning(true);
      setTransition('none');
      setOffset(0);

      // через 50мс запускаем анимацию (можно и в requestAnimationFrame)
      setTimeout(() => {
        setTransition('transform 3s ease-out');

        const finalIndex =
          (SPIN_ROUNDS - 1) * newData.length + (newData.length - 1);
        const finalOffset =
          finalIndex * SLOT_HEIGHT - centerIndex * SLOT_HEIGHT;

        setOffset(finalOffset);
      }, 50);

      // Стоп и модалка через 3.1 секунду
      setTimeout(() => {
        setSpinning(false);
        setOpen(true);
      }, 3100);
    });
  };

  useEffect(() => {
    console.log('slots', slots);
  }, [slots]);

  const repeatedSlots = Array.from({ length: SPIN_ROUNDS }).flatMap(
    () => slots,
  );

  const renderColumn = (columnIndex: 0 | 1 | 2) => (
    <div
      className={cls.column}
      style={{
        transform: `translateY(-${offset}px)`,
        transition,
      }}
    >
      {repeatedSlots.map((slot, idx) => (
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
      ))}
    </div>
  );

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
        </div>
        <div className={cls.glowInner}>
          {[0, 1, 2].map((i) => (
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
