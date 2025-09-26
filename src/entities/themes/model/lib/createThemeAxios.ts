import axios from 'axios';
import { ThemeFormData } from '../../model/types/createTheme';
import { userInfo } from '@/shared/conts/userInfo';
import { formatDate } from '@/shared/lib/formatDate';

interface createThemeAxiosParams {
  formData: ThemeFormData;
  themeId?: number;
  refetch: () => void;
}

export const createThemeAxios = async ({
  formData,
  refetch,
  themeId,
}: createThemeAxiosParams) => {
  console.log(formData);

  try {
    const payload = new FormData();

    payload.append('name', formData.name);
    payload.append('title', formData.title ?? '');
    payload.append('description', formData.description ?? '');
    payload.append('themes_start_date', formatDate(formData.themes_start_date));
    payload.append(
      'themes_finish_date',
      formatDate(formData.themes_finish_date),
    );

    payload.append('token_tg_bot', formData.token_tg_bot ?? '');
    payload.append('type_themes', formData.type_themes);
    payload.append('url_game', formData.url_game ?? '');
    payload.append('start', String(formData.start));
    if (themeId) payload.append('themeId', String(themeId));
    if (userInfo) payload.append('user_info', JSON.stringify(userInfo));

    // Файлы, если есть
    if (formData.logo) payload.append('logo', formData.logo);
    if (formData.banner) payload.append('banner', formData.banner);
    if (formData.bannerMobile)
      payload.append('bannerMobile', formData.bannerMobile);

    const response = await axios.post(
      'http://localhost:8000/api/themes/create',
      payload,
      {
        withCredentials: true, // если нужны куки
        headers: {
          // НЕ ставим Content-Type, axios сам его подставит с boundary
        },
      },
    );
    refetch();
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании темы через axios:', error);
    throw error;
  }
};
