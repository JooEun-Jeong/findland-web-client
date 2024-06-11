import React, { useCallback, useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useUserApi } from '@apis/hooks/useUserApi';
import { Loading } from '@pages/Loading';

export const KakaoCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = [...searchParams]; // test

  const navigate = useNavigate();
  const userApi = useUserApi();

  const login_signup = useCallback(async () => {
    if (userApi) {
      const kakaoAuthCode = query[0][1];

      // kakao의 accessCode, 땅찾고 자체 jwtToken 발급
      // 회원정보 없다면 회원가입까지 진행
      await userApi.verifyUser(kakaoAuthCode);
      navigate(`findLand`);
    }
  }, [navigate, query, userApi]);

  useEffect(() => {
    if (query[0][1] !== '') {
      login_signup();
    }
  }, []);

  return (
    <Box sx={{ fontSize: '3rem', height: '100vh', width: '100vw' }}>
      <Loading />
    </Box>
  );
};
