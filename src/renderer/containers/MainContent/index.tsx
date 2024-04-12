import React from 'react';

import { useRecoilValue } from 'recoil';

import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';

import logoImg from '@assets/png/logo.png';
import { isMobileAtom } from '@states';

import { Ariticles } from './Articles';
import { SearchBarArea } from './SearchBarArea';
import { AdvertiseMentWrapper, MainContentWrapper } from './styled';

export const MainContent = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useRecoilValue(isMobileAtom);

  return (
    <>
      <MainContentWrapper>
        {!(isSmallScreen || isMobile) ? (
          <Grid container spacing={2} className="mainGrid">
            <Grid item xs={1.5} className="advertiseMentGrid">
              <AdvertiseMentWrapper>광고</AdvertiseMentWrapper>
            </Grid>
            <Grid item xs={5.5}>
              <SearchBarArea />
            </Grid>
            <Grid item xs={5}>
              <Ariticles width={598} height={'100%'} />
            </Grid>
          </Grid>
        ) : (
          <>
            <Box
              sx={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingTop: '10vh',
              }}
            >
              <img src={logoImg} width="35%" />
            </Box>
            <SearchBarArea />
          </>
        )}
      </MainContentWrapper>
    </>
  );
};
