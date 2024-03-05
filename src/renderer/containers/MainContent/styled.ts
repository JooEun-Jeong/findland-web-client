import { Box, Typography, styled } from '@mui/material';

export const ArticleTitleTypo = styled(Typography)(() => ({
  color: '#fff',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&.lower': {
    marginBottom: '25px',
  },
}));

export const ArticleHeader = styled(Box)((props: { width: number | string }) => ({
  backgroundColor: '#FFBD59',
  width: props.width,
  height: 53,
}));

export const ArticleContentWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  '&.lower': {
    marginTop: '35px',
    height: '30%',
  },
}));

export const SearchBarWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '30px',
}));

export const SearchMainWrapper = styled(Box)(() => ({
  width: '100%',
  minWidth: 571,
  height: '100%',
  display: 'flex',
  paddingTop: '80px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: '20px',
  flexDirection: 'column',
}));

export const OpenImageWrapper = styled(Box)(() => ({
  display: 'flex',
  marginTop: '10px',
}));

export const AdvertiseMentWrapper = styled(Box)(() => ({
  border: '1px solid #B1B2B5',
  width: 150,
  height: '80%',
  background: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const MainContentWrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  '&.mainGrid': {
    padding: '25px',
    width: '100%',
    height: '100%',
  },
  '&.advertiseMentGrid': {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));
