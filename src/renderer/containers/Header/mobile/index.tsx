import React, { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import { Logout as LogoutIcon, Business as BusinIcon } from '@mui/icons-material';
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
    navigate(`/my-page`);
  }, [navigate]);

  const goContact = useCallback(() => {
    navigate(`/contact`);
  }, [navigate]);

  const goAboutBusiness = useCallback(() => {
    navigate(`/about-busniess`);
  }, [navigate]);

  const logout = useCallback(() => {
    userApi?.kakaoLogout();
  }, [userApi]);

  return (
    <>
      <HeaderWrapper sx={{ borderTop: '2px solid #e5e5e5', padding: '2%' }}>
        <IconButton isMobile={isMobile} onClick={goHome}>
          <HomeIcon />홈
        </IconButton>
        <IconButton isMobile={isMobile} onClick={goMyPage}>
          <UserIcon />
          마이페이지
        </IconButton>
        <IconButton isMobile={isMobile} onClick={goContact}>
          <MessageIcon />
          문의
        </IconButton>
        <IconButton isMobile={isMobile} onClick={goAboutBusiness}>
          <BusinIcon sx={{ height: isMobile ? '35%' : 24, width: isMobile ? '35%' : 24 }} />
          회사정보
        </IconButton>
        <IconButton isMobile={isMobile} onClick={logout}>
          <LogoutIcon sx={{ height: isMobile ? '35%' : 24, width: isMobile ? '35%' : 24 }} />
          로그아웃
        </IconButton>
      </HeaderWrapper>
    </>
  );
};
