import React, { useMemo, useState } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Modal, Typography } from '@mui/material';

import { PersonalInfoUseTerm, ServiceUseTerm } from '@constants';

import { ModalWrapper, TermTitleTypo, TitleTypoWrapper } from './styled';

export const Terms = () => {
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
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5%', width: '100%', alignItems: 'center' }}>
        {ServiceUseTermComponent}
        {PersonalInfoComponent}
        <Box sx={{ display: 'flex' }}>
          <Typography
            onClick={() => setIsPersonalInfoOpen(true)}
            sx={{ fontSize: '0.7rem', textDecoration: 'underline', marginRight: '15px' }}
          >
            개인정보 처리방침
          </Typography>
          <Typography
            onClick={() => setIsServiceUseTermOpen(true)}
            sx={{ fontSize: '0.7rem', textDecoration: 'underline' }}
          >
            서비스 이용약관
          </Typography>
        </Box>
        <Box sx={{ paddingTop: '10px' }}>
          <Typography sx={{ fontSize: '0.6rem' }}>회사명: 다시드림 | 사업자등록번호: 306-06-79955</Typography>
          <Typography sx={{ fontSize: '0.6rem' }}>대표: 박재현 | 문의: dasidreamgo@gmail.com</Typography>
        </Box>
      </Box>
    </>
  );
};
