import React, { useCallback, useEffect, useMemo, useRef, useState, RefObject } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Box, Checkbox } from '@mui/material';
import { DataGrid, GridSearchIcon } from '@mui/x-data-grid';
import _ from 'lodash';

import { MapServiceModal } from '@/renderer/containers/MyPage';
import { UseMypageApi } from '@apis/hooks/useMypageApi';
import { UsePaymentApi } from '@apis/hooks/userPaymentApi';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { SearchButton, SearchTextField } from '@components';
import { HeaderM, Loading } from '@containers';
import { LotRowDatum, ProductTransferReq } from '@interfaces';
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
import { lotsPaidAtom, productCountAtomFamily } from '@states/user';
import { downloadCSV } from '@utils';

import { FileDownloadButton, FileDownloadTypo, FindServiceButton } from './styled';

export const MyPage = () => {
  const [keyword, setKeyword] = useState('');
  const isMobile = useRecoilValue(isMobileAtom);
  const [paidLots, setPaidLots] = useRecoilState(lotsPaidAtom);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [lotCount, setLotCount] = useRecoilState(productCountAtomFamily('lotCount'));
  const [serviceIds, setServiceIds] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [rootCheckBox, setRootCheckBox] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [checkBoxes, setCheckBoxes] = useState<Array<checkboxProps>>(
    paidLots.map((item) => {
      return {
        id: item.id,
        checkBoxState: false,
      };
    }),
  );

  const mypageApi = UseMypageApi();
  const size = 50;
  const dataGridRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const handleOnRowsScrollEnd = useCallback(async () => {
    if (mypageApi) {
      if (isSearchClicked) {
        // 만약 한번이라도 클릭되었다면, 해당 키워드로 무한 스크롤 준비
        const lots = await mypageApi.getOneLandownerWithName(page + 1, size, keyword);
        setPaidLots(lots);
      } else {
        // 전체 결제 내역 보여주기
        const lots = await mypageApi.getAllPaidLots(page + 1, size);
        setPaidLots(lots);
      }
      setPage((prev) => prev + 1);
    }
  }, [isSearchClicked, keyword, mypageApi, page, setPaidLots]);

  const getAllPaidLots = useCallback(async () => {
    if (mypageApi) {
      const lots = await mypageApi.getAllPaidLots(page, size);
      setPaidLots(lots);
    }
  }, [mypageApi, page, setPaidLots]);

  const getOneLandowner = useCallback(async () => {
    if (mypageApi) {
      setIsLoading(true);
      setPage(0);
      setIsSearchClicked(true);
      const lots = await mypageApi.getOneLandownerWithName(0, size, keyword);
      setPaidLots(lots);
      setIsLoading(false);
    }
  }, [keyword, mypageApi, setPaidLots]);

  const handleDownloadClick = useCallback(() => {
    const selectedProductIds = _.map(checkBoxes, (checkBox) => (checkBox.checkBoxState === true ? checkBox.id : false));
    console.log('selectedProductIds', selectedProductIds);
    const data = _.filter(paidLots, (item) => _.includes(selectedProductIds, item.id));
    console.log(data);
    const fileName = '필지';
    downloadCSV({ data, fileName });
  }, [checkBoxes, paidLots]);

  useEffect(() => {
    getAllPaidLots();
  }, []);

  const getRowId = useCallback((data: LotRowDatum) => data.id, []);
  const handleOpen = useCallback(() => {
    setIsOpenModal(true);
    const selectedProductIds = _.map(checkBoxes, (checkBox) => (checkBox.checkBoxState === true ? checkBox.id : false));
    const data = _.filter(paidLots, (item) => _.includes(selectedProductIds, item.id));
    const selectedProductMapIds = _.compact(data.map((item) => item.mapAnalysisProductId));
    setServiceIds(selectedProductMapIds);
  }, [checkBoxes, paidLots]);
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

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;
      const { scrollTop, clientHeight, scrollHeight } = target;
      if (scrollHeight - scrollTop === clientHeight) {
        handleOnRowsScrollEnd();
      }
    };

    const dataGridNode = dataGridRef.current;
    if (dataGridNode) {
      dataGridNode.addEventListener('scroll', handleScroll);
      return () => {
        dataGridNode.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleOnRowsScrollEnd]);

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
    return isLoading ? (
      <div style={{ height: '60vh', width: '100%', overflow: 'auto', padding: '2px' }}>
        <Loading />
      </div>
    ) : (
      <div ref={dataGridRef} style={{ height: '60vh', width: '100%', overflow: 'auto', padding: '2px' }}>
        <DataGrid
          columns={SearchResultColmns({
            rootCheckBox,
            setRootCheckBox,
            checkBoxes,
            setCheckBoxes,
            lots: paidLots,
            setLots: setPaidLots,
            setLotCount,
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
          disableRowSelectionOnClick
          pageSizeOptions={[50]}
          sx={{
            backgroundColor: '#f7f7f7',
            borderRadius: '5px',
            '& .MuiDataGrid-row': {
              overflow: 'scroll',
              '&.Mui-selected': {
                backgroundColor: '#f6cc8d49',
              },
            },
            '& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell': {
              overflowX: 'scroll',
            },
          }}
        />
      </div>
    );
  }, [NoRowRender, checkBoxes, getRowId, isLoading, isMobile, paidLots, rootCheckBox, setLotCount, setPaidLots]);

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
                onClick={getOneLandowner}
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
      {isOpenModal && (
        <MapServiceModal
          open={isOpenModal}
          handleClose={handleClose}
          selectedLotCount={_.filter(checkBoxes, (checkbox) => checkbox.checkBoxState).length}
          selectedLotMapIds={serviceIds}
          checkBoxes={checkBoxes}
        />
      )}
    </>
  ) : (
    <></>
  );
};
