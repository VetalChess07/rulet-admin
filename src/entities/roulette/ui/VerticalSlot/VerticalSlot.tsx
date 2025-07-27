import React, { useState } from 'react';
import cls from './VerticalSlot.module.scss';

export type SlotData = [string, string, string, 'win' | 'lose'];

const SLOT_HEIGHT = 60;
const VISIBLE_SLOTS = 3;
const SPIN_ROUNDS = 10;

interface Props {
  slots: SlotData[];
}

export const VerticalSlotMachine: React.FC<Props> = ({ slots }) => {
  const [spinning, setSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const [transition, setTransition] = useState('');

  const centerIndex = Math.floor(VISIBLE_SLOTS / 2);

  // Находим последний "win" индекс или последний элемент, если нет выигрышей
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
      setTransition(`transform 3s ease-out`);

      // Рассчитываем финальный индекс и смещение
      const finalIndex = (SPIN_ROUNDS - 1) * slots.length + lastWinIndex;
      const finalOffset = finalIndex * SLOT_HEIGHT - centerIndex * SLOT_HEIGHT;

      setOffset(finalOffset);
    }, 50);

    setTimeout(() => {
      setSpinning(false);
    }, 3100);
  };

  return (
    <>
      <div
        className={cls.VerticalSlotMachine}
        style={{ overflow: 'hidden', height: SLOT_HEIGHT * VISIBLE_SLOTS }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            transform: `translateY(-${offset}px)`,
            transition,
          }}
        >
          {Array.from({ length: SPIN_ROUNDS }).flatMap(() =>
            slots.map((slot, idx) => (
              <div
                key={idx + Math.random()}
                style={{
                  height: SLOT_HEIGHT,
                  lineHeight: SLOT_HEIGHT + 'px',
                  textAlign: 'center',
                  fontSize: 40,
                  color: slot[3] === 'win' ? 'green' : 'black',
                  fontWeight: slot[3] === 'win' ? 'bold' : 'normal',
                }}
              >
                {slot[0]} {slot[1]} {slot[2]}
              </div>
            )),
          )}
        </div>
      </div>

      <button onClick={startSpin} disabled={spinning} style={{ marginTop: 20 }}>
        {spinning ? 'Крутим...' : 'Крутить'}
      </button>
    </>
  );
};
