import React from 'react';

import { Box } from '@mui/material';

import LogoIm from '@assets/png/logoImg.png';
import LogoTypoIm from '@assets/png/logoTypo.png';
import { MenuButton } from '@components';

import { HeaderWrapper, HomeIcon, LoginIcon, LogoWrapper, MessageIcon, UserIcon } from './styled';

export const HeaderW: React.FC = () => {
  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <img src={LogoIm} width="65px" height="70px" />
          <img src={LogoTypoIm} width="95px" height="33px" style={{ marginLeft: '15px', marginTop: '10px' }} />
        </LogoWrapper>
        <Box sx={{ display: 'flex' }}>
          <MenuButton>
            <HomeIcon />
            회사소개
          </MenuButton>
          <MenuButton>
            <MessageIcon />
            문의하기
          </MenuButton>
          <MenuButton sx={{ width: 118 }}>
            <UserIcon />
            마이페이지
          </MenuButton>
          <MenuButton className="last-child">
            <LoginIcon />
            로그인
          </MenuButton>
        </Box>
      </HeaderWrapper>
    </>
  );
};
