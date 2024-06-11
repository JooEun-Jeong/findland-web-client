import React from 'react';

import { Instagram as InstaIcon, YouTube as YoutubeIcon, Send as SendIcon } from '@mui/icons-material';

import { BottomBox, IconWrapper } from './styled';

export const FooterContacts = () => {
  return (
    <>
      <BottomBox>
        <IconWrapper
          onClick={() =>
            window.open(
              'https://www.instagram.com/dasidream_go?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
              '_blank',
            )
          }
        >
          <InstaIcon sx={{ width: '25%', height: '20%' }} />
          인스타그램
        </IconWrapper>
        <IconWrapper onClick={() => window.open('https://youtu.be/xNL3vIlL0cY?si=E4xhwbmaazA8E7Gr', '_blank')}>
          <YoutubeIcon sx={{ width: '25%', height: '20%' }} />
          유튜브
        </IconWrapper>
        <IconWrapper onClick={() => window.open('https://kras.go.kr/mainView.do', '_blank')}>
          <SendIcon sx={{ width: '20%', height: '20%' }} />
          일사편리
        </IconWrapper>
      </BottomBox>
    </>
  );
};
