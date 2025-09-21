import { Theme } from '../../model/types/theme.types';
import { Empty } from '@/shared/ui/Empty/Empty';
import { ThemesListItem } from '../ThemesListItem/ThemesListItem';

import cls from './ThemesList.module.scss';

import { skeletonIsLoadingArray } from '../../model/conts/skeleton';
import { ThemeSkeleton } from '../ThemeSkeleton/ThemeSkeleton';

interface ThemesListProps {
  themes: Theme[] | null;
  isLoading: boolean;
}

const ThemesList = (props: ThemesListProps) => {
  const { isLoading, themes } = props;

  if (themes?.length === 0 || themes === null)
    return <Empty message="У вас пока нет тем для розыгрышей" />;

  return (
    <div className={cls.ThemesList}>
      {isLoading
        ? skeletonIsLoadingArray.map((_, index) => (
            <ThemeSkeleton key={index} />
          ))
        : themes.map((theme) => (
            <ThemesListItem key={theme.id} theme={theme} />
          ))}
    </div>
  );
};

export { ThemesList };
