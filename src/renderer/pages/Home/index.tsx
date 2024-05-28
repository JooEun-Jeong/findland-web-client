import React, { useMemo, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { MainContent } from '@/renderer/containers/MainContent';
import { SearchSwiper } from '@/renderer/containers/SearchSwiper';
import { Footer, HeaderM, HeaderW } from '@containers';
import { isMobileAtom, isSearchingAtom } from '@states';

export const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useRecoilValue(isMobileAtom);

  const isSearching = useRecoilValue(isSearchingAtom);

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
      <>
        {isSearching ? (
          <SearchSwiper />
        ) : (
          <Box
            sx={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <MainContent />
            <HeaderM />
          </Box>
        )}
      </>
    ),
    [isSearching],
  );
  return <React.Fragment>{isSmallScreen || isMobile ? MobileUI : DesktopUI}</React.Fragment>;
};
