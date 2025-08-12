// api/quests/updateQuest.ts
import api from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/conts/localStorage';
import { Dispatch, SetStateAction } from 'react';

interface UpdateTaskParams {
  id: number;
  name: string;
  description: string;
  attempt: number;
  api: string;
  type: string;
  params: string;
  picture_file?: File | null;

  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

export const updateTask = async (data: UpdateTaskParams) => {
  data.setIsLoading(true);
  data.setError(null);

  try {
    const formData = new FormData();

    const userInfoStr = localStorage.getItem(TG_USER);
    formData.append('id', String(data.id));
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('attempt', String(data.attempt));
    formData.append('api', data.api);
    formData.append('type', data.type);
    formData.append('params', data.params);
    formData.append('user_info', userInfoStr || '');

    if (data.picture_file) {
      formData.append('picture', data.picture_file);
    }

    const res = await api.post('/api_field_of_luck/quests/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (err: any) {
    const message =
      err.response?.data?.message || err.message || 'Unknown error';
    data.setError(message);
    return null;
  } finally {
    data.setIsLoading(false);
  }
};
