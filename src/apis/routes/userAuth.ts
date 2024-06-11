import { AxiosResponse } from 'axios';

import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions } from '@interfaces/apis';
import { GetJwtTokenRes, GetLoginUrlReq, GetLoginUrlRes, KakaoAccRes, UserSignupReq } from '@interfaces/apis/users';

export interface AxiosAuthReturn {
  getLoginUrl: (params: GetLoginUrlReq) => Promise<AxiosResponse<GetLoginUrlRes>>; // 첫번째
  getKakaokAccessToken: (kakaoCode: string, redirectUri: string) => Promise<AxiosResponse<KakaoAccRes>>; // 두번째
  getJwtToken: () => Promise<AxiosResponse<GetJwtTokenRes>>; // 세번째
  signUp: (sendData: UserSignupReq) => Promise<AxiosResponse>; // 세번째 오류나면 실행. 그 후, 다시 세번째로
  logout: () => void;
}

export const axiosAuth = (opt: AxiosHeaderOptions): AxiosAuthReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });

  return {
    getLoginUrl: async (params) => {
      const url = `/auth/kakao/login`;
      return instance.get<GetLoginUrlRes>(url, { params: { redirectUri: params.redirectUri } });
    },
    getKakaokAccessToken: async (kakaoCode: string, redirectUri: string) => {
      const url = `/auth/kakao/getToken`;
      return instance.get<KakaoAccRes>(url, { params: { redirectUri: redirectUri, code: kakaoCode } });
    },
    getJwtToken: async () => {
      const url = `/auth/kakaologin`;
      return instance.get(url);
    },
    signUp: (sendData: UserSignupReq) => {
      const url = `/auth/signup`;
      return instance.post(url, sendData);
    },
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('jwtToken');
    },
  };
};
