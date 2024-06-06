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

export interface UserInfoRes {
  name: string;
  email: string;
  phoneNumber: string;
  ageRange: string;
  birthyear: string;
  birthday: string;
  gender: string;
  jwtToken?: string;
}

export interface UserSignupReq {
  name: string;
  email: string;
  phoneNumber: string;
  ageRange: string;
  birthyear: string;
  birthday: string;
  gender: string;
  accessToken: string;
}

export interface UserSignupRes {
  jwtToken: string;
}
