import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FormControl, SelectChangeEvent } from '@mui/material';
import { Select } from '@/shared/ui/select/Select';
import { useGetAllThemeQuery } from '../../model/api/theme.api';
import { Loader } from '@/shared/ui/loader/Loader';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useAppDispatch } from '@/shared/lib/hooks/redux/useAppDispatch';
import { themeAction } from '../../model/slices/themes.slice';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import { getAllThemes } from '../../model/selectors/theme.selectors';
import { createOptinalSelect } from '@/shared/lib/createOptinalSelect';
import { useSearchParams } from 'react-router-dom';
import { handleSaveCurrentTheme } from '../../model/lib/handleSaveCurrentTheme';

const SelectTheme = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const themes = useAppSelector(getAllThemes);
  const initialThemeId = Number(searchParams.get('themeId')) || 0;

  const [value, setValue] = useState<number>(initialThemeId);

  const { data, isLoading, isError } = useGetAllThemeQuery();

  const options = useMemo(() => {
    const themesIds = themes?.map((theme) => theme.id) || [];
    const themesLabels = themes?.map((theme) => theme.name) || [];
    return createOptinalSelect(themesIds, themesLabels);
  }, [themes]);

  useEffect(() => {
    if (data?.data) {
      dispatch(themeAction.setThemes(data.data));
      if (!value && data.data.length > 0) {
        setValue(data.data[0].id);
        searchParams.set('themeId', data.data[0].id.toString());
        setSearchParams(searchParams);

        dispatch(themeAction.setCurrentTheme(data.data[0]));
        dispatch(themeAction.setCurrentThemeId(data.data[0].id));
      }
    }
  }, [data]);

  useEffect(() => {
    handleSaveCurrentTheme({ dispatch, initialThemeId, themes });
  }, [themes]);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string | number>) => {
      const selectedValue = Number(event.target.value);
      setValue(selectedValue);

      const newParams = new URLSearchParams(searchParams);
      newParams.set('themeId', selectedValue.toString());
      setSearchParams(newParams);

      const currentTheme = themes?.find((theme) => theme.id === selectedValue);

      if (currentTheme) {
        dispatch(themeAction.setCurrentTheme(currentTheme));
        dispatch(themeAction.setCurrentThemeId(currentTheme.id));
      }
    },
    [themes, searchParams, setSearchParams, dispatch],
  );

  if (isLoading) return <Loader size={16} />;
  if (isError || !data?.data) return <ErrorAlert sx={{ marginTop: '24px' }} />;

  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        options={options}
        value={value}
      />
    </FormControl>
  );
});

export { SelectTheme };
