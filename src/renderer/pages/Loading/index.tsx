import React from 'react';

import { CircularProgress, Box, styled } from '@mui/material';

const LoadingWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100vw',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Loading: React.FC = () => {
  return (
    <LoadingWrapper>
      <CircularProgress size={90} thickness={4} disableShrink />
    </LoadingWrapper>
  );
};
