import React, { useEffect } from 'react';

import axios from 'axios';

export const KakaoCallback = () => {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grant_type = 'authorization_code';
    const client_id = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;

    console.log('params: ', params);
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((res) => {
        console.log(res);
        const { data } = res;
        const { access_token } = data;
        if (access_token) {
          console.log(`Bearer ${access_token}`);
          axios
            .post(
              'https://kapi.kakao.com/v2/user/me',
              {},
              {
                headers: {
                  Autorization: `Bearer ${access_token}`,
                  'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
              },
            )
            .then((res) => {
              console.log('Success');
              console.log(res);
            });
        } else {
          console.log('No token');
        }
      });
  }, []);
  return <></>;
};
