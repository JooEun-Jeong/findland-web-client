import React, { useEffect } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Outlet } from 'react-router-dom';

import { useUserApi } from '@apis/hooks/useUserApi';
import { AccessDenied } from '@pages/AccessDenied';
import { Loading } from '@pages/Loading';
import { Login } from '@pages/Login';
import { accessTokenAtom, authenticatedStateAtom } from '@states/user';
import { validateAuthorizedUser } from '@utils';

export const ProtectedRoute: React.FC = () => {
  // const setAuthenticated = useSetRecoilState(authenticatedStateAtom);
  // const isAuthorized = useMemo<boolean>(() => (initialized && validateAuthorizedUser(token)) || false, [initialized]);

  const accessToken = useRecoilValue(accessTokenAtom);

  const userApi = useUserApi();

  // useEffect(() => {
  //   // console.log('ProtectedRoute useEffect is called');
  //   // console.log(keycloak);
  //   // console.log(initialized);
  //   // console.log(keycloak.authenticated);
  //   if (!accessToken) {
  //     userApi && userApi.login().catch(console.error);
  //   }
  // }, [accessToken, userApi]);

  // if (!accessToken || !keycloak.authenticated) {
  //   return <Loading />;
  // }

  // accessToken 발급 받았다고 보내면 안됨
  if (!accessToken) {
    return <Login />;
  }

  return <Outlet />;
};
