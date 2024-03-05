import React from 'react';

import { styled, Button, Box } from '@mui/material';

import { ReactComponent as HomeImg } from '@assets/svg/home.svg';
import { ReactComponent as LoginImg } from '@assets/svg/login.svg';
import { ReactComponent as MessageImg } from '@assets/svg/message.svg';
import { ReactComponent as UserImg } from '@assets/svg/user.svg';

export const HeaderWrapper = styled(Box)(() => ({
  padding: '25px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const LogoWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const HomeIcon = () => <HomeImg style={{ marginRight: 8, height: 22, width: 21 }} />;

export const MessageIcon = () => <MessageImg style={{ marginRight: 3, color: 'black', width: 25, height: 24 }} />;

export const UserIcon = () => <UserImg style={{ marginRight: 3, width: 24, height: 24 }} />;

export const LoginIcon = () => <LoginImg style={{ marginRight: 8, height: 24, width: 24 }} />;
