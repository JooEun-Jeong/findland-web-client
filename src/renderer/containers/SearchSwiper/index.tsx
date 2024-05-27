import React from 'react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import '@theme/swiper.pagination.style.css';
import { Box, Typography } from '@mui/material';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import logoImg from '@assets/png/logoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { Loading } from '@pages/Loading';
import { SwiperContentBox } from '@pages/Login/styled';

import { LogoBox, MainBox } from './styled';

const descriptions = [
  { title: ['국가 기록원 자료를', '검색 중입니다'], des: '한자 문서를 한글로 번역해드립니다' },
  {
    title: ['토지조사부에', '할아버지 땅이 있습니다'],
    des: '1910년대 작성된 토지조사부에 소유자의 정보 기록되어 있습니다',
  },
  { title: ['한자와 주소가 같아야', '할아버지 땅입니다'], des: '제적등본과 토지조사부가 일치하면 맞습니다' },
];

export const SearchSwiper = () => {
  const Description = (props: { titles: string[]; des: string }) => (
    <>
      <SwiperContentBox>
        {props.titles.map((title, i) => (
          <Typography key={`des-title-${i}`} sx={{ fontSize: '3rem', fontWeight: 600 }}>
            {title}
          </Typography>
        ))}
        <Typography sx={{ fontSize: '1.8rem', fontWeight: 600 }}>{props.des}</Typography>
        <Loading />
      </SwiperContentBox>
    </>
  );

  return (
    <MainBox>
      <LogoBox>
        <img src={logoImg} width="18%" style={{ marginBottom: '20px' }} />
        <img src={logoTypoImg} width="15%" />
      </LogoBox>
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
          height: '90%',
        }}
      >
        {descriptions.map((description, idx) => (
          <SwiperSlide key={`des-${idx}`}>
            <Description titles={description.title} des={description.des} />
          </SwiperSlide>
        ))}
      </Swiper>
    </MainBox>
  );
};
