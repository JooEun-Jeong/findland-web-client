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
