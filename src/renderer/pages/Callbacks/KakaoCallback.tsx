import React, { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Loading } from '@pages/Loading';
import { accessTokenAtom } from '@states/user';

export const KakaoCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = [...searchParams]; // test
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(query[0][1]);
    setTimeout(() => {
      navigate(`findLand`);
    }, 2000);
  }, []);

  return (
    <Box sx={{ fontSize: '3rem', height: '100vh', width: '100vw' }}>
      <Loading />
    </Box>
  );
};
