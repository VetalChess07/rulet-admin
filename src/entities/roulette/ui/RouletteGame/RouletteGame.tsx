import { VerticalSlot } from '../VerticalSlot/VerticalSlot';
import img1 from '@shared/assets/images/item.png';
import img2 from '@shared/assets/images/kristall.png';

import cls from './RouletteGame.module.scss';

type SlotData = [string, string, string, 'win' | 'lose'];

const allSlots: SlotData[] = [
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img1, img1, img1, 'lose'],
  [img2, img2, img2, 'win'],
  [img1, img1, img1, 'lose'],
];

function RouletteGame() {
  return <VerticalSlot slots={allSlots} />;
}
export { RouletteGame };
