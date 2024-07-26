import { atom } from 'recoil';

import { UserInfo } from '@interfaces/apis/users';
import { localStorageEffect } from '@utils';

export const authenticatedStateAtom = atom<boolean>({
  key: 'authenticatedStateAtom',
  default: false,
});

export const jwtTokenAtom = atom<string>({
  key: 'jwtTokenAtom',
  default: '',
  effects: [localStorageEffect('jwtToken', '')],
});

export const accessTokenAtom = atom<string>({
  key: 'accessTokenAtom',
  default: '',
  effects: [localStorageEffect('accessToken', '')],
});

export const refreshTokenAtom = atom<string>({
  key: 'refreshTokenAtom',
  default: '',
  effects: [localStorageEffect('refreshToken', '')],
});

export const userDataAtom = atom<UserInfo>({
  key: 'userDataAtom',
  default: undefined,
  effects: [localStorageEffect('userData', '')],
});

export const isLoginAtom = atom<boolean>({
  key: 'isLoginAtom',
  default: false,
});

export const kakaoCodeAtom = atom<string>({
  key: 'kakaoCodeAtom',
  default: '',
  effects: [localStorageEffect('kakaoCode', '')],
});
