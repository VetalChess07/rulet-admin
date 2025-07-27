import LogoIcon from '@shared/assets/icons/logo.svg?react';

import CalendarIcon from '@shared/assets/icons/Calendar.svg?react';

import cls from './MainBannerInformation.module.scss';
import { Typography } from '@mui/material';
import { classNames } from '@/shared/lib/classNames/classNames';

interface MainBannerInformationProps {
  imgGamePath: string;
  imgGameAlt: string;
  date: string;
}

export const MainBannerInformation = (props: MainBannerInformationProps) => {
  const { imgGameAlt, imgGamePath, date } = props;

  return (
    <div className={cls.MainBannerInformation}>
      <div className={classNames(cls.item, {}, [cls.itemLogo])}>
        <LogoIcon className={cls.logo} />
      </div>
      <div className={cls.item}>
        <img className={cls.gameLogo} src={imgGamePath} alt={imgGameAlt} />
      </div>
      <div className={cls.item}>
        <CalendarIcon />
        <Typography className={cls.calendar} variant="body2">
          {date}
        </Typography>
      </div>
    </div>
  );
};
