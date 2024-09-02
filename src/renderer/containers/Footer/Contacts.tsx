import React from 'react';

import { Instagram as InstaIcon, YouTube as YoutubeIcon, Email as EmailIcon } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import ArchieveIconPath from '@assets/png/fArchieveLogo.png';

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
        <CopyToClipboard
          text="dasidreamgo@gmail.com"
          onCopy={() => alert('이메일(dasidreamgo@gmail.com)을 복사했습니다.')}
        >
          <IconWrapper>
            <EmailIcon sx={{ width: '25%', height: '20%' }} />
            이메일
          </IconWrapper>
        </CopyToClipboard>
        <IconWrapper onClick={() => window.open('https://www.archives.go.kr/next/viewMainNew.do', '_blank')}>
          <img src={ArchieveIconPath} style={{ width: '27%', height: '25%' }} />
          국가기록원
        </IconWrapper>
      </BottomBox>
    </>
  );
};
