import { SerializedError } from '@reduxjs/toolkit';
import { DefaultErrorResponse } from '../types/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
): string => {
  if (!error) return 'Неизвестная ошибка';

  if ('status' in error) {
    // FetchBaseQueryError
    if (typeof error.data === 'object' && error.data && 'error' in error.data) {
      return (error.data as DefaultErrorResponse).error;
    }

    if (error.status === 'PARSING_ERROR')
      return 'Некорректный ответ от сервера';

    return `Ошибка ${error.status}`;
  }

  // SerializedError
  return error.message ?? 'Неизвестная ошибка';
};
