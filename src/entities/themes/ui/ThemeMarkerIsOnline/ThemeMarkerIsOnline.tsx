import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ThemeMarkerIsOnline.module.scss';

interface ThemeMarkerIsOnlineProps {
  isOnline: boolean;
}

const ThemeMarkerIsOnline = (props: ThemeMarkerIsOnlineProps) => {
  const { isOnline } = props;

  const mods: Mods = {
    [cls.isOnline]: isOnline,
  };

  return <div className={classNames(cls.ThemeMarkerIsOnline, mods)}></div>;
};

export { ThemeMarkerIsOnline };
