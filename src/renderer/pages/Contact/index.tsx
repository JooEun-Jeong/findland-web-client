import React, { useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import { Box, Typography } from '@mui/material';

import { FooterContacts } from '@/renderer/containers/Footer/Contacts';
import { Terms } from '@/renderer/containers/Footer/Terms';
import { DesAccordion } from '@/renderer/containers/MainContent/DesAccordion';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { QAs } from '@constants';
import { HeaderM } from '@containers';
import { HeaderWrapperM, MobileContentWrapper } from '@pages/SearchList/styled';
import { isMobileAtom } from '@states';

export const Contact = () => {
  const isMobile = useRecoilValue(isMobileAtom);

  const FAQ = useMemo(() => {
    return (
      <Box sx={{ height: '100%' }}>
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            paddingTop: '10px',
          }}
        >
          예상 질문과 답변
        </Typography>
        <Box sx={{ overflowY: 'scroll', height: '100%' }}>
          {QAs.map((qa, i) => (
            <Box sx={{ marginTop: '20px' }} key={`BoxDes-${i}`}>
              <DesAccordion mainTitle={qa.mainTitle} cons={qa.cons} key={`Des-${i}`} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }, []);

  return isMobile ? (
    <MobileContentWrapper sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ padding: '5% 3% 0 3%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} width="12%" style={{ marginRight: '20px' }} />
          <img src={logoTypoImg} width="15%" />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ margin: '15px 0', fontSize: '1rem', fontWeight: 700 }}>문의 창구</Typography>
          <FooterContacts />
        </Box>
        <Box sx={{ height: 'calc(var(--vh, 1vh) * 47)' }}>{FAQ}</Box>
      </Box>
      <HeaderWrapperM>
        <Terms />
        <HeaderM />
      </HeaderWrapperM>
    </MobileContentWrapper>
  ) : (
    <></>
  );
};
