export type DecodedJWTHeader = {
  alg: string;
  typ: string;
  kid: string;
};

export type DecodedJWTPayload = {
  exp: number;
  iat: number;
  sub: string;
  roles: Array<string>;
};
