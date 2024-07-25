import React from 'react';

import { Box, styled } from '@mui/material';

const AccessDeniedWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100vw',
  height: 'calc(var(--vh, 1vh) * 100)',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ff7777',
  fontSize: '3rem',
  fontWeight: 'bold',
}));

export const AccessDenied: React.FC = () => {
  return <AccessDeniedWrapper>Access Denied</AccessDeniedWrapper>;
};
