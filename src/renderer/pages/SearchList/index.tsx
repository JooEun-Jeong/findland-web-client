import React, { useCallback, useMemo, useState, useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Checkbox, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import _ from 'lodash';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { UseSearchApi } from '@apis/hooks/useSearchApi';
import logoImg from '@assets/png/logoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { ErrorFallback, SearchButton, SearchTextField } from '@components';
import { HeaderM, PaymentResult, PaymentResultMobile } from '@containers';
import { LotRowData, LotRowDatum } from '@interfaces';
import { isMobileAtom } from '@states';
import { lotsAtom } from '@states/user';
import { isUnpaid } from '@utils';

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
  AccountBox,
  HeaderWrapperM,
  NoRenderTitleTypo,
  NoRenderContentTypo,
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

  const { name } = useParams();

  const directName = _.isUndefined(name) && (location.state.keyword as string);
  console.log('name!!!!', name || directName || '정재형');

  const [keyword, setKeyword] = useState(name || directName || '정재형');

  useEffect(() => {
    const fetchData = async () => {
      if (directName === false) {
        await getResult();
      }
    };
    fetchData();
  }, []);

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
      const landOwners: LotRowData = await searchApi.getLandOwners(keyword);
      console.log('this is landOwners', landOwners);
      setLots(landOwners);
    } else {
      setLots([]);
    }
  }, [keyword, searchApi, setLots]);

  const getRowId = useCallback((data: LotRowDatum) => data.id, []);

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
    return (
      <DataGrid
        columns={SearchResultColmns({
          rootCheckBox,
          setRootCheckBox,
          checkBoxes,
          setCheckBoxes,
          lots,
          setLots,
          isMypage: false,
        })}
        rows={lots}
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
        onCellClick={(cell, event) => {
          if (cell.field === 'checkbox') {
            event.stopPropagation();
          }
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
  }, [NoRowRender, checkBoxes, getRowId, isMobile, lots, rootCheckBox, setLots]);

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
                <SearchIcon sx={{ color: 'rgb(255, 140, 68)', height: '5vh', width: '5vw' }} />
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
        <Box sx={{ padding: '3%' }}>
          <PaymentResultMobile />
          <AccountBox>
            <Typography sx={{ fontWeight: 700, fontSize: '1.5rem' }}>계좌번호</Typography>
            <Typography sx={{ fontSize: '1.5rem' }}>우리 1005804492395 다시드림</Typography>
          </AccountBox>
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
