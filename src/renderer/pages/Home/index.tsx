import React, { useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { MainContent } from '@/renderer/containers/MainContent';
import { Footer, HeaderM, HeaderW } from '@containers';
import { isMobileAtom } from '@states';

export const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useRecoilValue(isMobileAtom);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const DesktopUI = useMemo(
    () => (
      <>
        <HeaderW />
        <MainContent />
        <Footer />
      </>
    ),
    [],
  );

  const MobileUI = useMemo(
    () => (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          // padding: '10% 0 5% 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <MainContent />
        <HeaderM />
      </Box>
    ),
    [],
  );
  return <React.Fragment>{isSmallScreen || isMobile ? MobileUI : DesktopUI}</React.Fragment>;
};
