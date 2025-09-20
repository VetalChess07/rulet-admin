export interface User {
  id: number;
  first_name: string;
  last_name?: string; // у некоторых может не быть
  username?: string; // тоже бывает пустой
  photo_url?: string;
  auth_date: number;
  hash: string;
}
