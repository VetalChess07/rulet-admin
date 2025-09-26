import { useGetAllThemeQuery } from '@/entities/themes';
import { getAllThemes } from '@/entities/themes/model/selectors/theme.selectors';
import { CreateThemeButton } from '@/entities/themes/ui/CreateThemeButton/CreateThemeButton';
import { ThemesList } from '@/entities/themes/ui/ThemesList/ThemesList';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { useAppSelector } from '@/shared/lib/hooks/redux/useAppSelector';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

const ThemesPage = () => {
  const themes = useAppSelector(getAllThemes);

  const { isLoading, isError, error, refetch } = useGetAllThemeQuery();

  if (isError)
    return (
      <ErrorAlert message={getErrorMessage(error)} sx={{ marginTop: '24px' }} />
    );

  return (
    <div>
      <ThemesList isLoading={isLoading} themes={themes} refetch={refetch} />
      <CreateThemeButton refetch={refetch} />
    </div>
  );
};

export default ThemesPage;
