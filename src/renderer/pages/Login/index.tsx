import React, { useCallback, useState } from 'react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import '@theme/swiper.pagination.style.css';
import { useRecoilValue } from 'recoil';

import { Box, Typography } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import DisplayGoogleAds from '@/renderer/components/GoogleAds';
import { Terms } from '@/renderer/containers/Footer/Terms';
import { useUserApi } from '@apis/hooks/useUserApi';
import Des1Im from '@assets/png/FirstDes1.jpg';
import Des2Im from '@assets/png/FirstDes2.jpg';
import Des3Im from '@assets/png/FirstDes3.jpg';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { Alert, ErrorFallback } from '@components';
import { NotReady } from '@pages/NotReady';
import { isMobileAtom } from '@states';
import { accessTokenAtom, jwtTokenAtom } from '@states/user';

import { LoginButton, LogoBox, MainBox, SwiperContentBox, SwiperContentImageWrapper } from './styled';

const firstDescription = [
  { title: ['나도 모르던 조상 땅', '1분이면 확인 가능'], imageUrl: Des1Im },
  { title: ['땅찾고 팀은', '4.7억을 찾았습니다.'], imageUrl: Des2Im },
  { title: ['100년전 할아버지 땅이', '아직 많이 남아있습니다.'], imageUrl: Des3Im },
];

export const Login = () => {
  const userApi = useUserApi();
  const jwtToken = useRecoilValue(jwtTokenAtom);
  const accessToken = useRecoilValue(accessTokenAtom);
  const navigate = useNavigate();
  const isMobile = useRecoilValue(isMobileAtom);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogin = useCallback(() => {
    if (jwtToken !== '' && accessToken !== '') {
      // jwtToken도 정상이고 accessToken도 정상인 경우

      setTimeout(() => navigate(`/findLand`), 1500); // 메인페이지로
    } else {
      // accessToken이 만료된 경우
      // 처음부터 인가코드 받아서 로그인 진행해야됨.
      if (userApi) {
        userApi.login().then((data) => {
          if (!data) {
            setIsAlertOpen(true);
          } else {
            setTimeout(() => navigate(`/findLand`), 1500); // 메인페이지로
          }
        });
      }
    }
  }, [accessToken, jwtToken, navigate, userApi]);

  const Description = (props: { titles: string[]; imageUrl: string }) => (
    <>
      <SwiperContentBox>
        {props.titles.map((title, i) => (
          <Typography key={`des-title-${i}`} sx={{ fontSize: '1.2rem', fontWeight: 700 }}>
            {title}
          </Typography>
        ))}
        <SwiperContentImageWrapper>
          <img width="60%" src={props.imageUrl} alt="" />
        </SwiperContentImageWrapper>
      </SwiperContentBox>
    </>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {isMobile ? (
        <MainBox>
          <Alert
            isOpen={isAlertOpen}
            setIsOpen={setIsAlertOpen}
            message={{
              header: '로그인 실패',
              contents: ['로그인 중 문제가 발생했습니다.', '다시 로그인을 시도해주시거나 이메일로 문의 부탁드립니다.'],
            }}
            afterAction={() => navigate('login')}
            afterActionName="로그인 화면으로 돌아가기"
          />
          <LogoBox>
            <img src={logoImg} width="18%" style={{ marginBottom: '20px' }} />
            <img src={logoTypoImg} width="15%" />
          </LogoBox>
          <>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              rewind={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSwiper={(swiper) => console.log(swiper)}
              style={{
                width: '100%',
                height: '70%',
              }}
            >
              {firstDescription.map((description, idx) => (
                <SwiperSlide key={`des-${idx}`}>
                  <Description titles={description.title} imageUrl={description.imageUrl} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
          <LoginButton onClick={handleLogin}>카카오톡으로 간편 로그인</LoginButton>
          <Terms />
          {/*<div style={{ paddingTop: '5px', width: '100%' }}>*/}
          {/*  <div*/}
          {/*    className="grid place-content-center"*/}
          {/*    style={{ minHeight: '30px', width: '100%', border: '1px solid #BABABA' }}*/}
          {/*  >*/}
          {/*    <DisplayGoogleAds />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </MainBox>
      ) : (
        <NotReady />
      )}
    </ErrorBoundary>
  );
};
