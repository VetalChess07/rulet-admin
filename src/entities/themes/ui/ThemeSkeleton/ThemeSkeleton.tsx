import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import cls from './ThemeSkeleton.module.scss';

const ThemeSkeleton = () => {
  return (
    <div className={cls.ThemeSkeleton}>
      <div className={cls.header}>
        <Skeleton variant="circular" width={100} height={100} />
        <Skeleton variant="rounded" width={400} height={16} />
      </div>
      <div className={cls.body}>
        <Skeleton variant="rounded" height={200} />
      </div>
    </div>
  );
};

export { ThemeSkeleton };
