import React from 'react';

import { useRecoilValue } from 'recoil';

import { Navigate, Outlet } from 'react-router-dom';

import { accessTokenAtom } from '@states/user';

export const ProtectedRoute: React.FC = () => {
  // const setAuthenticated = useSetRecoilState(authenticatedStateAtom);
  // const isAuthorized = useMemo<boolean>(() => (initialized && validateAuthorizedUser(token)) || false, [initialized]);

  const accessToken = useRecoilValue(accessTokenAtom);

  // accessToken 발급 받았다고 보내면 안됨
  if (!accessToken) {
    return <Navigate to={`/login`} />;
  }

  return <Outlet />;
};
