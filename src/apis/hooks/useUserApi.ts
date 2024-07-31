import { useMemo } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { axiosAuth } from '@apis/routes/userAuth';
import { AxiosHeaderOptions } from '@interfaces';
import { accessTokenAtom, jwtTokenAtom, userDataAtom } from '@states/user';

type UserApiInstance = {
  login: () => Promise<void>;
  verifyUser: (kakaoCode: string) => Promise<void>;
  logout: () => void;
  kakaoLogout: () => Promise<void>;
} | null;

export const useUserApi = (): UserApiInstance => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const setjwtToken = useSetRecoilState(jwtTokenAtom);
  const setUserData = useSetRecoilState(userDataAtom);

  const instanceHeader: AxiosHeaderOptions = useMemo(
    () =>
      accessToken
        ? {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
              Authorization: '',
            },
          },
    [accessToken],
  );

  const url = '/auth';

  const api = useMemo(() => {
    if (axiosAuth) {
      return {
        login: async () =>
          await axiosAuth(instanceHeader)
            .getLoginUrl({ redirectUri: window.origin + '/kakaoCallback' })
            .then(({ data }) => {
              console.log('Get login url: ' + JSON.stringify(data));
              window.location.href = data.loginUrl;
            }),
        /**
         * VerifyUser 로직 순서
         * 1. kakao에서 발급해준 login url로 로그인을 하면, 인가 코드가 query문으로 돌아옴.
         * 2. verifyUser는 해당 인가 코드(= kakaoCode)를 이용하여
         *    kakao의 accessToken과 유저의 데이터를,
         * 3. kakao accessToken으로 땅찾고 자체 jwtToken을 발급받는다.
         *  a. 성공 200시 header에 jwtToken 파싱
         *  b. 실패 400시 회원가입 진행.
         *  3-b-1. 회원가입시, 2단계에서 받은 유저 데이터와 accessToken을 함께 보냄
         *  3-b-2. 새 유저 등록이 성공되었다면, 3단계 다시 진행하여 jwtToken 발급받음
         */
        verifyUser: async (kakaoCode: string) =>
          await axiosAuth(instanceHeader)
            .getKakaokAccessToken(kakaoCode, window.origin + '/kakaoCallback')
            .then(async (res) => {
              const kakaoAccessToken = res.data.accessToken;
              console.log('kakao access token', kakaoAccessToken);
              setAccessToken(kakaoAccessToken);

              console.log('user data', res.data.data);
              const userData = res.data.data;
              setUserData(userData);

              await axiosAuth({ headers: { Authorization: 'Bearer ' + kakaoAccessToken } })
                .getJwtToken()
                .then((res) => {
                  const givenJwtToken = res.data.jwtToken;
                  console.log('jwt token', givenJwtToken);

                  setjwtToken(givenJwtToken);
                })
                .catch(async (e) => {
                  console.log('error in getJwtToken', e);
                  if (e.response.status === 400) {
                    console.log('sendData ', userData);
                    await axiosAuth(instanceHeader)
                      .signUp(userData)
                      .then(async (res) => {
                        console.log('signUp status: ' + res.status);
                        if (res.status === 200) {
                          await axiosAuth({
                            headers: { Authorization: `Bearer ${kakaoAccessToken}` },
                          })
                            .getJwtToken()
                            .then((res) => {
                              console.log('signup and get jwtToken res', res);
                              const givenJwtToken = res.data.jwtToken;
                              console.log('jwt token', givenJwtToken);

                              setjwtToken(givenJwtToken);
                            });
                        }
                      });
                  }
                });
            })
            .catch((e) => {
              console.error('error in getting kakao access token', e);
            }),
        logout: () => axiosAuth(instanceHeader).logout(),
        kakaoLogout: () => axiosAuth(instanceHeader).kakaoLogout({ redirectUri: window.origin + `/login` }),
      };
    } else {
      return null;
    }
  }, [instanceHeader, setAccessToken, setUserData, setjwtToken]);

  return api;
};
