import React, { useCallback, useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useUserApi } from '@apis/hooks/useUserApi';
import { LoginStatus } from '@interfaces/apis/users';
import { LoadingPage } from '@pages/Loading';
import { kakaoCodeAtom } from '@states/user';

export const KakaoCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = [...searchParams]; // test
  const setKakaoCode = useSetRecoilState(kakaoCodeAtom);

  const navigate = useNavigate();
  const userApi = useUserApi();

  const login_signup = useCallback(async () => {
    if (userApi) {
      const kakaoAuthCode = query[0][1];
      setKakaoCode(kakaoAuthCode);

      // kakao의 accessCode, 땅찾고 자체 jwtToken 발급
      // 회원정보 없다면 회원가입까지 진행
      const result: LoginStatus = await userApi.verifyUser(kakaoAuthCode);
      if (result === 'LOGIN_SUCCESS') {
        navigate(`findLand`);
      } else {
        navigate(`login`);
      }
    }
  }, [navigate, query, setKakaoCode, userApi]);

  useEffect(() => {
    if (query[0][1] !== '') {
      login_signup();
    }
  }, []);

  return (
    <Box sx={{ fontSize: '1.5rem', height: 'calc(var(--vh, 1vh) * 100)', width: '100vw' }}>
      <LoadingPage />
    </Box>
  );
};
