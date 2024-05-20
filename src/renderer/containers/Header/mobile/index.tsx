import React, { useCallback } from 'react';

import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';

import { isMobileAtom } from '@states';

import { HomeIcon, IconButton, HeaderWrapper, MessageIcon, UserIcon } from './styled';

export const HeaderM = () => {
  const isMobile = useRecoilValue(isMobileAtom);
  const navigate = useNavigate();
  const goHome = useCallback(() => {
    navigate(`/`);
  }, [navigate]);

  const goMyPage = useCallback(() => {}, []);
  return (
    <>
      <HeaderWrapper>
        <IconButton isMobile={isMobile} onClick={goHome}>
          <HomeIcon />홈
        </IconButton>
        <IconButton isMobile={isMobile}>
          <UserIcon />
          마이페이지
        </IconButton>
        <IconButton isMobile={isMobile}>
          <MessageIcon />
          문의
        </IconButton>
      </HeaderWrapper>
    </>
  );
};
