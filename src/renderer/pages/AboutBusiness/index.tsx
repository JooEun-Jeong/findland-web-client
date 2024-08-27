import React, { useMemo, useState } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Modal, Typography } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

import { FooterContacts } from '@/renderer/containers/Footer/Contacts';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { ErrorFallback } from '@components';
import { PersonalInfoUseTerm, ServiceUseTerm } from '@constants';
import { HeaderM } from '@containers';
import { HeaderWrapperM, MobileContentWrapper } from '@pages/SearchList/styled';

import { ModalWrapper, TermTitleTypo, TitleTypo, TitleTypoWrapper, Typo08rem, TypoWrapper } from './styled';

export const AboutBusinessPage = () => {
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isServiceUseTermOpen, setIsServiceUseTermOpen] = useState(false);
  const ServiceUseTermComponent = useMemo(
    () => (
      <Modal open={isServiceUseTermOpen} onClose={() => setIsServiceUseTermOpen(false)}>
        <ModalWrapper>
          <TitleTypoWrapper>
            <TermTitleTypo>땅찾GO 서비스 이용약관</TermTitleTypo>
            <CloseIcon onClick={() => setIsServiceUseTermOpen(false)} />
          </TitleTypoWrapper>
          <Typography>
            <pre style={{ fontSize: '0.7rem', fontWeight: 400, fontFamily: 'inherit', textWrap: 'inherit' }}>
              {ServiceUseTerm}
            </pre>
          </Typography>
        </ModalWrapper>
      </Modal>
    ),
    [isServiceUseTermOpen],
  );
  const PersonalInfoComponent = useMemo(
    () => (
      <Modal open={isPersonalInfoOpen} onClose={() => setIsPersonalInfoOpen(false)}>
        <ModalWrapper>
          <TitleTypoWrapper>
            <TermTitleTypo>땅찾GO 개인정보 처리방침</TermTitleTypo>
            <CloseIcon onClick={() => setIsPersonalInfoOpen(false)} />
          </TitleTypoWrapper>
          <Typography>
            <pre style={{ fontSize: '0.7rem', fontWeight: 400, fontFamily: 'inherit', textWrap: 'inherit' }}>
              {PersonalInfoUseTerm}
            </pre>
          </Typography>
        </ModalWrapper>
      </Modal>
    ),
    [isPersonalInfoOpen],
  );
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
              <Typo08rem>토지전문가 그룹(변호사 법무사 행정사 공인중개사 등)이</Typo08rem>
              <Typo08rem>직접 조상땅을 찾으며 체득한 노하우로</Typo08rem>
              <Typo08rem>우리 가문의 땅을 찾아드립니다</Typo08rem>
              <Typo08rem>숨겨진 내 땅을 찾아 다시 꿈꾸는 그날까지,</Typo08rem>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>땅찾GO x 다시드림</Typography>
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
              {ServiceUseTermComponent}
              {PersonalInfoComponent}
              <Typography sx={{ margin: '15px 0', fontSize: '1rem', fontWeight: 700 }}>
                개인 정보 및 관련 약관
              </Typography>
              <Box sx={{ marginLeft: '10px' }}>
                <Typo08rem
                  sx={{
                    border: '1px solid #bababa',
                    padding: '10px',
                    backgroundColor: '#fff1b4',
                    '& .hover': { backgroundColor: '#f5d95b' },
                  }}
                  onClick={() => setIsPersonalInfoOpen(true)}
                >
                  땅찾GO 개인정보 처리방침 (자세히 보기)
                </Typo08rem>
              </Box>
              <Box sx={{ marginLeft: '10px', marginTop: '10px' }}>
                <Typo08rem
                  sx={{
                    border: '1px solid #bababa',
                    padding: '10px',
                    backgroundColor: '#fff1b4',
                    '& .hover': { backgroundColor: '#f5d95b' },
                  }}
                  onClick={() => setIsServiceUseTermOpen(true)}
                >
                  땅찾GO 서비스 이용약관 (자세히 보기)
                </Typo08rem>
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
