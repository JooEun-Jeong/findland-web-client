import React, { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import { Logout as LogoutIcon } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';

import { useUserApi } from '@apis/hooks/useUserApi';
import { isMobileAtom } from '@states';

import { HomeIcon, IconButton, HeaderWrapper, MessageIcon, UserIcon } from './styled';

export const HeaderM = () => {
  const isMobile = useRecoilValue(isMobileAtom);
  const navigate = useNavigate();
  const userApi = useUserApi();

  const goHome = useCallback(() => {
    navigate(`/`);
  }, [navigate]);

  const goMyPage = useCallback(() => {
    navigate(`/myPage`);
  }, [navigate]);

  const logout = useCallback(() => {
    userApi?.logout();
    <Navigate to={`/login`} />;
  }, [userApi]);

  return (
    <>
      <HeaderWrapper sx={{ borderTop: '2px solid #f0f0f0', padding: '2%' }}>
        <IconButton isMobile={isMobile} onClick={goHome}>
          <HomeIcon />홈
        </IconButton>
        <IconButton isMobile={isMobile} onClick={goMyPage}>
          <UserIcon />
          마이페이지
        </IconButton>
        <IconButton isMobile={isMobile}>
          <MessageIcon />
          문의
        </IconButton>
        <IconButton isMobile={isMobile} onClick={logout}>
          <LogoutIcon sx={{ height: isMobile ? '25%' : 24, width: isMobile ? '25%' : 24 }} />
          로그아웃
        </IconButton>
      </HeaderWrapper>
    </>
  );
};
