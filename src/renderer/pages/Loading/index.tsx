import React from 'react';

import { CircularProgress, Box, styled } from '@mui/material';

const LoadingWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100vw',
  height: 'calc(var(--vh, 1vh) * 100)',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const LoadingPage: React.FC = () => {
  return (
    <LoadingWrapper>
      <CircularProgress size={50} thickness={3} disableShrink />
    </LoadingWrapper>
  );
};
