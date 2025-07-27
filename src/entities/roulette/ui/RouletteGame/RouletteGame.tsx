import React, { useState } from 'react';
import { VerticalSlotMachine, SlotData } from '../VerticalSlot/VerticalSlot';

// весь большой массив с 100+ элементами
const allSlots: SlotData[] = [
  ['🍉', '🍌', '🍎', 'lose'],
  ['🍊', '🍌', '🍒', 'lose'],
  ['🍊', '🍌', '🍒', 'lose'],
  ['🍉', '🍌', '🍎', 'lose'],
  ['🍇', '🍇', '🍉', 'lose'],
  ['🍇', '🍇', '🍇', 'lose'],
  ['🍍', '🍌', '🍌', 'lose'],
  ['🍓', '🍊', '🍓', 'lose'],
  ['🍌', '🍌', '🍌', 'win'],
  ['🍏', '🍋', '🍋', 'lose'],

  // ...можно хоть 100 штук
];

function getRandomSlots(source: SlotData[], count: number = 3): SlotData[] {
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function RouletteGame() {
  return (
    <div style={{ padding: 40, background: '#000', minHeight: '100vh' }}>
      <VerticalSlotMachine slots={allSlots} />
    </div>
  );
}
export { RouletteGame };
