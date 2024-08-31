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
      console.log('Kakao callback: ' + kakaoAuthCode);

      // kakao의 accessCode, 땅찾고 자체 jwtToken 발급
      // 회원정보 없다면 회원가입까지 진행
      const result: LoginStatus = await userApi.verifyUser(kakaoAuthCode);
      if (result === 'LOGIN_SUCCESS') {
        const referrer = document.referrer;
        const isLogout = localStorage.getItem('isLogout');
        isLogout === 'true' && localStorage.setItem('isLogout', 'false');
        const isFindLandReferrer =
          referrer &&
          (referrer.indexOf('https://dev.findland.store/findLand') !== -1 ||
            referrer.indexOf('http://localhost:40005/findLand') !== -1);

        if (isFindLandReferrer) {
          console.log('Redirecting to findLand');
          navigate('findLand'); // Redirect to findLand
        } else if (referrer && isLogout !== 'true') {
          console.log('Going back two pages in the history');
          history.go(-2); // Go back two pages in the history
        } else {
          console.log('No valid referrer, redirecting to findLand');
          navigate('findLand'); // Default to findLand if no valid referrer
        }
      } else {
        navigate('login'); // In case of login failure
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
