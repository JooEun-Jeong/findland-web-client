import { AxiosResponse } from 'axios';

import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions } from '@interfaces/apis';
import { GetJwtTokenRes, GetLoginUrlRes, KakaoAccRes, UserSignupReq } from '@interfaces/apis/users';

export interface AxiosAuthReturn {
  getLoginUrl: () => Promise<AxiosResponse<GetLoginUrlRes>>; // 첫번째
  getKakaokAccessToken: (kakaoCode: string) => Promise<AxiosResponse<KakaoAccRes>>; // 두번째
  getJwtToken: () => Promise<AxiosResponse<GetJwtTokenRes>>; // 세번째
  signUp: (sendData: UserSignupReq) => Promise<AxiosResponse>; // 세번째 오류나면 실행. 그 후, 다시 세번째로
  logout: () => void;
}

export const axiosAuth = (opt: AxiosHeaderOptions): AxiosAuthReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getLoginUrl: async () => {
      const url = `/api/v1/auth/kakao/login`;
      return instance.get<GetLoginUrlRes>(url);
    },
    getKakaokAccessToken: async (kakaoCode: string) => {
      const url = `/api/v1/auth/kakao/getToken?code=${kakaoCode}`;
      return instance.get<KakaoAccRes>(url);
    },
    getJwtToken: async () => {
      const url = `/api/v1/auth/kakaologin`;
      return instance.get(url);
    },
    signUp: (sendData: UserSignupReq) => {
      const url = `/api/v1/auth/signup`;
      return instance.post(url, sendData);
    },
    logout: () => localStorage.removeItem('accessToken'),
  };
};
