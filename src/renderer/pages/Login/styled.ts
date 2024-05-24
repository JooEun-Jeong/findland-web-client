import { styled, Box, Button } from '@mui/material';

export const SwiperContentBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '5%',
  height: '100%',
  width: '90%',
}));

export const SwiperContentImageWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  marginTop: '5%',
}));

export const MainBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContents: 'center',
  alignItems: 'center',
  padding: '10% 3% 0 3%',
  width: '100vw',
  height: '100vh',
}));

export const LogoBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const LoginButton = styled(Button)(() => ({
  backgroundColor: '#ffbd59',
  color: '#000',
  width: '60%',
  padding: '3%',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  borderRadius: 5,
  '&:hover': {
    backgroundColor: 'rgb(235, 127, 56)',
  },
}));
