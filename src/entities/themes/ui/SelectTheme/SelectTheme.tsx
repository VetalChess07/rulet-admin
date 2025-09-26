import { memo, useCallback, useEffect, useMemo } from 'react';
import { FormControl, SelectChangeEvent } from '@mui/material';
import { Select } from '@/shared/ui/Select/Select';
import { useGetAllThemeQuery } from '../../model/api/theme.api';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useAppDispatch } from '@/shared/lib/hooks/redux/useAppDispatch';
import { themeAction } from '../../model/slices/themes.slice';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import {
  getAllThemes,
  getCurrentTheme,
} from '../../model/selectors/theme.selectors';
import { createOptinalSelect } from '@/shared/lib/createOptinalSelect';
import { useSearchParams } from 'react-router-dom';

import { setQueryParams } from '@/shared/lib/setQueryParams';
import { OptionsSelect } from '@/shared/types/ui';

const SelectTheme = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const themes = useAppSelector(getAllThemes);

  const currentTheme = useAppSelector(getCurrentTheme);
  const queryThemeId = Number(searchParams.get('themeId'));

  const initialThemeId = currentTheme?.id ?? queryThemeId;

  const { data, isLoading, isError } = useGetAllThemeQuery();

  const options: OptionsSelect[] = useMemo(() => {
    const themesIds = themes?.map((theme) => theme.id) || [];
    const themesLabels = themes?.map((theme) => theme.name) || [];
    return createOptinalSelect(themesIds, themesLabels);
  }, [themes]);

  useEffect(() => {
    if (data?.data) {
      dispatch(themeAction.setThemes(data.data));
      if (data.data.length > 0 && themes) {
        const currentTheme = themes.find(
          (theme) => theme.id === initialThemeId,
        );

        if (currentTheme) {
          dispatch(themeAction.setCurrentTheme(currentTheme));
          dispatch(themeAction.setCurrentThemeId(currentTheme.id));
          setSearchParams(searchParams);
        } else {
          if (data?.data?.length !== 0) {
            setQueryParams({
              key: 'themeId',
              searchParams,
              setSearchParams,
              value: `${data?.data[0]?.id}`,
            });
            dispatch(themeAction.setCurrentTheme(data?.data[0]));
            dispatch(themeAction.setCurrentThemeId(data?.data[0].id));
          } else {
            searchParams.delete('themeId');
          }
        }
      }
      if (data.data.length === 0) {
        dispatch(themeAction.clear());
        searchParams.delete('themeId');
        setSearchParams(searchParams);
      }
    }
  }, [data, themes]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string | number>) => {
      const selectedValue = Number(event.target.value);

      setQueryParams({
        searchParams,
        setSearchParams,
        value: selectedValue.toString(),
        key: 'themeId',
      });

      const currentTheme = themes?.find((theme) => theme.id === selectedValue);

      if (currentTheme) {
        dispatch(themeAction.setCurrentTheme(currentTheme));
        dispatch(themeAction.setCurrentThemeId(currentTheme.id));
      }
    },
    [themes, searchParams, dispatch],
  );

  if (isLoading) return <Loader size={16} />;
  if (isError || !data?.data) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <FormControl sx={{ minWidth: '200px', maxWidth: '200px' }} fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        options={options}
        value={initialThemeId}
      />
    </FormControl>
  );
});

export { SelectTheme };
