import React, { useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useUserApi } from '@apis/hooks/useUserApi';
import { UserSignupReq } from '@interfaces/apis/users';
import { Loading } from '@pages/Loading';
import { accessTokenAtom } from '@states/user';

export const KakaoCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = [...searchParams]; // test
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const navigate = useNavigate();

  const userApi = useUserApi();

  useEffect(() => {
    setAccessToken(query[0][1]);
    // setTimeout(() => {
    //   navigate(`findLand`);
    // }, 2000);
  }, []);

  useEffect(() => {
    const login_Signup = async () => {
      if (userApi) {
        let receivedData: UserSignupReq;
        await userApi
          .getUserInfo()
          .then((data) => (receivedData = { ...data, accessToken: accessToken }))
          .catch((e) => {
            console.error('error at getting jwt(getUserInfo): ' + e);
            if (e.response && (e.response.status === 401 || e.response.status === 400)) {
              userApi.signUp(receivedData);
            }
          });
        setTimeout(() => {
          navigate(`findLand`);
        }, 4000);
      }
    };

    login_Signup();
  }, [accessToken]);

  return (
    <Box sx={{ fontSize: '3rem', height: '100vh', width: '100vw' }}>
      <Loading />
    </Box>
  );
};
