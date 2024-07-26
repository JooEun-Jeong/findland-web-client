import React from 'react';

import { Box, Typography } from '@mui/material';

import logoImg from '@assets/png/logo.png';

export const NotReady = () => {
  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: 'calc(var(--vh, 1vh) * 100)',
        }}
      >
        <Box
          sx={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '10%',
          }}
        >
          <img src={logoImg} width="15%" />
          <Typography sx={{ fontSize: '1rem' }}>PC버전은 준비 중입니다.</Typography>
          <Typography sx={{ fontSize: '1rem' }}>모바일로 확인 부탁드립니다.</Typography>
        </Box>
      </Box>
    </>
  );
};
