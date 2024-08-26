import React from 'react';

import { Box, Typography } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

import { FooterContacts } from '@/renderer/containers/Footer/Contacts';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { ErrorFallback } from '@components';
import { HeaderM } from '@containers';
import { HeaderWrapperM, MobileContentWrapper } from '@pages/SearchList/styled';

import { TitleTypo, Typo08rem, TypoWrapper } from './styled';

export const AboutBusinessPage = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MobileContentWrapper sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ padding: '5% 3% 0 3%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={logoImg} width="12%" style={{ marginRight: '20px' }} />
              <img src={logoTypoImg} width="15%" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TitleTypo>회사 소개</TitleTypo>
            </Box>
            <TypoWrapper>
              <Typo08rem>땅찾GO는 직접 조상땅을 찾게 된</Typo08rem>
              <Typo08rem>경험을 기반으로 시작된 회사입니다</Typo08rem>
              <Typo08rem>직접 조상땅을 찾으며 체득한 노하우로</Typo08rem>
              <Typo08rem>우리 가문의 땅을 찾아드립니다</Typo08rem>
              <Typo08rem>숨겨진 내 땅을 찾아 다시 꿈꾸는 그날까지,</Typo08rem>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>땅찾GO</Typography>
              <FooterContacts />
            </TypoWrapper>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '10px',
              }}
            >
              <Typography sx={{ margin: '15px 0', fontSize: '1rem', fontWeight: 700 }}>
                개인 정보 및 관련 약관
              </Typography>
              <Box sx={{ paddingLeft: '20px' }}>
                <Typo08rem>개인정보 방침</Typo08rem>
              </Box>
            </Box>
          </Box>
          <HeaderWrapperM>
            <HeaderM />
          </HeaderWrapperM>
        </MobileContentWrapper>
      </ErrorBoundary>
    </>
  );
};