import React from 'react';

import { CircularProgress, Box, styled } from '@mui/material';

const LoadingWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Loading: React.FC = () => {
  return (
    <LoadingWrapper>
      <CircularProgress size={40} thickness={3} disableShrink />
    </LoadingWrapper>
  );
};
