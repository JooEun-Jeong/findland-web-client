import React, { useCallback } from 'react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import '@theme/swiper.pagination.style.css';
import { Typography } from '@mui/material';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useUserApi } from '@apis/hooks/useUserApi';
import Des1Im from '@assets/png/FirstDes1.png';
import Des2Im from '@assets/png/FirstDes2.png';
import Des3Im from '@assets/png/FirstDes3.png';
import logoImg from '@assets/png/logoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';

import { LoginButton, LogoBox, MainBox, SwiperContentBox, SwiperContentImageWrapper } from './styled';

const firstDescription = [
  { title: ['나도 모르던 조상 땅', '1분이면 확인 가능'], imageUrl: Des1Im },
  { title: ['땅을 찾은 사람들은', '평균 3억을 돌려받았습니다.'], imageUrl: Des2Im },
  { title: ['100년전 할아버지 땅이', '아직 많이 남아있습니다.'], imageUrl: Des3Im },
];

export const Login = () => {
  const userApi = useUserApi();

  const handleLogin = useCallback(() => {
    userApi?.login();
  }, [userApi]);
  const Description = (props: { titles: string[]; imageUrl: string }) => (
    <>
      <SwiperContentBox>
        {props.titles.map((title, i) => (
          <Typography key={`des-title-${i}`} sx={{ fontSize: '3rem', fontWeight: 700 }}>
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
    <MainBox>
      <LogoBox>
        <img src={logoImg} width="18%" style={{ marginBottom: '20px' }} />
        <img src={logoTypoImg} width="15%" />
      </LogoBox>
      <>
        <div id="containerForBullets" />
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
    </MainBox>
  );
};
