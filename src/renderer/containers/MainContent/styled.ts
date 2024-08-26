import { useRecoilValue } from 'recoil';

import { Box, Typography, styled } from '@mui/material';

import { isMobileAtom } from '@states';

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

export const SearchBarWrapper = styled(Box)(() => {
  const isMobile = useRecoilValue(isMobileAtom);
  return {
    display: 'flex',
    width: '100%',
    height: isMobile ? '60%' : 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30px',
  };
});

export const SearchMainWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  minWidth: theme.breakpoints.down('sm') ? 200 : 571,
  display: 'flex',
  paddingTop: theme.breakpoints.down('sm') ? 0 : '80px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: '20px',
  flexDirection: 'column',
  overflow: 'auto',
}));

export const SearchTitleTypo = styled(Typography)(({ theme }) => {
  const isMobile = useRecoilValue(isMobileAtom);
  return {
    fontSize: isMobile ? '1.4rem' : theme.breakpoints.down('sm') ? '1.4rem' : 36,
  };
});

export const OpenImageWrapper = styled(Box)(({ theme }) => {
  const isMobile = useRecoilValue(isMobileAtom);
  return {
    display: 'flex',
    marginTop: '10px',
    height: '10%',
    '& .content': {
      fontSize: isMobile ? '0.6rem' : 12,
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiCardMedia-root': {
      paddingRight: '10px',
      width: theme.breakpoints.down('sm') ? '40%' : '80%',
      opacity: 0.3,
    },
  };
});

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
  width: '100vw',
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

export const AccordionWrapper = styled(Box)(({ theme }) => {
  const isMobile = useRecoilValue(isMobileAtom);
  return {
    width: theme.breakpoints.down('sm') ? '100%' : 522,
    '& .MuiButtonBase-root': {
      height: '7vh',
    },
    '& .mainTitle': {
      fontWeight: 700,
      fontSize: isMobile ? '0.7rem' : '1rem',
    },
    '& .methodTitle': {
      fontSize: isMobile ? '0.7rem' : '0.7rem',
      fontWeight: 'bold',
    },
    '& .methodContent': {
      fontSize: isMobile ? '0.7rem' : '0.7rem',
    },
  };
});
