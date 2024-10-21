import { Box, IconButton, Typography, styled } from '@mui/material';

export const MainAlertGrid = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: '80%',
  height: 'auto',
  minHeight: '160px',
  backgroundColor: '#fff',
  border: '1px solid #562',
}));

export const MessageInfoBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: 80,
}));

export const MessageTitleBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  padding: 10,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid #562',
  '& > .MuiSvgIcon-root': {
    width: 24,
    height: 24,
    marginRight: 11,
    color: '#562',
  },
}));

export const TitleTypo = styled(Typography)(() => ({
  height: 24,
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: '24px',
  letterSpacing: '0.15px',
  color: '#562',
  textTransform: 'capitalize',
}));

export const CloseButton = styled(IconButton)(() => ({
  width: 16,
  height: 16,
  padding: 0,
  marginRight: 10,
  marginLeft: 'auto',
  backgroundColor: 'transparent',

  '& .MuiButton-label': {
    '& svg': {
      sx: {
        color: '#562',
      },
    },
  },
}));

export const MessageContentBox = styled(Box)(() => ({
  height: 'auto',
  fontSize: 12,
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  alignItems: 'center',
}));
