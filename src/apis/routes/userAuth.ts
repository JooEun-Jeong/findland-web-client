import axios, { AxiosResponse } from 'axios';

import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions } from '@interfaces/apis';
import { GetJwtTokenRes, GetRedirictUrlReq, GetLoginUrlRes, KakaoAccRes, UserSignupReq } from '@interfaces/apis/users';

export interface AxiosAuthReturn {
  getLoginUrl: (params: GetRedirictUrlReq) => Promise<AxiosResponse<GetLoginUrlRes>>; // 첫번째
  getKakaokAccessToken: (kakaoCode: string, redirectUri: string) => Promise<AxiosResponse<KakaoAccRes>>; // 두번째
  getJwtToken: () => Promise<AxiosResponse<GetJwtTokenRes>>; // 세번째
  signUp: (sendData: UserSignupReq) => Promise<AxiosResponse>; // 세번째 오류나면 실행. 그 후, 다시 세번째로
  logout: () => void;
  kakaoLogout: (params: GetRedirictUrlReq) => Promise<AxiosResponse<string>>;
}

export const axiosAuth = (opt: AxiosHeaderOptions): AxiosAuthReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });

  return {
    getLoginUrl: async (params) => {
      const url = `/auth/kakao/login`;
      return instance.get<GetLoginUrlRes>(url, { params: { redirectUri: params.redirectUri } }).catch((error) => {
        handleAxiosError(error);
        throw error;
      });
    },
    getKakaokAccessToken: async (kakaoCode: string, redirectUri: string) => {
      const url = `/auth/kakao/getToken`;
      return instance
        .get<KakaoAccRes>(url, { params: { redirectUri: redirectUri, code: kakaoCode } })
        .catch((error) => {
          handleAxiosError(error);
          throw error;
        });
    },
    getJwtToken: async () => {
      const url = `/auth/kakaologin`;
      return instance.get<GetJwtTokenRes>(url).catch((error) => {
        handleAxiosError(error);
        throw error;
      });
    },
    signUp: (sendData: UserSignupReq) => {
      const url = `/auth/signup`;
      return instance.post(url, sendData).catch((error) => {
        handleAxiosError(error);
        throw error;
      });
    },
    logout: () => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('kakaoCode');
    },
    kakaoLogout: (params) => {
      const url = `auth/kakao/logout`;
      return instance.get(url, { params: { redirectUri: params.redirectUri } }).catch((error) => {
        handleAxiosError(error);
        throw error;
      });
    },
  };
};

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log('server responded with non 2xx code: ', error.response.status);
      console.log('Response data: ', error.response.data);
    } else if (error.request) {
      console.log('No response received: ', error.request);
    } else {
      console.log('Error setting up request: ', error.message);
    }
  } else {
    console.log('Non-Axios error: ', error);
  }
};
