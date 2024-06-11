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

export interface GetJwtTokenRes {}

export interface GetLoginUrlRes {
  loginUrl: string;
}
