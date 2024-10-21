import { useCallback, useMemo } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import axios, { AxiosResponse } from 'axios';

import { axiosAuth } from '@apis/routes/userAuth';
import { AxiosHeaderOptions } from '@interfaces';
import { GetJwtTokenRes, KakaoAccRes, LoginStatus, UserSignupReq } from '@interfaces/apis/users';
import { accessTokenAtom, jwtTokenAtom, userDataAtom } from '@states/user';

type UserApiInstance = {
  login: () => Promise<boolean>;
  verifyUser: (kakaoCode: string) => Promise<LoginStatus>;
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

  /**
   * VerifyUser 로직 순서
   * 1. kakao에서 발급해준 login url로 로그인을 하면, 인가 코드가 query문으로 돌아옴.
   * 2. verifyUser는 해당 인가 코드(= kakaoCode)를 이용하여
   *    kakao의 accessToken과 유저의 데이터를 얻는다
   * 3. kakao accessToken으로 땅찾고 자체 jwtToken을 발급받는다.
   *  a. 성공 200시 header에 jwtToken 파싱 -> 로그인 성공
   *  b. 실패 400시 회원가입 진행.
   *  3-b-1. 회원가입이 되었다면, 다시 로그인하게끔 안내
   */
  const verifyUser = useCallback(
    async (kakaoCode: string): Promise<LoginStatus> => {
      const axiosInstance = axiosAuth(instanceHeader);
      const redirectUri = window.location.origin + '/kakaoCallback'; // Update this as per your actual redirect URI

      try {
        // Step 2: Get Kakao access token and user data
        const kakaoResponse: AxiosResponse<KakaoAccRes> = await axiosInstance.getKakaokAccessToken(
          kakaoCode,
          redirectUri,
        );
        const { accessToken: kakaoAccessToken, data: userInfo } = kakaoResponse.data;
        setAccessToken(kakaoAccessToken);
        setUserData(userInfo);

        // Step 3: Get JWT token
        try {
          const jwtResponse: AxiosResponse<GetJwtTokenRes> = await axiosAuth({
            headers: { Authorization: 'Bearer ' + kakaoAccessToken },
          }).getJwtToken();
          console.log('jwtResponse', jwtResponse);
          if (axios.isAxiosError(jwtResponse) && jwtResponse.response?.status === 400) {
            const signupData: UserSignupReq = {
              ...userInfo,
            };
            console.log('sendData ', userInfo);

            try {
              // Perform signup
              await axiosAuth({
                headers: { Authorization: 'Bearer ' + accessToken },
              }).signUp(signupData);
              alert('회원가입되었습니다. 다시 로그인 부탁드립니다.');
              return 'SIGNUP_SUCCESS';
            } catch (signupError) {
              alert('회원가입에 실패했습니다.');
              return 'SIGNUP_FAILED';
            }
          }
          const { jwtToken } = jwtResponse.data;

          // Store JWT token in local storage or wherever you need it
          setjwtToken(jwtToken);

          return 'LOGIN_SUCCESS';
        } catch (jwtError) {
          console.log('jwtError', jwtError);
          return 'LOGIN_FAILED';
        }
      } catch (kakaoError) {
        return 'KAKAO_ACCESS_TOKEN_FAILED';
      }
    },
    [accessToken, instanceHeader, setAccessToken, setUserData, setjwtToken],
  );

  const api = useMemo(() => {
    if (axiosAuth) {
      return {
        login: async () =>
          await axiosAuth(instanceHeader)
            .getLoginUrl({ redirectUri: window.origin + '/kakaoCallback' })
            .then(({ data }) => {
              console.log('Get login url: ' + JSON.stringify(data));
              if (data) {
                window.location.href = data.loginUrl;
                return true;
              }
              return false;
            }),
        verifyUser: verifyUser,
        logout: () => axiosAuth(instanceHeader).logout(),
        kakaoLogout: async () =>
          axiosAuth(instanceHeader)
            .kakaoLogout({ redirectUri: window.origin + `/login` })
            .then(({ data }) => {
              console.log('Get logout url: ' + JSON.stringify(data));
              window.location.href = data;
              localStorage.removeItem('jwtToken');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('kakaoCode');
              localStorage.setItem('isLogout', 'true');
            }),
      };
    } else {
      return null;
    }
  }, [instanceHeader, verifyUser]);

  return api;
};
