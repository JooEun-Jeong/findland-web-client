import React, { useMemo, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

import { MainContent } from '@/renderer/containers/MainContent';
import { SearchSwiper } from '@/renderer/containers/SearchSwiper';
import { ErrorFallback } from '@components';
import { Footer, HeaderM, HeaderW } from '@containers';
import { NotReady } from '@pages/NotReady';
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
              height: 'calc(var(--vh, 1vh) * 100)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'auto',
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
  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {isSmallScreen || isMobile ? MobileUI : <NotReady />}
      </ErrorBoundary>
    </React.Fragment>
  );
};
