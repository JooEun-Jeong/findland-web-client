import React from 'react';

import { useRecoilValue } from 'recoil';

import { Box, Button, styled } from '@mui/material';

import { ReactComponent as HomeImg } from '@assets/svg/home.svg';
import { ReactComponent as LoginImg } from '@assets/svg/login.svg';
import { ReactComponent as MessageImg } from '@assets/svg/message.svg';
import { ReactComponent as UserImg } from '@assets/svg/user.svg';
import { isMobileAtom } from '@states';

export const HomeIcon = () => {
  const isMobile = useRecoilValue(isMobileAtom);
  return <HomeImg style={{ height: isMobile ? '20%' : 22, width: isMobile ? '21%' : 21 }} />;
};

export const MessageIcon = () => {
  const isMobile = useRecoilValue(isMobileAtom);
  return <MessageImg style={{ color: 'black', width: isMobile ? '26%' : 25, height: isMobile ? '25%' : 24 }} />;
};

export const UserIcon = () => {
  const isMobile = useRecoilValue(isMobileAtom);
  return <UserImg style={{ width: isMobile ? '25%' : 24, height: isMobile ? '25%' : 24 }} />;
};

export const LoginIcon = () => {
  const isMobile = useRecoilValue(isMobileAtom);
  return <LoginImg style={{ height: isMobile ? '25%' : 24, width: isMobile ? '25%' : 24 }} />;
};

export const IconButton = styled(Button)((props: { isMobile: boolean }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'black',
  fontSize: props.isMobile ? '1.6rem' : '1rem',
}));

export const HeaderWrapper = styled(Box)(() => ({
  width: '100vw',
  backgroundColor: '#FFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));
