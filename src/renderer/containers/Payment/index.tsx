import React, { useState, useEffect, useCallback } from 'react';

import { useRecoilState } from 'recoil';

import { Box, Typography } from '@mui/material';

import { LotRowData } from '@interfaces';
import { lotsAtom, productCountAtomFamily } from '@states/user';

import { PaymentInpuptModal } from './PaymentInputModal';
import {
  ComputeBoxM,
  CountBoxM,
  PayButton,
  PayButtonM,
  PayResultBox,
  PayResultRootBox,
  TotalComputeBoxM,
  TotalPriceBoxM,
  PriceTypoM,
  PaymentDataGrid,
} from './styled';
import { ProductSelectedColmns, ResultRow } from './TableInterface';

export const PaymentResult: React.FC = () => {
  const [cNameCount, setCNameCount] = useRecoilState(productCountAtomFamily('lotCount'));
  const [jibunCount, setJibunCount] = useRecoilState(productCountAtomFamily('jibunCount'));
  const [areaCount, setAreaCount] = useRecoilState(productCountAtomFamily('areaCount'));
  const [addrCount, setAddrCount] = useRecoilState(productCountAtomFamily('addrCount'));
  const [totalCost, setTotalCost] = useState<number>(0);

  const [lotRows, setLotRows] = useRecoilState<LotRowData>(lotsAtom);

  const [selectedProductNumbers, setSelectedProductNumbers] = useState<ResultRow[]>([
    { id: 1, count: '개수', addressCount: 0, areaCount: 0, chineseCharacterCount: 0, jibunCount: 0 },
    { id: 2, count: '가격', addressCount: 2000, areaCount: 7000, chineseCharacterCount: 1000, jibunCount: 20000 },
  ]);

  useEffect(() => {
    setSelectedProductNumbers([
      {
        ...selectedProductNumbers[0],
        areaCount: areaCount,
        chineseCharacterCount: cNameCount,
        jibunCount: jibunCount,
        addressCount: addrCount,
      },
      { id: 2, count: '가격', addressCount: 2000, areaCount: 7000, chineseCharacterCount: 1000, jibunCount: 20000 },
    ]);
    setTotalCost(
      selectedProductNumbers[1].addressCount * addrCount +
        selectedProductNumbers[1].areaCount * areaCount +
        selectedProductNumbers[1].chineseCharacterCount * cNameCount +
        selectedProductNumbers[1].jibunCount * jibunCount,
    );
  }, [addrCount, areaCount, cNameCount, jibunCount, setTotalCost]);

  const handlePayment = useCallback(() => {
    setLotRows(
      lotRows.map((lot) => {
        return {
          ...lot,
          isPaid: lot.isSelected,
        };
      }),
    );
    setCNameCount(0);
    setJibunCount(0);
    setAreaCount(0);
    setAddrCount(0);
  }, [lotRows, setAddrCount, setAreaCount, setCNameCount, setJibunCount, setLotRows]);

  return (
    <>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ width: '100%', padding: '10px' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '16px' }}>선택한 상품</Typography>
        </Box>
        <Box sx={{ padding: '5px' }}>
          <PaymentDataGrid
            rows={selectedProductNumbers}
            columns={ProductSelectedColmns}
            hideFooter
            disableColumnMenu
            disableColumnFilter
            disableRowSelectionOnClick
          />
        </Box>

        <PayResultRootBox>
          <PayResultBox>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: 13,
              }}
            >
              총액
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  marginRight: '5px',
                }}
              >
                {totalCost}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: 13,
                }}
              >
                원
              </Typography>
            </Box>
          </PayResultBox>
          <Box sx={{ width: '80px', height: '40px', marginRight: '10px' }}>
            <PayButton onClick={handlePayment}>결제</PayButton>
          </Box>
        </PayResultRootBox>
        {/* <Box sx={{ marginTop: '20px', height: '40px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <PayButton onClick={handlePayment} sx={{ width: '70%' }}>
            <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>결제하기</Typography>
          </PayButton>
        </Box> */}
      </Box>
    </>
  );
};

interface PayResultProps {
  handlePayment: (bankAccountName: string) => void;
  lotCount: number;
}

export const PaymentResultMobile: React.FC<PayResultProps> = ({ handlePayment, lotCount }) => {
  const [totalCost, setTotalCost] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const price = 20000;

  useEffect(() => {
    setTotalCost(lotCount * price);
  }, [lotCount, setTotalCost]);

  return (
    <>
      <PaymentInpuptModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        lotCount={lotCount}
        price={price}
        handlePayment={handlePayment}
      />
      <Box sx={{ width: '100%' }}>
        <ComputeBoxM>
          <CountBoxM>
            <PriceTypoM>개수</PriceTypoM>
            <PriceTypoM sx={{ color: 'green' }}>{lotCount}</PriceTypoM>
          </CountBoxM>
          <CountBoxM>
            <PriceTypoM>금액</PriceTypoM>
            <PriceTypoM sx={{ color: 'green' }}>{price}</PriceTypoM>
          </CountBoxM>
        </ComputeBoxM>

        <TotalComputeBoxM>
          <TotalPriceBoxM>
            <PriceTypoM>총액</PriceTypoM>
            <Box sx={{ display: 'flex' }}>
              <PriceTypoM
                sx={{
                  marginRight: '5px',
                }}
              >
                {totalCost}
              </PriceTypoM>
              <PriceTypoM>원</PriceTypoM>
            </Box>
          </TotalPriceBoxM>
          <Box sx={{ width: '25%', height: '100%' }}>
            <PayButtonM onClick={() => setIsModalOpen(true)}>결제하기</PayButtonM>
          </Box>
        </TotalComputeBoxM>
      </Box>
    </>
  );
};
