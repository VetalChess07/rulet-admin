import { SetURLSearchParams } from 'react-router-dom';

type SaveCurrentThemeParams = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  key: string;
  value: string;
};
export const saveCurrentTheme = ({
  searchParams,
  setSearchParams,
  key,
  value,
}: SaveCurrentThemeParams) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set(key, value);
  setSearchParams(newParams);
};
