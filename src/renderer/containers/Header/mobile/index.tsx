import React from 'react';

import { Box } from '@mui/material';

import { HomeIcon, IconButton, MainWrapper, MessageIcon, UserIcon } from './styled';

export const HeaderM = () => {
  return (
    <>
      <Box
        sx={{
          width: '100vw',
          backgroundColor: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <IconButton>
          <HomeIcon />홈
        </IconButton>
        <IconButton>
          <UserIcon />
          마이페이지
        </IconButton>
        <IconButton>
          <MessageIcon />
          문의
        </IconButton>
      </Box>
    </>
  );
};
