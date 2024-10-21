import React, { useCallback, useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useUserApi } from '@apis/hooks/useUserApi';
import { Alert } from '@components';
import { LoginStatus } from '@interfaces/apis/users';
import { LoadingPage } from '@pages/Loading';
import { kakaoCodeAtom } from '@states/user';

export const KakaoCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = [...searchParams]; // test
  const setKakaoCode = useSetRecoilState(kakaoCodeAtom);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

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

        if (referrer && isLogout !== 'true') {
          console.log('Going back two pages in the history');
          history.go(-2); // Go back two pages in the history
        } else {
          navigate('findLand'); // Default to findLand if no valid referrer
        }
      } else {
        setIsAlertOpen(true);
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
      <Alert
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        message={{
          header: '로그인 실패',
          contents: [
            '로그인 중 문제가 발생했습니다.',
            '시크릿 모드가 아닌 환경에서 다시 로그인을 시도해주시거나 이메일로 문의 부탁드립니다.',
          ],
        }}
        afterAction={() => navigate('login')}
        afterActionName="로그인 화면으로 돌아가기"
      />
      <LoadingPage />
    </Box>
  );
};
