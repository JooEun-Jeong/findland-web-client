import React, { useMemo, useState } from 'react';

import { Box, Modal, Typography } from '@mui/material';

import { ReactComponent as SecondIm } from '@assets/svg/example_integrated.svg';
import { ReactComponent as FirstIm } from '@assets/svg/example_separated.svg';
import { YellowButton } from '@components';

import {
  MapModalTitleContentWrapper,
  MapModalButtonWrapper,
  MapModalContentFirstTypo,
  MapModalContentWrapper,
  MapModalImageWrapper,
  MapModalSecondContentWrapper,
  MapModalTitleTypo,
  MapModalTitleWrapper,
  MapModalWrapper,
  MapModalCContentWrapper,
} from './styled';

export const MapServiceModal = (props: { open: boolean; handleClose: () => void }) => {
  const [estimatedDay, setEstimatedDay] = useState(1);
  const [cost, setCost] = useState(1);

  const Description = useMemo(
    () => (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <MapModalTitleContentWrapper>
          <MapModalContentFirstTypo>토지조사부와 연동된</MapModalContentFirstTypo>
          <MapModalContentFirstTypo>옛지도를 활용해 </MapModalContentFirstTypo>
          <MapModalContentFirstTypo sx={{ display: 'flex', whiteSpace: 'noWrap' }}>
            현재 {<Typography sx={{ fontSize: 'inherit', color: 'red' }}>예상</Typography>}위치를 알려드립니다.
          </MapModalContentFirstTypo>
        </MapModalTitleContentWrapper>
        <MapModalCContentWrapper>
          <Typography sx={{ fontSize: '1.6rem' }}>- 전달 방법: 로그인하신 이메일</Typography>
          <Typography sx={{ fontSize: '1.6rem' }}>- 상품 가격: {cost}만 원</Typography>
          <Typography sx={{ fontSize: '1.6rem' }}>- 예상 시간: {estimatedDay}일 소요</Typography>
        </MapModalCContentWrapper>
      </Box>
    ),
    [cost, estimatedDay],
  );
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <MapModalWrapper sx={{ boxShadow: 24 }}>
          <MapModalContentWrapper>
            <MapModalTitleWrapper>
              <MapModalTitleTypo>토지의</MapModalTitleTypo>
              <MapModalTitleTypo sx={{ marginLeft: '1%', color: '#F00' }}>{' 예상'}</MapModalTitleTypo>
              <MapModalTitleTypo>위치를 알려드립니다.</MapModalTitleTypo>
            </MapModalTitleWrapper>

            <MapModalImageWrapper>
              <FirstIm width="100%" />
              <MapModalSecondContentWrapper>
                <SecondIm width="100%" style={{ marginRight: '5%' }} />
                {Description}
              </MapModalSecondContentWrapper>
            </MapModalImageWrapper>
            <MapModalButtonWrapper>
              <YellowButton onClick={props.handleClose}>서비스 신청</YellowButton>
            </MapModalButtonWrapper>
          </MapModalContentWrapper>
        </MapModalWrapper>
      </Modal>
    </>
  );
};
