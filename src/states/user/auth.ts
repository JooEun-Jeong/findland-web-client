import { atom } from 'recoil';

import { DecodedJWTPayload } from '@interfaces/apis/users';
import { localStorageEffect } from '@utils';

export const authenticatedStateAtom = atom<boolean>({
  key: 'authenticatedStateAtom',
  default: false,
});

export const accessTokenAtom = atom<string>({
  key: 'accessTokenAtom',
  default: '',
  effects: [localStorageEffect('accessToken', '')],
});

export const userStateAtom = atom<DecodedJWTPayload | undefined>({
  key: 'userStateAtom',
  default: undefined,
});

export const isLoginAtom = atom<boolean>({
  key: 'isLoginAtom',
  default: false,
});
