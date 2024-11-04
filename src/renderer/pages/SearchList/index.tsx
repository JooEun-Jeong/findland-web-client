import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Box, Checkbox } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import _ from 'lodash';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FooterContacts } from '@/renderer/containers/Footer/Contacts';
import { UsePaymentApi } from '@apis/hooks/userPaymentApi';
import { UseSearchApi } from '@apis/hooks/useSearchApi';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { Alert, ErrorFallback, SearchButton, SearchIcon, SearchTextField } from '@components';
import { HeaderM, Loading, PaymentResult, PaymentResultMobile } from '@containers';
import { LotRowData, ProductTransferReq } from '@interfaces';
import { isMobileAtom } from '@states';
import { lotsAtom } from '@states/user';

import {
  MainBox,
  PaymentBox,
  SearchBox,
  SearchBarWrapper,
  SearchBarWrapperMobile,
  TableWrapperMobile,
  GrayBox,
  TableHeaderBox,
  TableHeaderColumnBox,
  MobileContentWrapper,
  NoRenderBox,
  HeaderWrapperM,
  NoRenderTitleTypo,
  NoRenderContentTypo,
  DataGridStyled,
} from './styled';
import { SearchResultColmns, checkboxProps } from './Table';

export interface countProps {
  idx: number;
  compute: string; // plus, minus
}

export const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchApi = UseSearchApi();
  const paymentApi = UsePaymentApi();

  const { name } = useParams();
  const size = 20;
  const directName = _.isUndefined(name) && (location.state.keyword as string);

  const fetchedParamsSet = useRef(new Set<string>()); // Set to track fetched parameters
  const gridApiRef = useGridApiRef();

  const isMobile = useRecoilValue(isMobileAtom);
  const [lots, setLots] = useRecoilState<LotRowData>(lotsAtom);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string[]>([]);
  const [alertHeader, setAlertHeader] = useState<string>('');
  const [keyword, setKeyword] = useState(name || directName || '');
  const [lotCount, setLotCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [rootCheckBox, setRootCheckBox] = useState<boolean>(false);
  const [checkBoxes, setCheckBoxes] = useState<Array<checkboxProps>>(
    lots.map((item) => {
      return {
        id: item.id,
        checkBoxState: item.isSelected,
        purchaseStatus: item.purchaseStatus,
      };
    }),
  );
  const [page, setPage] = useState<number>(0);

  const handleScroll = useCallback(
    async (event: Event) => {
      const target = event.target as HTMLElement;
      const { scrollTop, clientHeight, scrollHeight } = target;

      if (scrollHeight - scrollTop <= clientHeight && lots.length < totalAmount) {
        const paramsKey = `${keyword}_${page + 1}_${size}`;
        if (fetchedParamsSet.current.has(paramsKey)) {
          return;
        }

        setIsMore(true);
        if (!isMore && searchApi) {
          const searchResult = await searchApi.getLandOwners(keyword, page + 1, size);
          if (searchResult.totalElement === -1) {
            setIsAlertOpen(true);
            setAlertMessage([
              '데이터를 가져오는 중 문제가 발생했습니다.',
              '새로 고침을 하고 다시 시도해보시거나',
              '아래 문의 플랫폼을 통해 연락 부탁드립니다.',
            ]);
            setAlertHeader('데이터 가져오기 실패');
          }
          const landOwners: LotRowData = searchResult.landOwners;

          fetchedParamsSet.current.add(paramsKey); // Add to fetched params set

          if (landOwners.length === size) {
            setPage((prev) => prev + 1);
          }
          if (landOwners.length > 0) {
            setLots((prev) => [...prev, ...landOwners]);
            setLotCount(0);
          }
          setIsMore(false);
        }
      }
    },
    [isMore, searchApi, keyword, page, lots.length, totalAmount, setLots],
  );

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

  useEffect(() => {
    const fetchData = async () => {
      if (directName === false) {
        await getResult();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newCheckBoxState = lots.map((item) => {
      return {
        id: item.id,
        checkBoxState: item.isSelected,
        purchaseStatus: item.purchaseStatus,
      };
    }) as Array<checkboxProps>;
    setCheckBoxes(newCheckBoxState);

    const newRootCheckBoxState = newCheckBoxState.every((data) => {
      return data.checkBoxState === true;
    });
    setRootCheckBox(newRootCheckBoxState);
  }, [lots]);

  // 개별 항목이 전체 체크되어있다면 루트 체크됨
  useEffect(() => {
    if (_.every(checkBoxes, (data: checkboxProps) => data.checkBoxState)) {
      setRootCheckBox(true);
    } else {
      setRootCheckBox(false);
    }
  }, [checkBoxes]);

  // 전체 체크 박스 클릭했을 때 개별 체크박스 설정
  useEffect(() => {
    if (rootCheckBox) {
      setCheckBoxes(
        checkBoxes.map((item) => ({
          id: item.id,
          checkBoxState: true,
          purchaseStatus: item.purchaseStatus,
        })),
      );
    } else if (!rootCheckBox && _.every(checkBoxes, (data: checkboxProps) => data.checkBoxState)) {
      setCheckBoxes(
        checkBoxes.map((item) => ({
          id: item.id,
          checkBoxState: false,
          purchaseStatus: item.purchaseStatus,
        })),
      );
    }
  }, [rootCheckBox]);

  const getResult = useCallback(async () => {
    if (searchApi) {
      setIsLoading(true);
      const searchResult = await searchApi.getLandOwners(keyword, page, size);
      if (searchResult.totalElement === -1) {
        setIsAlertOpen(true);
        setAlertMessage([
          '데이터를 가져오는 중 문제가 발생했습니다.',
          '새로 고침을 하고 다시 시도해보시거나',
          '아래 문의 플랫폼을 통해 연락 부탁드립니다.',
        ]);
        setAlertHeader('데이터 가져오기 실패');
      }
      fetchedParamsSet.current.clear();
      const landOwners: LotRowData = searchResult.landOwners;
      const totalAmount: number = searchResult.totalElement;
      setTotalAmount(totalAmount);
      setLots(landOwners);
      setIsLoading(false);
    } else {
      setLots([]);
    }
  }, [keyword, page, searchApi, setLots]);

  const handlePayment = useCallback(
    async (bankAccountName: string) => {
      if (paymentApi) {
        try {
          const productIds = checkBoxes
            .filter((checkBox) => checkBox.checkBoxState && checkBox.purchaseStatus === 'NOT_PURCHASED')
            .map((checkbox) => checkbox.id);

          const postData: ProductTransferReq = {
            productIds,
            bankAccountName,
          };
          await paymentApi.postProductTransfer(postData);
          alert(`${lotCount}건의 필지 열람 서비스가 신청되었습니다.`);
          // row 다시 세팅
          window.location.reload();
        } catch (e) {
          setIsAlertOpen(true);
          setAlertMessage([
            '필지 열람을 신청하는 중 문제가 발생했습니다.',
            '새로 고침을 하고 다시 시도해보시거나',
            '아래 문의 플랫폼을 통해 연락 부탁드립니다.',
          ]);
          setAlertHeader('필지 열람 신청 실패');
        }
      }

      setLotCount(0);
    },
    [checkBoxes, lotCount, paymentApi],
  );

  const NoRowRender = useCallback(
    () => (
      <NoRenderBox sx={{ flexDirection: 'column' }}>
        <NoRenderTitleTypo sx={{ marginBottom: '5%' }}>검색된 결과가 없습니다.</NoRenderTitleTypo>
        <NoRenderTitleTypo>1. 한자 성함이 여러 발음일 수 있습니다.</NoRenderTitleTypo>
        <NoRenderContentTypo sx={{ marginBottom: '5%' }}>{`예시) 灐 = 박진형 = 박진영`}</NoRenderContentTypo>
        <NoRenderTitleTypo>2. 친가 외가 모두 검색해 보셨나요?</NoRenderTitleTypo>
        <NoRenderContentTypo>{`1910년대에 살아계셨던 친척들을 확인해보세요`}</NoRenderContentTypo>
      </NoRenderBox>
    ),
    [],
  );

  const GridRender = useMemo(
    () =>
      isLoading ? (
        <div style={{ height: 'calc(var(--vh, 1vh) * 45)', width: '100%', overflow: 'auto', padding: '2px' }}>
          <Loading />
        </div>
      ) : (
        <div style={{ height: 'calc(var(--vh, 1vh) * 45)', width: '100%', overflow: 'auto', padding: '2px' }}>
          <DataGridStyled
            apiRef={gridApiRef}
            columns={SearchResultColmns({
              rootCheckBox,
              setRootCheckBox,
              checkBoxes,
              setCheckBoxes,
              lots,
              setLots,
              setLotCount,
              isMypage: false,
            })}
            rows={lots}
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
            onCellClick={(cell, event) => {
              if (cell.field === 'checkbox') {
                event.stopPropagation();
              }
            }}
            hideFooter
            sx={{
              boxShadow: 3,
            }}
            disableColumnMenu
            disableRowSelectionOnClick
            pageSizeOptions={[30]}
          />
        </div>
      ),
    [NoRowRender, checkBoxes, isLoading, isMobile, lots, rootCheckBox, setLots],
  );

  return isMobile ? (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MobileContentWrapper>
        <Box sx={{ padding: '5% 3% 0 3%' }}>
          <Alert
            isOpen={isAlertOpen}
            setIsOpen={setIsAlertOpen}
            message={{
              header: alertHeader,
              contents: alertMessage,
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
              <SearchButton
                type="submit"
                onClick={async () => {
                  const data = await getResult();
                  navigate(`/search/${keyword}`, { state: { keyword, data } });
                }}
                className="mobile"
                sx={{ marginLeft: '10px' }}
              >
                <SearchIcon />
              </SearchButton>
            </SearchBox>
          </SearchBarWrapperMobile>
        </Box>
        <TableWrapperMobile>
          <TableHeaderBox>
            <GrayBox />
            <TableHeaderColumnBox width="52%" backgroundColor="#FFC900">
              토지 정보
            </TableHeaderColumnBox>
            <TableHeaderColumnBox width="38%" backgroundColor="#ffeeca">
              소유자 정보
            </TableHeaderColumnBox>
          </TableHeaderBox>
          <Box>{GridRender}</Box>
        </TableWrapperMobile>
        <Box sx={{ padding: '3%' }}>
          <PaymentResultMobile lotCount={lotCount} handlePayment={handlePayment} setLotCount={setLotCount} />
          <FooterContacts />
        </Box>
        <HeaderWrapperM>
          <HeaderM />
        </HeaderWrapperM>
      </MobileContentWrapper>
    </ErrorBoundary>
  ) : (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MainBox>
        <SearchBarWrapper>
          <SearchBox>
            <SearchTextField
              sx={{ width: '400px' }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
              defaultValue={keyword}
            />
            <SearchButton
              type="submit"
              onClick={async () => {
                const data = await getResult();
                navigate(`/search/${keyword}`, { state: { keyword, data } });
              }}
              sx={{ marginLeft: '10px' }}
            >
              <SearchIcon sx={{ color: 'rgb(255, 140, 68)' }} />
            </SearchButton>
          </SearchBox>
        </SearchBarWrapper>
        <Box sx={{ marginTop: '20px', display: 'flex' }}>
          {GridRender}
          <PaymentBox className="shadow">
            <PaymentResult />
          </PaymentBox>
        </Box>
      </MainBox>
    </ErrorBoundary>
  );
};
