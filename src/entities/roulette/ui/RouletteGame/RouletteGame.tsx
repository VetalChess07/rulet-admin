import { VerticalSlot } from '../VerticalSlot/VerticalSlot';

import cls from './RouletteGame.module.scss';

type SlotData = [string, string, string, 'win' | 'lose'];

// const allSlots: SlotData[] = [
//   [img1, img1, img1, 'lose'],
//   [img1, img1, img1, 'lose'],
//   [img1, img1, img1, 'lose'],
//   [img1, img1, img1, 'lose'],
//   [img1, img1, img1, 'lose'],
//   [img1, img1, img1, 'lose'],
//   [img1, img1, img1, 'lose'],
//   [img1, img1, img1, 'lose'],
//   [img2, img2, img2, 'win'],
//   [img1, img1, img1, 'lose'],
// ];

function RouletteGame() {
  return <VerticalSlot />;
}
export { RouletteGame };
