export interface DecodedJWTHeader {
  alg: string;
  typ: string;
  kid: string;
}

export interface DecodedJWTPayload {
  exp: number;
  iat: number;
  sub: string;
  roles: Array<string>;
}

export interface UserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  ageRange: string;
  birthyear: string;
  birthday: string;
  gender: string;
}

export interface UserSignupReq {
  name: string;
  email: string;
  phoneNumber: string;
  ageRange: string;
  birthyear: string;
  birthday: string;
  gender: string;
}

export interface UserSignupRes {
  jwtToken: string;
}

export interface KakaoAccRes {
  accessToken: string;
  data: UserInfo;
}

export interface GetJwtTokenRes {
  jwtToken: string;
}

export interface GetLoginUrlRes {
  loginUrl: string;
}

export interface GetRedirictUrlReq {
  redirectUri: string;
}

const LoginStatus_detail = {
  KATF: 'KAKAO_ACCESS_TOKEN_FAILED',
  LS: 'LOGIN_SUCCESS',
  LF: 'LOGIN_FAILED',
  SS: 'SIGNUP_SUCCESS',
  SF: 'SIGNUP_FAILED',
} as const;

export type LoginStatus = (typeof LoginStatus_detail)[keyof typeof LoginStatus];
