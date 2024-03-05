import React, { useCallback, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { UseSearchApi } from '@apis/hooks/useSearchApi';
import OpenIm from '@assets/png/openim.png';
import { SearchField } from '@components';
import { FindMethods, OpenImDetail } from '@constants';

import { SearchMainWrapper, SearchBarWrapper, OpenImageWrapper } from './styled';

export const SearchBarArea = () => {
  const [text, setText] = useState('');

  const navigate = useNavigate();
  const searchApi = UseSearchApi();

  const handleSubmit = useCallback(async () => {
    if (searchApi) {
      const data = await searchApi.getLandOwners(text);
      console.log('data ', data);
      navigate(`/search/${text}`, { state: { keyword: text, data: data } });
    }
  }, [navigate, searchApi, text]);

  return (
    <>
      <SearchMainWrapper>
        <Typography sx={{ fontSize: 36 }}>조상의 이름으로</Typography>
        <Typography sx={{ fontSize: 36 }}>몰랐던 내 땅을 찾아보세요!</Typography>
        <SearchBarWrapper>
          <SearchField handleSubmit={handleSubmit} setText={setText} />
        </SearchBarWrapper>
        <Box sx={{ width: 522 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel1-content" id="panel1-header">
              <Typography sx={{ fontWeight: 700 }}>조상땅 찾는 방법</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {FindMethods.map((item, idx) => (
                <Box key={`find-method-${idx}`} sx={{ marginBottom: '5px' }}>
                  <Typography key={`find-method-title-${idx}`}>{item.title}</Typography>
                  {item.content.map((con, idx2) => (
                    <Typography key={`find-method-content-${idx}-${idx2}`}>{con}</Typography>
                  ))}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
          <OpenImageWrapper>
            <CardMedia component="img" sx={{ paddingRight: '10px', width: '80%', opacity: 0.3 }} src={OpenIm} />
            <Typography sx={{ fontSize: 12 }}>{OpenImDetail}</Typography>
          </OpenImageWrapper>
        </Box>
      </SearchMainWrapper>
    </>
  );
};
