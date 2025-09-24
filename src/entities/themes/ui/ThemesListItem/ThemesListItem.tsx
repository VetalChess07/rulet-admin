import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { Theme } from '../../model/types/theme.types';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import { getCurrentThemeId } from '../../model/selectors/theme.selectors';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { MoreButton } from '@/shared/ui/MoreButton/MoreButton';
import { useState } from 'react';
import { SelectTypeTheme } from '../SelectTypeTheme/SelectTypeTheme';
import { useAppDispatch } from '@/shared/lib/hooks/redux/useAppDispatch';
import { themeAction } from '../../model/slices/themes.slice';
import { useSearchParams } from 'react-router-dom';
import { setQueryParams } from '@/shared/lib/setQueryParams';
import { ModalSetGameStart } from '../ModalSetGameStart/ModalSetGameStart';
import { ModalApproveDeleteTheme } from '../ModalApproveDeleteTheme/ModalApproveDeleteTheme';
import { ThemeMarkerIsOnline } from '../ThemeMarkerIsOnline/ThemeMarkerIsOnline';

import cls from './ThemesListItem.module.scss';
import { UpdateThemeModal } from '../UpdateThemeModal/UpdateThemeModal';

const imgApi = import.meta.env.VITE_API_IMAGE_URL;

interface ThemesListItemProps {
  theme: Theme;
  refetch: () => void;
}

const ThemesListItem = (props: ThemesListItemProps) => {
  const { theme, refetch } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const [isBannerLoaded, setIsBannerLoaded] = useState(true);

  const currentThemeId = useAppSelector(getCurrentThemeId);

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const themeActions = [
    { label: 'Редактировать', onClick: () => setOpenUpdate(true) },
    {
      label: 'Удалить',
      onClick: () => setOpenDelete(true),
      styles: { color: 'var(--danger-color)' },
    },
  ];

  const startDate = theme.themes_start_date
    ? dayjs(theme.themes_start_date).format('DD.MM.YYYY')
    : '-';
  const finishDate = theme.themes_finish_date
    ? dayjs(theme.themes_finish_date).format('DD.MM.YYYY')
    : '-';

  const mods: Mods = {
    [cls.activeTheme]: currentThemeId === theme.id,
  };

  const handleActiveTheme = (themeId: number) => {
    dispatch(themeAction.setCurrentTheme(theme));
    dispatch(themeAction.setCurrentThemeId(themeId));

    setQueryParams({
      searchParams,
      setSearchParams,
      value: `${themeId}`,
      key: 'themeId',
    });
  };

  return (
    <div
      onDoubleClick={() => handleActiveTheme(theme.id)}
      className={classNames(cls.ThemesListItem, mods)}
    >
      {theme.banner && isBannerLoaded && (
        <img
          className={cls.backgroundImg}
          src={`${imgApi}${theme.banner}`}
          alt=""
          onError={() => setIsBannerLoaded(false)}
        />
      )}
      <div className={cls.background}></div>

      <div className={cls.header}>
        <div className={cls.headerContent}>
          <Avatar alt={theme.name} src={`${imgApi}${theme.logo}`} size={80} />
          <Typography className={cls.title} variant="body1" component="h3">
            {theme.name}
          </Typography>
        </div>

        <MoreButton actions={themeActions} classNameButton={cls.moreBtn} />
      </div>
      <div className={cls.body}>
        <Typography variant="body1" component="h4">
          Имя игры: {theme.name ?? '-'}
        </Typography>
        <Typography variant="body1" component="h4">
          Заголовок: {theme.title ?? '-'}
        </Typography>
        <Typography variant="body1" component="h4">
          Описание: {theme.description ?? '-'}
        </Typography>

        <Typography variant="body1" component="h4">
          Вариант игры: {theme.type_themes ?? '-'}
        </Typography>
      </div>
      <div className={cls.footer}>
        <div className={cls.footerContent}>
          <div className={cls.footerItem}>
            <div className={cls.footerItemHeader}>
              <Typography variant="body1" component="h4">
                Статус игры:
              </Typography>
              <ModalSetGameStart
                refetch={refetch}
                isStart={!!theme.start}
                themeId={theme.id}
              />
              {theme.start ? 'true' : 'false'}
            </div>

            <Typography
              className={cls.footerItemTitle}
              variant="overline"
              component="span"
            >
              (активная / не активная)
            </Typography>
          </div>
          <SelectTypeTheme themeType={theme.type_themes} />
        </div>

        <div className={cls.dateInner}>
          <ThemeMarkerIsOnline isOnline={theme.start ?? false} />
          <Typography
            className={cls.dateInnerText}
            variant="body1"
            component="h4"
          >
            {startDate}
          </Typography>
          <Typography
            className={cls.dateInnerText}
            variant="body1"
            component="h4"
          >
            -
          </Typography>
          <Typography
            className={cls.dateInnerText}
            variant="body1"
            component="h4"
          >
            {finishDate}
          </Typography>
        </div>
      </div>
      <ModalApproveDeleteTheme
        setOpen={setOpenDelete}
        open={openDelete}
        themeId={theme.id}
        themeName={theme.name}
        refetch={refetch}
      />
      <UpdateThemeModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        refetch={refetch}
        theme={theme}
      />
    </div>
  );
};

export { ThemesListItem };
