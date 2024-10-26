import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Box, Checkbox } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import _ from 'lodash';

import { MapServiceModal } from '@/renderer/containers/MyPage';
import { UseMypageApi } from '@apis/hooks/useMypageApi';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { Alert, SearchButton, SearchIcon, SearchTextField } from '@components';
import { HeaderM, Loading } from '@containers';
import {
  DataGridStyled,
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
  const isMobile = useRecoilValue(isMobileAtom);

  const mypageApi = UseMypageApi();
  const size = 500;
  const dataGridRef = useGridApiRef();
  const fetchedParamsSet = useRef(new Set<string>()); // Set to track fetched parameters

  const [paidLots, setPaidLots] = useRecoilState(lotsPaidAtom);

  const [keyword, setKeyword] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [lotCount, setLotCount] = useState<number>(0);
  const [serviceIds, setServiceIds] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [rootCheckBox, setRootCheckBox] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isMore, setIsMore] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [checkBoxes, setCheckBoxes] = useState<Array<checkboxProps>>(
    paidLots.map((item) => {
      return {
        id: item.id,
        checkBoxState: false,
        purchaseStatus: item?.mapAnalysisPurchaseStatus || 'NOT_PURCHASED',
      };
    }),
  );

  const handleScroll = useCallback(
    async (event: Event) => {
      const target = event.target as HTMLElement;
      const { scrollTop, clientHeight, scrollHeight } = target;

      if (scrollHeight - scrollTop <= clientHeight) {
        const paramsKey = `${keyword}_${page + 1}_${size}`;
        if (fetchedParamsSet.current.has(paramsKey)) {
          return;
        }

        setIsMore(true);
        if (!isMore && mypageApi) {
          // 만약 한번이라도 클릭되었다면, 해당 키워드로 무한 스크롤 준비
          // 아니라면 전체 결제 내역 보여주기

          const landOwnersInfo = isSearchClicked
            ? await mypageApi.getOneLandownerWithName(page + 1, size, keyword)
            : await mypageApi.getAllPaidLots(page + 1, size);
          // console.log('!!!!!!! ', isSearchClicked);
          if (landOwnersInfo.totalElement === -1) {
            setIsAlertOpen(true);
          }
          const newLandOwners = landOwnersInfo.landOwners;

          fetchedParamsSet.current.add(paramsKey); // Add to fetched params set

          if (newLandOwners.length === size) {
            setPage((prev) => prev + 1);
          }
          if (newLandOwners.length > 0) {
            setPaidLots((prev) => [...prev, ...newLandOwners]);
            setLotCount(0);
          }
          setIsMore(false);
        }
      }
    },
    [keyword, page, isMore, mypageApi, isSearchClicked, setPaidLots],
  );

  useEffect(() => {
    console.log('paidLots', paidLots);
  }, [paidLots]);

  const getAllPaidLots = useCallback(async () => {
    if (mypageApi) {
      const landOwnersInfo = await mypageApi.getAllPaidLots(page, size);
      if (landOwnersInfo.totalElement === -1) {
        setIsAlertOpen(true);
      }
      const landOwners = landOwnersInfo.landOwners;
      const newTotalElementAmount = landOwnersInfo.totalElement;
      setTotalAmount(newTotalElementAmount);
      setPaidLots(landOwners);
    }
  }, [mypageApi, page, setPaidLots]);

  const getOneLandowner = useCallback(async () => {
    if (mypageApi) {
      setIsLoading(true);
      setPage(0);
      setIsSearchClicked(true);
      fetchedParamsSet.current.clear();
      const landOwnersInfo = await mypageApi.getOneLandownerWithName(0, size, keyword);
      if (landOwnersInfo.totalElement === -1) {
        setIsAlertOpen(true);
      }
      const newLandOwners = landOwnersInfo.landOwners;
      const newTotalElementAmount = landOwnersInfo.totalElement;
      setTotalAmount(newTotalElementAmount);
      setPaidLots(newLandOwners);
      setIsLoading(false);
    }
  }, [keyword, mypageApi, setPaidLots]);

  const isCheckBoxNoneSelected = useCallback(
    () => _.every(checkBoxes, (checkBox) => checkBox.checkBoxState === false),
    [checkBoxes],
  );

  const handleDownloadClick = useCallback(() => {
    // 체크박스 아무것도 선택하지 않았을 경우는 전체 출력, 혹은  일부 선택했을 경우 일부만 출력
    // format in csv
    const selectedProductIds = _.map(checkBoxes, (checkBox) => (checkBox.checkBoxState === true ? checkBox.id : false));
    const isNoneSelected = _.every(checkBoxes, (checkBox) => checkBox.checkBoxState === false);
    console.log('selectedProductIds', selectedProductIds);
    const data = isNoneSelected ? paidLots : _.filter(paidLots, (item) => _.includes(selectedProductIds, item.id));
    const fileName = '필지';
    downloadCSV({ data, fileName });
  }, [checkBoxes, paidLots]);

  useEffect(() => {
    getAllPaidLots();
  }, []);

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
        purchaseStatus: item?.mapAnalysisPurchaseStatus || 'NOT_PURCHASED',
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
            purchaseStatus: item.purchaseStatus,
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
        checkBoxes.map((item) => {
          return {
            id: item.id,
            checkBoxState: false,
            purchaseStatus: item.purchaseStatus,
          };
        }),
      );
    }
  }, [rootCheckBox]);

  useEffect(() => {
    // Delay attaching the event listener to ensure the DataGrid is rendered
    const timeoutId = setTimeout(() => {
      const gridContainer = document.querySelector('.MuiDataGrid-virtualScroller');
      if (gridContainer) {
        console.log('Attaching scroll event listener');
        gridContainer.addEventListener('scroll', handleScroll);
        return () => {
          console.log('Removing scroll event listener');
          gridContainer.removeEventListener('scroll', handleScroll);
        };
      } else {
        console.log('Grid container not found');
      }
    }, 1500); // Adjust the timeout delay as needed

    return () => clearTimeout(timeoutId);
  }, [handleScroll]);

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
      <div style={{ height: 'calc(var(--vh, 1vh) * 57)', width: '100%', overflow: 'auto', padding: '2px' }}>
        <Loading />
      </div>
    ) : (
      <div style={{ height: 'calc(var(--vh, 1vh) * 57)', width: '100%', overflow: 'auto', padding: '2px' }}>
        <DataGridStyled
          apiRef={dataGridRef}
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
          rowHeight={isMobile ? 25 : 30}
          columnHeaderHeight={30}
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
          // getRowId={getRowId}
          disableColumnMenu
          disableRowSelectionOnClick
          pageSizeOptions={[50]}
        />
      </div>
    );
  }, [NoRowRender, checkBoxes, dataGridRef, isLoading, isMobile, paidLots, rootCheckBox, setPaidLots]);

  return isMobile ? (
    <>
      <MobileContentWrapper>
        <Box sx={{ padding: '5% 3% 0 3%' }}>
          <Alert
            isOpen={isAlertOpen}
            setIsOpen={setIsAlertOpen}
            message={{
              header: '데이터 가져오기 실패',
              contents: [
                '데이터를 가져오는 중 문제가 발생했습니다.',
                '새로 고침을 하고 다시 시도해보시거나',
                '아래 문의 플랫폼을 통해 연락 부탁드립니다.',
              ],
            }}
            afterAction={() => setIsAlertOpen(false)}
            afterActionName="닫기"
          />
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
              <Box sx={{ fontSize: '0.7rem', width: '60px', display: 'flex', justifyContent: 'flex-end' }}>
                총 {totalAmount} 필지
              </Box>
              <SearchButton type="submit" onClick={getOneLandowner} className="mobile">
                <SearchIcon />
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
        <Box sx={{ padding: '3%', height: '10%', display: 'flex', justifyContent: 'space-between' }}>
          <FindServiceButton onClick={handleOpen} disabled={isCheckBoxNoneSelected()}>
            토지 현재 위치 확인하기
          </FindServiceButton>
          <FileDownloadButton disabled={paidLots.length === 0} onClick={handleDownloadClick}>
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
          setLotCount={setLotCount}
          handleClose={handleClose}
          selectedLotCount={lotCount}
          selectedLotMapIds={serviceIds}
          checkBoxes={checkBoxes}
        />
      )}
    </>
  ) : (
    <></>
  );
};
