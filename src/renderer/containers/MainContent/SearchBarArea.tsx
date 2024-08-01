import React, { useCallback, useMemo, useState } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Box, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { UseSearchApi } from '@apis/hooks/useSearchApi';
import OpenIm from '@assets/png/openim.png';
import { SearchField } from '@components';
import { FindMethods, OpenImDetail, TempPatentDetail } from '@constants';
import { isMobileAtom, isSearchingAtom } from '@states';
import { lotsAtom } from '@states/user';

import { DesAccordion } from './DesAccordion';
import { SearchMainWrapper, SearchBarWrapper, OpenImageWrapper, SearchTitleTypo, AccordionWrapper } from './styled';

export const SearchBarArea = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useRecoilValue(isMobileAtom);

  const navigate = useNavigate();
  const searchApi = UseSearchApi();

  const [text, setText] = useState('');
  const [isSearching, setIsSearching] = useRecoilState(isSearchingAtom);
  const setLots = useSetRecoilState(lotsAtom);

  const handleSubmit = useCallback(async () => {
    if (searchApi) {
      setIsSearching(true);
      const searchResult = await searchApi.getLandOwners(text, 0, 50);
      const landOwners = searchResult.landOwners;
      console.log('data ', landOwners);
      setLots(landOwners);
      setTimeout(function () {
        setIsSearching(false);
        navigate(`/search/${text}`, { state: { keyword: text, data: landOwners } });
      }, 6000);
    }
  }, [navigate, searchApi, setIsSearching, setLots, text]);

  const openImageArea = useMemo(() => {
    return (
      <OpenImageWrapper>
        <CardMedia component="img" src={OpenIm} />
        <Typography className="content">{isSmallScreen || isMobile ? TempPatentDetail : OpenImDetail}</Typography>
      </OpenImageWrapper>
    );
  }, [isMobile, isSmallScreen]);

  return (
    <>
      {!isSearching && (
        <SearchMainWrapper>
          <SearchTitleTypo>조상의 이름으로</SearchTitleTypo>
          <SearchTitleTypo>몰랐던 내 땅을 찾아보세요!</SearchTitleTypo>
          <SearchBarWrapper>
            <SearchField handleSubmit={handleSubmit} setText={setText} />
          </SearchBarWrapper>
          <Box sx={{ width: '80%', overflow: 'auto' }}>
            <DesAccordion mainTitle="조상땅 찾는 방법" cons={FindMethods} more={openImageArea} />
          </Box>
        </SearchMainWrapper>
      )}
    </>
  );
};
