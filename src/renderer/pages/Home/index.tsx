import React, { useCallback, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SearchTextField, SearchButton } from '@components';
import { UseSearchApi } from '@apis/hooks/useSearchApi';
import { MainBox, SearchBox, SearchWrapperBox } from './styled';

export const Home: React.FC = () => {
  // const [keyword, setKeyword] = useRecoilState(keywordAtom);
  const [text, setText] = useState('');

  const navigate = useNavigate();
  const searchApi = UseSearchApi();

  const handleSubmit = useCallback(async () => {
    if (searchApi) {
      const data = await searchApi.getLandOwners(text);
      console.log('data ', data);
      navigate(`/search/${text}`, { state: { keyword: text, data: data } });
    }
  }, []);

  return (
    <MainBox>
      <Box>
        <img src={require('@assets/png/logo.png').default} alt="logoImg" style={{ width: '270px', height: '300px' }} />
      </Box>
      <SearchWrapperBox>
        <SearchBox>
          <SearchTextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            sx={{ marginRight: '1px' }}
          />
          <SearchButton type="submit" onClick={handleSubmit}>
            <SearchIcon sx={{ color: 'rgb(255, 140, 68)' }} />
          </SearchButton>
        </SearchBox>
      </SearchWrapperBox>
    </MainBox>
  );
};
