import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { MainBannerInformation } from '../MainBannerInformation/MainBannerInformation';

import logoGame from '@shared/assets/icons/logoGame.png';
import mainBg from '@shared/assets/images/mainBg.png';
import mainBgMobile from '@shared/assets/images/mainBgMobile.png';

import cls from './MainBanner.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export const MainBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const backgroundImage = isMobile ? mainBgMobile : mainBg;

  return (
    <div className={cls.inner}>
      <div className={classNames(cls.MainBanner, {}, [''])}>
        <div className={cls.item}>
          <Typography className={cls.title} variant="h1">
            Получай подарки,
            <Typography variant="h1" className={cls.titleAccent}>
              испытывай удачу!
            </Typography>
          </Typography>
          <Typography className={cls.desc} variant="body1">
            Важно помнить, что удача - это не всегда выигрыш.
          </Typography>
          <MainBannerInformation
            date="16.07.25 - 26.07.25"
            imgGameAlt="mobile legends"
            imgGamePath={logoGame}
          />
        </div>
        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className={cls.mainBannerImg}
        ></div>
      </div>
    </div>
  );
};
