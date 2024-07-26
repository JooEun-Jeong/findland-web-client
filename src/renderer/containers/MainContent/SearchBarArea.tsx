import React, { useCallback, useState } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { UseSearchApi } from '@apis/hooks/useSearchApi';
import OpenIm from '@assets/png/openim.png';
import { SearchField } from '@components';
import { FindMethods, OpenImDetail, TempPatentDetail } from '@constants';
import { isMobileAtom, isSearchingAtom } from '@states';
import { lotsAtom } from '@states/user';

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
      const landOwners = await searchApi.getLandOwners(text);
      console.log('data ', landOwners);
      setLots(landOwners);
      setTimeout(function () {
        setIsSearching(false);
        navigate(`/search/${text}`, { state: { keyword: text, data: landOwners } });
      }, 6000);
    }
  }, [navigate, searchApi, setIsSearching, setLots, text]);

  return (
    <>
      {!isSearching && (
        <SearchMainWrapper>
          <SearchTitleTypo>조상의 이름으로</SearchTitleTypo>
          <SearchTitleTypo>몰랐던 내 땅을 찾아보세요!</SearchTitleTypo>
          <SearchBarWrapper>
            <SearchField handleSubmit={handleSubmit} setText={setText} />
          </SearchBarWrapper>
          <AccordionWrapper>
            <Accordion>
              <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel1-content" id="panel1-header">
                <Typography className="mainTitle">조상땅 찾는 방법</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {FindMethods.map((item, idx) => (
                  <Box key={`find-method-${idx}`} sx={{ marginBottom: '5px' }}>
                    <Typography key={`find-method-title-${idx}`} className="methodTitle">
                      {item.title}
                    </Typography>
                    {item.content.map((con, idx2) => (
                      <Typography key={`find-method-content-${idx}-${idx2}`} className="methodContent">
                        {con}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
            <OpenImageWrapper>
              <CardMedia component="img" src={OpenIm} />
              <Typography className="content">{isSmallScreen || isMobile ? TempPatentDetail : OpenImDetail}</Typography>
            </OpenImageWrapper>
          </AccordionWrapper>
        </SearchMainWrapper>
      )}
    </>
  );
};
