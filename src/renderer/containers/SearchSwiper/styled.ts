import { styled, Box } from '@mui/material';

export const MainBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContents: 'center',
  alignItems: 'center',
  padding: '10% 3% 0 3%',
  width: '100vw',
  height: 'calc(var(--vh, 1vh) * 100)',
}));

export const LogoBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
