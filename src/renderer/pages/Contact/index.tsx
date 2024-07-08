import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { Box, Checkbox, Typography } from '@mui/material';

import { FooterContacts } from '@/renderer/containers/Footer/Contacts';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { HeaderM } from '@containers';
import { HeaderWrapperM, MobileContentWrapper } from '@pages/SearchList/styled';
import { isMobileAtom } from '@states';

export const Contact = () => {
  const isMobile = useRecoilValue(isMobileAtom);

  const FAQ = useMemo(() => {
    return <>FAQ section</>;
  }, []);

  return isMobile ? (
    <MobileContentWrapper sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ padding: '5% 3% 0 3%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} width="12%" style={{ marginRight: '20px' }} />
          <img src={logoTypoImg} width="15%" />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h3" sx={{ margin: '15px' }}>
            문의 창구
          </Typography>
          <FooterContacts />
        </Box>
        <Box>{FAQ}</Box>
      </Box>
      <HeaderWrapperM>
        <HeaderM />
      </HeaderWrapperM>
    </MobileContentWrapper>
  ) : (
    <></>
  );
};
