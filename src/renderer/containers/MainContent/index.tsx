import React from 'react';

import { Grid } from '@mui/material';

import { Ariticles } from './Articles';
import { SearchBarArea } from './SearchBarArea';
import { AdvertiseMentWrapper, MainContentWrapper } from './styled';

export const MainContent = () => {
  return (
    <>
      <MainContentWrapper>
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
      </MainContentWrapper>
    </>
  );
};
