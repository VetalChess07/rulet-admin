import { Dispatch, SetStateAction } from 'react';
import { User } from './types/tg';

type OnAuthParams = {
  userData: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export const onAuth = ({ setUser, userData }: OnAuthParams) => {
  localStorage.setItem('tgUser', JSON.stringify(userData));
  setUser(userData);
};
