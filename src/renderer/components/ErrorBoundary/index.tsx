import React from 'react';

import { WarningOutlined as WarningIcon } from '@mui/icons-material';
import { styled, Box, Typography, Button } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';

const ErrorWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
}));

const IconWrapper = styled(Box)(() => ({
  paddingTop: '10px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Typo = styled(Typography)(() => ({
  fontSize: '1.8rem',
  fontWeight: 600,
  color: '#f75454',
}));

const AgainButton = styled(Button)(() => ({
  width: '200px',
  padding: '4%',
  backgroundColor: 'yellow',
}));

export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <ErrorWrapper>
      <IconWrapper>
        <WarningIcon />
      </IconWrapper>
      <Typo sx={{ marginTop: '20px' }}>Something went wrong</Typo>
      <Typo sx={{ marginTop: '5px' }}>{error.message}</Typo>
      <AgainButton onClick={resetErrorBoundary} sx={{ marginTop: '20px' }}>
        Try again
      </AgainButton>
    </ErrorWrapper>
  );
};