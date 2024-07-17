import React, { useCallback, useMemo, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { Box, Modal, TextField, Typography } from '@mui/material';
import _ from 'lodash';

import { UseMypageApi } from '@apis/hooks/useMypageApi';
import { UsePaymentApi } from '@apis/hooks/userPaymentApi';
import { ReactComponent as SecondIm } from '@assets/svg/example_integrated.svg';
import { ReactComponent as FirstIm } from '@assets/svg/example_separated.svg';
import { YellowButton } from '@components';
import { ProductTransferReq } from '@interfaces';
import { checkboxProps } from '@pages/SearchList/Table';
import { lotsPaidAtom } from '@states/user';

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
import { CancelButton } from '../Payment/styled';

interface MapModalProps {
  open: boolean;
  handleClose: () => void;
  selectedLotCount: number;
  checkBoxes: checkboxProps[];
}

export const MapServiceModal: React.FC<MapModalProps> = ({ open, handleClose, selectedLotCount, checkBoxes }) => {
  const estimatedDay = 2;
  const cost = 2;
  const [bankAccountName, setBankAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [isWrittenColor, setIsWrittenColor] = useState('1px solid #B1B2B5');
  const paidLots = useRecoilValue(lotsPaidAtom);

  const paymentApi = UsePaymentApi();
  const mypageApi = UseMypageApi();

  const getAllLandIdByMapIdWithNames = useCallback(
    async (names: Array<string>) => {
      if (mypageApi) {
        for (const name of names) {
          const MappedIds = await mypageApi.getAllLandIdbyMapId(0, 50, name);
          const selectedProductIds = _.filter(checkBoxes, (checkbox) => checkbox.checkBoxState).map(
            (checkbox) => checkbox.id,
          );
          console.log('MappedIds', MappedIds);
          const mapAnalysisIds = selectedProductIds.map((productId) => MappedIds.get(productId));
          return _.compact(mapAnalysisIds);
        }
      }
    },
    [checkBoxes, mypageApi],
  );

  const handleServiceClick = useCallback(async () => {
    if (bankAccountName.length > 0) {
      if (paymentApi) {
        // 선택한 필지들의 이름만 파악
        const selectedLandProductIds = _.filter(checkBoxes, (checkbox) => checkbox.checkBoxState).map(
          (checkbox) => checkbox.id,
        );
        console.log('selectedProductIds', selectedLandProductIds);
        const selectedNames = _.filter(paidLots, (item) => _.includes(selectedLandProductIds, item.id)).map(
          (rowDatum) => rowDatum.koreanName,
        );
        const uniqueNames = _.uniq(selectedNames);
        console.log(uniqueNames);

        // 이름들 배열에 담아서 for loop돌며 그만큼 결과값 받아내기
        const selectedMapIds = (await getAllLandIdByMapIdWithNames(uniqueNames)) as Array<string>;
        console.log('result', selectedMapIds);

        // 신청 보내기
        const postData: ProductTransferReq = {
          productIds: selectedMapIds,
          bankAccountName: bankAccountName,
        };

        await paymentApi.postProductTransfer(postData);
        alert(`${selectedLotCount}건의 지도서비스가 신청되었습니다.`);
        handleClose();
      }
    } else {
      setIsWrittenColor('2px solid #dd5515');
    }
  }, [bankAccountName, checkBoxes, getAllLandIdByMapIdWithNames, handleClose, paidLots, paymentApi, selectedLotCount]);

  const Description = useMemo(
    () => (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <MapModalTitleContentWrapper>
          <MapModalContentFirstTypo>토지조사부와 연동된</MapModalContentFirstTypo>
          <MapModalContentFirstTypo>옛지도를 활용해 </MapModalContentFirstTypo>
          <MapModalContentFirstTypo sx={{ display: 'flex', whiteSpace: 'noWrap' }}>
            현재 {<Typography sx={{ fontSize: 'inherit', color: 'red', marginLeft: '5px' }}>예상</Typography>}위치를
            알려드립니다.
          </MapModalContentFirstTypo>
        </MapModalTitleContentWrapper>
      </Box>
    ),
    [],
  );
  return (
    <>
      <Modal open={open} onClose={handleClose}>
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
            <MapModalCContentWrapper>
              <Box sx={{ display: 'flex', borderBottom: '1px solid #B1B2B5', width: '100%', padding: '10px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '50%',
                    borderRight: '1px solid #B1B2B5',
                  }}
                >
                  <Typography sx={{ fontSize: '1.6rem' }}>상품 가격:</Typography>
                  <Typography sx={{ fontSize: '1.6rem', marginRight: '10px' }}>
                    {cost * selectedLotCount}만 원
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '50%',
                    padding: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: '1.6rem' }}>예상 시간:</Typography>
                  <Typography sx={{ fontSize: '1.6rem' }}>
                    {estimatedDay * selectedLotCount * 0.75} ~ {estimatedDay * selectedLotCount}일 소요
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '15px',
                }}
              >
                <Typography sx={{ fontSize: '1.6rem' }}>전달 받을 메일</Typography>
                <TextField
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  sx={{ border: isWrittenColor, width: '75%' }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '15px',
                }}
              >
                <Typography sx={{ fontSize: '1.6rem' }}>입금자명</Typography>
                <TextField
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBankAccountName(e.target.value)}
                  sx={{ border: isWrittenColor, width: '75%' }}
                />
              </Box>
            </MapModalCContentWrapper>
            <MapModalButtonWrapper>
              <CancelButton sx={{ borderRadius: 5 }} onClick={handleClose}>
                취소하기
              </CancelButton>
              <YellowButton sx={{ borderRadius: 5 }} onClick={handleServiceClick}>
                서비스 신청
              </YellowButton>
            </MapModalButtonWrapper>
          </MapModalContentWrapper>
        </MapModalWrapper>
      </Modal>
    </>
  );
};
