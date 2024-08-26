import { styled, Box } from '@mui/material';

export const BottomBox = styled(Box)(() => ({
  marginTop: '3%',
  padding: '1%',
  border: '1px solid #B1B2B5',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  display: 'flex',
}));

export const IconWrapper = styled(Box)(() => ({
  display: 'flex',
  minWidth: '33%',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '0.6rem',
}));
