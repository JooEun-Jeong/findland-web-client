import React, { useState, useEffect, useCallback } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { LotRowData } from '@interfaces';
import { lotsAtom, productCountAtomFamily } from '@states/user';

import { PayButton, PayResultBox, PayResultRootBox } from './styled';
import { ResultColumn, ResultRow } from './TableInterface';

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
          <DataGrid
            rows={selectedProductNumbers}
            columns={ResultColumn}
            hideFooter
            disableColumnMenu
            disableColumnFilter
            disableRowSelectionOnClick
            sx={{
              width: '100%',
              height: 'auto',
              overflowX: 'hidden',
              overflowY: 'hidden',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#F4F4F6',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                fontSize: 13,
              },
              '& .title': {
                backgroundColor: '#F4F4F6',
                fontWeight: 'bold',
                fontSize: 13,
                border: '1px solid rgba(224, 224, 224, 1)',
              },
            }}
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

export const PaymentResultMobile: React.FC = () => {
  const [lotCount, setLotCount] = useRecoilState(productCountAtomFamily('lotCount'));
  const [totalCost, setTotalCost] = useState<number>(0);
  const price = 20000;

  const [lotRows, setLotRows] = useRecoilState<LotRowData>(lotsAtom);

  useEffect(() => {
    setTotalCost(lotCount * price);
  }, [lotCount, setTotalCost]);

  const handlePayment = useCallback(() => {
    // api 필요

    // 로딩 화면 필요

    // row 다시 세팅
    setLotRows(
      lotRows.map((lot) => {
        return {
          ...lot,
          // isPaid: lot.isSelected,
        };
      }),
    );
    setLotCount(0);
  }, [lotRows, setLotCount, setLotRows]);

  return (
    <>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '3% 3% 3% 3%',
            border: '1px solid #B1B2B5',
            alignItems: 'center',
            marginBottom: '2%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '45%',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>개수</Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'green' }}>{lotCount}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '45%',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>금액</Typography>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'green' }}>{price}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            // marginTop: '20px',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#F4F4F6',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '3% 3%',
              border: '1px solid #EEE',
              width: '70%',
              height: '100%',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              총액
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  marginRight: '5px',
                }}
              >
                {totalCost}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                }}
              >
                원
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: '25%', height: '100%' }}>
            <Button
              sx={{
                backgroundColor: '#ffbd59',
                color: '#000',
                borderRadius: '5px',
                height: '5vh',
                width: '100%',
                padding: '3%',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgb(235, 127, 56)',
                },
              }}
              onClick={handlePayment}
            >
              결제하기
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
