import { useMemo } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { axiosCreateInstance } from '@apis/defaultSetting';
import { UserInfoRes, UserSignupReq, UserSignupRes } from '@interfaces/apis/users';
import { accessTokenAtom, jwtTokenAtom } from '@states/user';

type UserApiInstance = {
  login: () => Promise<void>;
  getUserInfo: () => Promise<UserInfoRes>;
  signUp: (sendData: UserSignupReq) => Promise<void>;
  logout: () => void;
} | null;

export const useUserApi = (): UserApiInstance => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const setjwtToken = useSetRecoilState(jwtTokenAtom);

  const instance = accessToken
    ? axiosCreateInstance({
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
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
        login: async () =>
          await instance.get(`/api/v1/auth/kakao/login`).then(({ data }) => {
            // data : {loginUrl: string;}
            console.log('Get login url: ' + JSON.stringify(data));
            window.location.href = data.loginUrl;
          }),
        getUserInfo: async () =>
          await instance.get(`/api/v1/auth/kakaologin`).then(({ headers, data }) => {
            // jwt, user info
            const jwtToken = headers.authorization;
            console.log('jwt token: ' + jwtToken);
            console.log('headers:  ' + headers);
            const givenData = data as UserInfoRes; // no jwt token. It's in the header
            console.log('Get User data including jwt: ' + JSON.stringify(givenData));

            const responseData: UserInfoRes = {
              jwtToken: jwtToken,
              ...givenData,
            };
            return responseData;
          }),
        signUp: async (sendData: UserSignupReq) =>
          await instance.post(`/api/v1/auth/signup`, sendData).then(({ data }) => {
            const jwtToken = (data as UserSignupRes).jwtToken;
            setjwtToken(jwtToken);
          }),
        logout: () => localStorage.removeItem('accessToken'),
      };
    } else {
      return null;
    }
  }, [instance, setjwtToken]);

  return api;
};
