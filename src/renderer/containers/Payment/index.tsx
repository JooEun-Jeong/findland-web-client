import React, { useState, useEffect, useCallback } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { landOwnerAtom, productCountAtomFamily } from '@states/user';

import { PayButton, PayResultBox, PayResultRootBox } from './styled';
import { ResultColumn, ResultRow } from './TableInterface';
import { LandRowData } from '@interfaces';

export const PaymentResult: React.FC = () => {
  const [cNameCount, setCNameCount] = useRecoilState(productCountAtomFamily('cNameCount'));
  const [jibunCount, setJibunCount] = useRecoilState(productCountAtomFamily('jibunCount'));
  const [areaCount, setAreaCount] = useRecoilState(productCountAtomFamily('areaCount'));
  const [addrCount, setAddrCount] = useRecoilState(productCountAtomFamily('addrCount'));
  const [cost, setCost] = useState<number>(0);

  const [landOwners, setLandOwners] = useRecoilState<LandRowData>(landOwnerAtom);

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
    setCost(
      selectedProductNumbers[1].addressCount * addrCount +
        selectedProductNumbers[1].areaCount * areaCount +
        selectedProductNumbers[1].chineseCharacterCount * cNameCount +
        selectedProductNumbers[1].jibunCount * jibunCount,
    );
  }, [addrCount, areaCount, cNameCount, jibunCount, setCost]);

  const handlePayment = useCallback(() => {
    setLandOwners(
      landOwners.map((landowner) => {
        return {
          ...landowner,
          isPaid: landowner.isSelected,
        };
      }),
    );
    setCNameCount(0);
    setJibunCount(0);
    setAreaCount(0);
    setAddrCount(0);
  }, [landOwners, setAddrCount, setAreaCount, setCNameCount, setJibunCount, setLandOwners]);

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
                {cost}
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
