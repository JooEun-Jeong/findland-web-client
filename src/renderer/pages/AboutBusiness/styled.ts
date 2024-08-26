import { Box, styled, Typography } from '@mui/material';

export const Typo08rem = styled(Typography)(() => ({
  fontSize: '0.8rem',
}));

export const TitleTypo = styled(Typography)(() => ({
  margin: '15px 0 0 0',
  fontSize: '1rem',
  fontWeight: 700,
}));

export const TypoWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '10px',
  paddingTop: '10px',
}));
