import React, { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { Navigate, Outlet } from 'react-router-dom';

import { useUserApi } from '@apis/hooks/useUserApi';
import { accessTokenAtom, jwtTokenAtom } from '@states/user';

export const ProtectedRoute: React.FC = () => {
  // const setAuthenticated = useSetRecoilState(authenticatedStateAtom);
  // const isAuthorized = useMemo<boolean>(() => (initialized && validateAuthorizedUser(token)) || false, [initialized]);
  const userApi = useUserApi();
  const accessToken = useRecoilValue(accessTokenAtom);
  const jwtToken = useRecoilValue(jwtTokenAtom);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && userApi) {
        await userApi.getUserInfo().catch((e) => {
          console.error('error at getting jwt(getUserInfo): ' + e);
          <Navigate to={`/login`} />;
        });
      }
    };

    fetchData();
  }, [accessToken, userApi]);

  // accessToken 발급 받았다고 보내면 안됨
  if (!accessToken || !jwtToken) {
    return <Navigate to={`/login`} />;
  }

  return <Outlet />;
};
