import { styled, Box, Typography } from '@mui/material';

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
  minWidth: '25%',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '0.6rem',
}));

export const ModalWrapper = styled(Box)(() => ({
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  backgroundColor: '#fff',
  padding: '0 3% 3% 3%',
  border: '2px solid #000',
  display: 'flex',
  maxHeight: '80vh',
  overflow: 'auto',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  p: 4,
}));

export const TermTitleTypo = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 600,
  padding: '0 0 3% 0',
}));

export const TitleTypoWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  backgroundColor: '#fff',
  width: '100%',
  padding: '3% 0 0 0',
  height: '100%',
}));
