import React, { useCallback, useMemo, useState, useEffect } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Checkbox } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import _ from 'lodash';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { UseSearchApi } from '@apis/hooks/useSearchApi';
import logoImg from '@assets/png/logoImg.png';
import logoTypoImg from '@assets/png/logoTypo.png';
import { CheckedIcon, SearchButton, SearchTextField, UnCheckedIcon } from '@components';
import { HeaderM, PaymentResult, PaymentResultMobile } from '@containers';
import { LotRowData, LotRowDatum, Lot, Lots, ResponseLandData } from '@interfaces';
import { isMobileAtom } from '@states';
import { lotsAtom } from '@states/user';
import { doesNullExist, makeLandowenersRow } from '@utils';

import { MainBox, PaymentBox, SearchBox, SearchBarWrapper } from './styled';
import { ResultColumn, checkboxProps } from './Table';

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
  const [keyword, setKeyword] = useState(name || '정재형');

  const [lots, setLots] = useRecoilState<LotRowData>(lotsAtom);

  const [text, setText] = useState('');

  // const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  // selectionModel:: number[]. shows only selected one.
  // const handleSelectionModelChange = useCallback(
  //   (selectionModel: any) => {
  //     console.log('selectionModel', selectionModel);
  //     console.log('selectedRowIds', selectedRowIds);
  //     const findRow = _.find(selectedRowIds, (id) => id === selectionModel[0]);

  //     findRow
  //       ? setSelectedRowIds(selectedRowIds.filter((id) => id === selectionModel[0]))
  //       : setSelectedRowIds([...selectedRowIds, ...selectionModel]);
  //   },
  //   [selectedRowIds],
  // );

  const [rootCheckBox, setRootCheckBox] = useState<boolean>(false);
  const [checkBoxes, setCheckBoxes] = useState<Array<checkboxProps>>(
    lots.map((item) => {
      return {
        id: item.id,
        checkBoxState: !doesNullExist(item) ? true : false,
      };
    }),
  );

  useEffect(() => {
    const newCheckBoxState = lots.map((item) => {
      return {
        id: item.id,
        checkBoxState: !doesNullExist(item) ? true : false,
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
      searchApi.getLandOwners(keyword);
    } else {
      setLots([]);
    }
  }, [keyword, searchApi, setLots]);

  const getRowId = (data: LotRowDatum) => data.id;

  const NoRowRender = useCallback(() => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '14px',
          width: '100%',
          height: '100%',
        }}
      >
        No Results
      </Box>
    );
  }, []);

  const GridRender = useMemo(() => {
    return (
      <DataGrid
        columns={ResultColumn({
          rootCheckBox,
          setRootCheckBox,
          checkBoxes,
          setCheckBoxes,
          lots,
          setLots,
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
        // rowSelectionModel={selectedRowIds}
        // onRowSelectionModelChange={handleSelectionModelChange}
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
  }, [NoRowRender, checkBoxes, lots, rootCheckBox, setLots]);

  return isMobile ? (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '78vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ padding: '5% 3% 0 3%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoImg} width="12%" style={{ marginRight: '20px' }} />
            <img src={logoTypoImg} width="15%" />
          </Box>
          <Box sx={{ display: 'flex', marginTop: '5%', width: '100%' }}>
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
          </Box>
        </Box>
        <Box
          sx={{
            // marginTop: '20px',
            display: 'flex',
            // justifyContent: 'flex-start',
            // alignItems: 'center',
            flexDirection: 'column',
            height: '75%',
            width: '100%',
            '& .MuiDataGrid-columnHeaders': {
              height: 'auto',
              backgroundColor: '#fff',
              border: 'none',
              borderBottom: '1px solid #B1B2B5',
              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: '1.4rem',
              },
            },
            '& .MuiDataGrid-virtualScrollerRenderZone': {
              fontSize: '1.5rem',
              backgroundColor: '#fff',
            },
            '& .MuiDataGrid-virtualScrollerContent': {
              backgroundColor: '#fff',
              borderBottom: '1px solid #B1B2B5',
            },
            marginTop: '3%',
          }}
        >
          <Box sx={{ width: '100%', height: '7%', display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
                width: '10%',
                display: 'flex',
                backgroundColor: '#F4F4F4',

                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            ></Box>
            <Box
              sx={{
                width: '52%',
                display: 'flex',
                backgroundColor: '#FFC900',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              토지 정보
            </Box>
            <Box
              sx={{
                width: '38%',
                backgroundColor: '#ffeeca',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              소유자 정보
            </Box>
          </Box>
          {GridRender}
        </Box>
      </Box>
      <Box sx={{ padding: '3% 3% 0 3%' }}>
        <PaymentResultMobile />
      </Box>
      <Box sx={{ position: 'sticky', marginTop: '2%', borderTop: '1px solid #BBB' }}>
        <HeaderM />
      </Box>
    </>
  ) : (
    <>
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
    </>
  );
};
