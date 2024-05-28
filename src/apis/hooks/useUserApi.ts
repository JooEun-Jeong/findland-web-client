import { useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import { axiosCreateInstance } from '@apis/defaultSetting';
import { accessTokenAtom } from '@states/user';

type UserApiInstance = {
  login: () => Promise<void>;
  logout: () => void;
} | null;

export const useUserApi = (): UserApiInstance => {
  const accessToken = useRecoilValue(accessTokenAtom);

  const instance = accessToken
    ? axiosCreateInstance({
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${accessToken}`,
        },
      })
    : axiosCreateInstance({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

  const api = useMemo(() => {
    if (instance) {
      return {
        login: () =>
          instance.get(`/api/v1/auth/kakao/login`).then(({ data }) => {
            // data : {loginUrl: string;}
            console.log('this is given login data' + JSON.stringify(data));
            window.location.href = data.loginUrl;
          }),
        logout: () => localStorage.removeItem('accessToken'),
      };
    } else {
      return null;
    }
  }, [instance]);

  return api;
};
