import React, { useCallback, useMemo, useState, useEffect, useRef, RefObject } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Box, Checkbox } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import _ from 'lodash';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FooterContacts } from '@/renderer/containers/Footer/Contacts';
import { UsePaymentApi } from '@apis/hooks/userPaymentApi';
import { UseSearchApi } from '@apis/hooks/useSearchApi';
import logoImg from '@assets/png/LogoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { ErrorFallback, SearchButton, SearchIcon, SearchTextField } from '@components';
import { HeaderM, Loading, PaymentResult, PaymentResultMobile } from '@containers';
import { LotRowData, LotRowDatum, ProductTransferReq } from '@interfaces';
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
  const isMobile = useRecoilValue(isMobileAtom);

  const location = useLocation();
  const navigate = useNavigate();
  const searchApi = UseSearchApi();
  const paymentApi = UsePaymentApi();

  const { name } = useParams();

  const directName = _.isUndefined(name) && (location.state.keyword as string);

  const [keyword, setKeyword] = useState(name || directName || '정재형');
  const [lotCount, setLotCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [lots, setLots] = useRecoilState<LotRowData>(lotsAtom);

  const [rootCheckBox, setRootCheckBox] = useState<boolean>(false);
  const [checkBoxes, setCheckBoxes] = useState<Array<checkboxProps>>(
    lots.map((item) => {
      return {
        id: item.id,
        checkBoxState: item.isSelected,
      };
    }),
  );

  const [page, setPage] = useState<number>(0);
  const size = 50;

  const dataGridRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const handleOnRowsScrollEnd = useCallback(async () => {
    if (searchApi) {
      const landOwners: LotRowData = await searchApi.getLandOwners(keyword, page + 1, size);
      console.log('handle On row scroll end', landOwners);
      setLots((prev) => [...prev, ...landOwners]);
      setPage((prev) => prev + 1);
    }
  }, [keyword, page, searchApi, setLots]);

  useEffect(() => {
    const fetchData = async () => {
      if (directName === false) {
        await getResult();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;
      const { scrollTop, clientHeight, scrollHeight } = target;
      console.log('Scroll Event:', { scrollTop, clientHeight, scrollHeight });
      if (scrollHeight - scrollTop === clientHeight) {
        console.log('Reached bottom of the grid');
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

  useEffect(() => {
    const newCheckBoxState = lots.map((item) => {
      return {
        id: item.id,
        checkBoxState: item.isSelected,
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

  const getResult = useCallback(async () => {
    if (searchApi) {
      setIsLoading(true);
      const landOwners: LotRowData = await searchApi.getLandOwners(keyword, page, size);
      console.log('this is landOwners', landOwners);
      setLots(landOwners);
      setIsLoading(false);
    } else {
      setLots([]);
    }
  }, [keyword, page, searchApi, setLots]);

  const getRowId = useCallback((data: LotRowDatum) => data.id, []);

  const handlePayment = useCallback(
    (bankAccountName: string) => {
      // api 필요
      if (paymentApi) {
        const productIds = checkBoxes
          .filter((checkBox) => checkBox.checkBoxState)
          .map((checkbox) => checkbox.id) as string[];

        const postData: ProductTransferReq = {
          productIds: productIds,
          bankAccountName: bankAccountName,
        };
        paymentApi.postProductTransfer(postData);
        // 로딩 화면 필요

        // // row 다시 세팅
        window.location.reload();
      }

      setLotCount(0);
    },
    [checkBoxes, paymentApi, setLotCount],
  );

  const NoRowRender = useCallback(() => {
    return (
      <NoRenderBox sx={{ flexDirection: 'column' }}>
        <NoRenderTitleTypo sx={{ marginBottom: '5%' }}>검색된 결과가 없습니다.</NoRenderTitleTypo>
        <NoRenderTitleTypo>1. 한자 성함이 여러 발음일 수 있습니다.</NoRenderTitleTypo>
        <NoRenderContentTypo sx={{ marginBottom: '5%' }}>{`예시) 灐 = 박진형 = 박진영`}</NoRenderContentTypo>
        <NoRenderTitleTypo>2. 친가 외가 모두 검색해 보셨나요?</NoRenderTitleTypo>
        <NoRenderContentTypo>{`1910년대에 살아계셨던 친척들을 확인해보세요`}</NoRenderContentTypo>
      </NoRenderBox>
    );
  }, []);

  const GridRender = useMemo(() => {
    return isLoading ? (
      <div style={{ height: 'calc(var(--vh, 1vh) * 45)', width: '100%', overflow: 'auto', padding: '2px' }}>
        <Loading />
      </div>
    ) : (
      <div
        ref={dataGridRef}
        style={{ height: 'calc(var(--vh, 1vh) * 45)', width: '100%', overflow: 'auto', padding: '2px' }}
      >
        <DataGridStyled
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
          // getRowId={getRowId}
          sx={{
            boxShadow: 3,
          }}
          disableColumnMenu
          disableRowSelectionOnClick
          pageSizeOptions={[30]}
        />
      </div>
    );
  }, [NoRowRender, checkBoxes, isLoading, isMobile, lots, rootCheckBox, setLots]);

  return isMobile ? (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                onClick={async () => {
                  const data = await getResult();
                  navigate(`/search/${keyword}`, { state: { keyword: keyword, data: data } });
                }}
                className="mobile"
                sx={{
                  marginLeft: '10px',
                }}
              >
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
          <Box>{GridRender}</Box>
        </TableWrapperMobile>
        <Box sx={{ padding: '3%' }}>
          <PaymentResultMobile lotCount={lotCount} handlePayment={handlePayment} />
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
                navigate(`/search/${keyword}`, { state: { keyword: keyword, data: data } });
              }}
              sx={{
                marginLeft: '10px',
              }}
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
