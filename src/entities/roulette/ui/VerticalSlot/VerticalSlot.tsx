import React, { useState } from 'react';
import cls from './VerticalSlot.module.scss';
import { SlotData } from '../../model/types/roulette';
import { RouletteFooter } from '../RouletteFooter/RouletteFooter';
import { BOX_SHADOW } from '@/shared/conts/ui';

const SLOT_HEIGHT = 73;
const VISIBLE_SLOTS = 3;
const SPIN_ROUNDS = 3;

interface Props {
  slots: SlotData[];
}

export const VerticalSlot: React.FC<Props> = ({ slots }) => {
  const [spinning, setSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const [transition, setTransition] = useState('');

  const centerIndex = Math.floor(VISIBLE_SLOTS / 2);

  const winIndexes = slots
    .map((slot, i) => (slot[3] === 'win' ? i : -1))
    .filter((i) => i !== -1);

  const lastWinIndex =
    winIndexes.length > 0
      ? winIndexes[winIndexes.length - 1]
      : slots.length - 2;

  const startSpin = () => {
    if (spinning) return;
    setSpinning(true);

    setTransition('none');
    setOffset(0);

    setTimeout(() => {
      setTransition('transform 3s ease-out');

      const finalIndex = (SPIN_ROUNDS - 1) * slots.length + lastWinIndex;
      const finalOffset = finalIndex * SLOT_HEIGHT - centerIndex * SLOT_HEIGHT;

      setOffset(finalOffset);
    }, 50);

    setTimeout(() => {
      setSpinning(false);
    }, 3100);
  };

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
          <div
            className={cls.glowInnerItem}
            style={{
              boxShadow: spinning ? BOX_SHADOW : 'none',
              borderTop: spinning ? '1px solid var(--accent-color)' : 'none',
              borderBottom: spinning ? '1px solid var(--accent-color)' : 'none',
            }}
          >
            <div
              className={cls.light}
              style={{
                boxShadow: spinning
                  ? `background: linear-gradient(
                        180deg,
                        rgba(220, 224, 237, 0) 0%,
                        rgba(220, 224, 237, 0.02) 100%
                      );`
                  : `background: linear-gradient(
                        180deg,
                        rgba(220, 224, 237, 0) 0%,
                        rgba(220, 224, 237, 0.02) 100%
                      );`,
              }}
            ></div>
          </div>
          <div
            className={cls.glowInnerItem}
            style={{
              boxShadow: spinning ? BOX_SHADOW : 'none',
              borderTop: spinning ? '1px solid var(--accent-color)' : 'none',
              borderBottom: spinning ? '1px solid var(--accent-color)' : 'none',
            }}
          >
            <div className={cls.light}></div>
          </div>
          <div
            className={cls.glowInnerItem}
            style={{
              boxShadow: spinning ? BOX_SHADOW : 'none',
              borderTop: spinning ? '1px solid var(--accent-color)' : 'none',
              borderBottom: spinning ? '1px solid var(--accent-color)' : 'none',
            }}
          >
            <div className={cls.light}></div>
          </div>
        </div>
      </div>

      <RouletteFooter onClick={startSpin} disabled={spinning} />
    </div>
  );
};
