import React from 'react';

import { Box } from '@mui/material';

import fArchiveIm from '@assets/png/fArchives.jpg';
import fCourtIm from '@assets/png/fCourt.png';
import fDataIm from '@assets/png/fData.png';
import fGovernIm from '@assets/png/fGovern.jpg';
import fLandInfraIm from '@assets/png/fLandInfra.png';
import fUseLandIm from '@assets/png/fUseLand.jpg';

const ImageWrapper = (props: { src: string; alt: string }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <img src={props.src} alt={props.alt} style={{ width: 168 }} />
      </Box>
    </>
  );
};

export const Footer = () => {
  return (
    <>
      <Box sx={{ width: '100%', height: '100px', display: 'flex', backgroundColor: '#F4F4F4' }}>
        <ImageWrapper src={fGovernIm} alt="정부24 이미지" />
        <ImageWrapper src={fCourtIm} alt="법원 이미지" />
        <ImageWrapper src={fLandInfraIm} alt="국토교통부 이미지" />
        <ImageWrapper src={fUseLandIm} alt="토지이음 이미지" />
        <ImageWrapper src={fArchiveIm} alt="국가기록관리위원회 이미지" />
        <ImageWrapper src={fDataIm} alt="공공데이터 이미지" />
      </Box>
    </>
  );
};
