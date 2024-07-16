import { styled, Button, Box, Typography, Modal } from '@mui/material';

export const PayResultRootBox = styled(Box)(() => ({
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  minWidth: '300px',
  width: '100%',
  height: '40px',
  marginTop: '20px',
}));

export const MapModalWrapper = styled(Box)(() => ({
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: '#fff',
  border: '2px solid #000',
  p: 4,
}));

export const MapModalContentWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '3%',
  backgroundColor: '#FFF',
}));

export const MapModalTitleWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  margin: '30px 0',
}));

export const MapModalTitleTypo = styled(Typography)(() => ({
  fontSize: '2rem',
  fontWeight: 600,
}));

export const MapModalImageWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

export const MapModalSecondContentWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  marginTop: '2%',
}));

export const MapModalButtonWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  marginTop: '2%',
}));

export const MapModalContentFirstTypo = styled(Typography)(() => ({
  fontSize: '1.8rem',
}));

export const MapModalTitleContentWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const MapModalCContentWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  border: '1px solid #B1B2B5',
  marginTop: '5%',
}));
