import React, { useMemo, useState } from 'react';

import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { YellowButton } from '@components';

import {
  BankAccountBox,
  BankDesBox,
  BankTypo,
  CancelButton,
  ComputeBoxM,
  CountBoxM,
  ModalBackgroundBox,
  ModalContentBox,
  ModalDesBox,
  ModalTitleBox,
  PriceTypoM,
} from './styled';

export const PaymentInpuptModal = (props: {
  open: boolean;
  handleClose: () => void;
  lotCount: number;
  price: number;
  handlePayment: (bankAccountName: string) => void;
}) => {
  const [estimatedDay, setEstimatedDay] = useState(1);
  const [bankAccountName, setBankAccountName] = useState('');
  const [isWrittenColor, setIsWrittenColor] = useState('1px solid #B1B2B5');

  const Description = useMemo(
    () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <ComputeBoxM sx={{ border: 'none', borderBottom: '1px solid #B1B2B5' }}>
          <CountBoxM>
            <PriceTypoM>개수</PriceTypoM>
            <PriceTypoM sx={{ color: 'green' }}>{props.lotCount}</PriceTypoM>
          </CountBoxM>
          <CountBoxM>
            <PriceTypoM>금액</PriceTypoM>
            <PriceTypoM sx={{ color: 'green' }}>{props.price.toLocaleString()}원</PriceTypoM>
          </CountBoxM>
        </ComputeBoxM>
        <ComputeBoxM sx={{ border: 'none', padding: '2% 3%' }}>
          <CountBoxM>
            <PriceTypoM>총액</PriceTypoM>
            <Box sx={{ display: 'flex' }}>
              <PriceTypoM
                sx={{
                  marginRight: '5px',
                }}
              >
                {(props.price * props.lotCount).toLocaleString()}
              </PriceTypoM>
              <PriceTypoM>원</PriceTypoM>
            </Box>
          </CountBoxM>
          <CountBoxM>
            <PriceTypoM>처리 예상 시간</PriceTypoM>
            <Box sx={{ display: 'flex' }}>
              <PriceTypoM
                sx={{
                  marginRight: '5px',
                }}
              >
                {estimatedDay}
              </PriceTypoM>
              <PriceTypoM>일 소요</PriceTypoM>
            </Box>
          </CountBoxM>
        </ComputeBoxM>
      </Box>
    ),
    [estimatedDay, props.lotCount, props.price],
  );
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <ModalBackgroundBox
          sx={{
            p: 4,
            boxShadow: 24,
          }}
        >
          <ModalContentBox>
            <ModalTitleBox>
              <Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>결제 정보 입력하기</Typography>
            </ModalTitleBox>

            <ModalDesBox>{Description}</ModalDesBox>
            <Box sx={{ margin: '2% 0' }} />
            <Typography sx={{ fontSize: '0.7rem' }}>
              위에 작성된 내용이 맞는지 확인해주시고, 계좌에 입금할 분의 이름을 작성해주세요. 그 후, 아래 계좌에 입금
              부탁드립니다.
            </Typography>
            <BankAccountBox>
              입금자 성함:
              <TextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBankAccountName(e.target.value)}
                sx={{
                  border: isWrittenColor,
                  width: '80%',
                  '& > input': {
                    padding: '2px',
                  },
                  '& .MuiInputBase-input': {
                    padding: '6px',
                    fontSize: '0.7rem',
                  },
                }}
              />
            </BankAccountBox>
            <BankDesBox>
              <Typography sx={{ fontWeight: 700, fontSize: '0.7rem' }}>계좌번호</Typography>
              <CopyToClipboard text="우리은행 1005804492395" onCopy={() => alert('계좌번호를 복사했습니다.')}>
                <BankTypo>
                  <CopyIcon sx={{ marginRight: '20px', width: '5%', height: '5%' }} />
                  우리 1005804492395 다시드림
                </BankTypo>
              </CopyToClipboard>
            </BankDesBox>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '2%' }}>
              <CancelButton sx={{ borderRadius: 5 }} onClick={props.handleClose}>
                취소하기
              </CancelButton>
              <YellowButton
                sx={{ borderRadius: 5 }}
                onClick={() => {
                  if (bankAccountName.length > 0) {
                    props.handlePayment(bankAccountName);
                    props.handleClose();
                  } else {
                    setIsWrittenColor('2px solid #dd5515');
                  }
                }}
              >
                서비스 신청
              </YellowButton>
            </Box>
          </ModalContentBox>
        </ModalBackgroundBox>
      </Modal>
    </>
  );
};
