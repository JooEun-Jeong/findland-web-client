import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Box, Checkbox } from '@mui/material';
import { DataGrid, GridSearchIcon } from '@mui/x-data-grid';
import _ from 'lodash';

import { MapServiceModal } from '@/renderer/containers/MyPage';
import { UseMypageApi } from '@apis/hooks/useMypageApi';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { SearchButton, SearchTextField } from '@components';
import { HeaderM } from '@containers';
import { LotRowDatum } from '@interfaces';
import {
  GrayBox,
  HeaderWrapperM,
  MobileContentWrapper,
  NoRenderBox,
  NoRenderContentTypo,
  NoRenderTitleTypo,
  SearchBarWrapperMobile,
  SearchBox,
  TableHeaderBox,
  TableHeaderColumnBox,
  TableWrapperMobile,
} from '@pages/SearchList/styled';
import { SearchResultColmns, checkboxProps } from '@pages/SearchList/Table';
import { isMobileAtom } from '@states';
import { lotsPaidAtom } from '@states/user';
import { downloadCSV } from '@utils';

import { FileDownloadButton, FileDownloadTypo, FindServiceButton } from './styled';

export const MyPage = () => {
  const [keyword, setKeyword] = useState('');
  const isMobile = useRecoilValue(isMobileAtom);
  const [paidLots, setPaidLots] = useRecoilState(lotsPaidAtom);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const mypageApi = UseMypageApi();

  const getPaidLots = useCallback(async () => {
    if (mypageApi) {
      const lots = await mypageApi.getPaidLots(0, 10);
      setPaidLots(lots);
    }
  }, [mypageApi, setPaidLots]);

  const [rootCheckBox, setRootCheckBox] = useState<boolean>(false);
  const [checkBoxes, setCheckBoxes] = useState<Array<checkboxProps>>(
    paidLots.map((item) => {
      return {
        id: item.id,
        checkBoxState: false,
      };
    }),
  );
  const getRowId = useCallback((data: LotRowDatum) => data.id, []);
  const handleOpen = useCallback(() => setIsOpenModal(true), []);
  const handleClose = useCallback(() => setIsOpenModal(false), []);

  useEffect(() => {
    const newCheckBoxState = paidLots.map((item) => {
      return {
        id: item.id,
        checkBoxState: false,
      };
    }) as Array<checkboxProps>;
    setCheckBoxes(newCheckBoxState);

    const newRootCheckBoxState = newCheckBoxState.every((data) => {
      return data.checkBoxState === true;
    });
    setRootCheckBox(newRootCheckBoxState);
  }, [paidLots]);

  // 개별 항목이 전체 체크되어있다면 루트 체크됨
  useEffect(() => {
    if (
      _.every(checkBoxes, (data: checkboxProps) => {
        return data.checkBoxState === true;
      })
    ) {
      setRootCheckBox(true);
    } else {
      setRootCheckBox(false);
    }
  }, [checkBoxes]);

  // 전체 체크 박스 클릭했을 때 개별 체크박스 설정
  useEffect(() => {
    if (rootCheckBox) {
      setCheckBoxes(
        checkBoxes.map((item) => {
          return {
            id: item.id,
            checkBoxState: true,
          };
        }),
      );
    } else if (
      !rootCheckBox &&
      _.every(checkBoxes, (data: checkboxProps) => {
        return data.checkBoxState === true;
      })
    ) {
      setCheckBoxes(
        checkBoxes.map((device) => {
          return {
            id: device.id,
            checkBoxState: false,
          };
        }),
      );
    }
  }, [rootCheckBox]);

  const NoRowRender = useCallback(() => {
    return (
      <NoRenderBox sx={{ flexDirection: 'column' }}>
        <NoRenderTitleTypo sx={{ marginBottom: '5%' }}>구매하신 내역 중 일치하는 결과가 없습니다.</NoRenderTitleTypo>
        <NoRenderTitleTypo>1. 한자 성함이 여러 발음일 수 있습니다.</NoRenderTitleTypo>
        <NoRenderContentTypo sx={{ marginBottom: '5%' }}>{`예시) 灐 = 박진형 = 박진영`}</NoRenderContentTypo>
        <NoRenderTitleTypo>2. 친가 외가 모두 검색해 보셨나요?</NoRenderTitleTypo>
        <NoRenderContentTypo>{`1910년대에 살아계셨던 친척들을 확인해보세요`}</NoRenderContentTypo>
      </NoRenderBox>
    );
  }, []);

  const GridRender = useMemo(() => {
    return (
      <DataGrid
        columns={SearchResultColmns({
          rootCheckBox,
          setRootCheckBox,
          checkBoxes,
          setCheckBoxes,
          lots: paidLots,
          setLots: setPaidLots,
          isMypage: true,
        })}
        rows={paidLots}
        rowHeight={isMobile ? 50 : 30}
        slots={{
          noRowsOverlay: NoRowRender,
          baseCheckbox: () => (
            <Checkbox
              sx={{
                color: '#ffbd59',
                '&.Mui-checked': {
                  color: '#ffbd59',
                },
              }}
            />
          ),
        }}
        hideFooter
        getRowId={getRowId}
        disableColumnMenu
        pageSizeOptions={[30]}
        sx={{
          backgroundColor: '#f7f7f7',
          borderRadius: '5px',
          '& .MuiDataGrid-row': {
            '&.Mui-selected': {
              backgroundColor: '#f6cc8d49',
            },
          },
        }}
      />
    );
  }, [NoRowRender, checkBoxes, getRowId, isMobile, paidLots, rootCheckBox, setPaidLots]);

  useEffect(() => {
    getPaidLots();
  }, []);

  const handleDownloadClick = useCallback(() => {
    const data = {};
    const fileName = '필지';
    downloadCSV({ data, fileName });
  }, []);

  return isMobile ? (
    <>
      <MobileContentWrapper>
        <Box sx={{ padding: '5% 3% 0 3%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoImg} width="12%" style={{ marginRight: '20px' }} />
            <img src={logoTypoImg} width="15%" />
          </Box>
          <SearchBarWrapperMobile>
            <SearchBox>
              <SearchTextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
                defaultValue={keyword}
              />
              <SearchButton
                type="submit"
                onClick={getPaidLots}
                className="mobile"
                sx={{
                  marginLeft: '10px',
                }}
              >
                <GridSearchIcon sx={{ color: 'rgb(255, 140, 68)', height: '5vh', width: '5vw' }} />
              </SearchButton>
            </SearchBox>
          </SearchBarWrapperMobile>
        </Box>
        <TableWrapperMobile>
          <TableHeaderBox>
            <GrayBox />
            <TableHeaderColumnBox width={'52%'} backgroundColor="#FFC900">
              토지 정보
            </TableHeaderColumnBox>
            <TableHeaderColumnBox width={'38%'} backgroundColor="#ffeeca">
              소유자 정보
            </TableHeaderColumnBox>
          </TableHeaderBox>
          {GridRender}
        </TableWrapperMobile>
        <Box sx={{ padding: '3%', height: '10vh', display: 'flex', justifyContent: 'space-between' }}>
          <FindServiceButton onClick={handleOpen}>토지 현재 위치 확인하기</FindServiceButton>
          <FileDownloadButton onClick={handleDownloadClick}>
            <FileDownloadTypo>결제한 토지 정보</FileDownloadTypo>
            <FileDownloadTypo>다운로드</FileDownloadTypo>
          </FileDownloadButton>
        </Box>
        <HeaderWrapperM>
          <HeaderM />
        </HeaderWrapperM>
      </MobileContentWrapper>
      {isOpenModal && <MapServiceModal open={isOpenModal} handleClose={handleClose} />}
    </>
  ) : (
    <></>
  );
};
