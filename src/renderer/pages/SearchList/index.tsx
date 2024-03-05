import React, { useCallback, useMemo, useState, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Checkbox } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import _ from 'lodash';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { UseSearchApi } from '@apis/hooks/useSearchApi';
import { CheckedIcon, SearchButton, SearchTextField, UnCheckedIcon } from '@components';
import { PaymentResult } from '@containers';
import { LandRowData, LandRowDatum, ResponseLandData } from '@interfaces';
import { keywordAtom } from '@states';
import { landOwnerAtom, productCountAtomFamily } from '@states/user';
import { makeLandowenersRow } from '@utils';

import { MainBox, PaymentBox, SearchBox, SearchBarWrapper } from './styled';
import { ResultColumn, checkboxProps } from './Table';

export interface countProps {
  idx: number;
  compute: string; // plus, minus
}

export const Search: React.FC = () => {
  // const [keyword, setKeyword] = useRecoilState(keywordAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const searchApi = UseSearchApi();

  const { name } = useParams();
  // const [keyword, setKeyword] = useState(location.state.keyword || '정재형');
  const [keyword, setKeyword] = useState(name || '정재형');
  const [data, setData] = useState<ResponseLandData>(location.state.data || []);

  const [landOwners, setLandOwners] = useRecoilState<LandRowData>(landOwnerAtom);

  // only once
  useEffect(() => {
    const newLandOwners = makeLandowenersRow(data);
    setLandOwners(newLandOwners);
  }, []);

  const [text, setText] = useState('');
  const [cNameCount, setCNameCount] = useRecoilState(productCountAtomFamily('cNameCount'));
  const [jibunCount, setJibunCount] = useRecoilState(productCountAtomFamily('jibunCount'));
  const [areaCount, setAreaCount] = useRecoilState(productCountAtomFamily('areaCount'));
  const [addrCount, setAddrCount] = useRecoilState(productCountAtomFamily('addrCount'));

  const countProducts = useCallback(
    ({ idx, compute }: countProps) => {
      if (idx === 0) {
        // cname
        compute === 'plus' ? setCNameCount((prev) => prev + 1) : setCNameCount((prev) => prev - 1);
      } else if (idx === 1) {
        // jibun
        compute === 'plus' ? setJibunCount((prev) => prev + 1) : setJibunCount((prev) => prev - 1);
      } else if (idx === 2) {
        // jibun
        compute === 'plus' ? setAreaCount((prev) => prev + 1) : setAreaCount((prev) => prev - 1);
      } else if (idx === 3) {
        // jibun
        compute === 'plus' ? setAddrCount((prev) => prev + 1) : setAddrCount((prev) => prev - 1);
      } else if (idx === 4) {
        // jibun
        if (compute === 'plus') {
          setCNameCount((prev) => prev + 1);
          setJibunCount((prev) => prev + 1);
          setAreaCount((prev) => prev + 1);
          setAddrCount((prev) => prev + 1);
        } else {
          setCNameCount((prev) => prev - 1);
          setJibunCount((prev) => prev - 1);
          setAreaCount((prev) => prev - 1);
          setAddrCount((prev) => prev - 1);
        }
      }
    },
    [setAddrCount, setAreaCount, setCNameCount, setJibunCount],
  );

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
    data.map((item) => {
      return {
        id: item.id,
        checkBoxState: false,
      };
    }),
  );

  useEffect(() => {
    const newCheckBoxState = data.map((item) => {
      return {
        id: item.id,
        checkBoxState: false,
        // checkBoxState: item.isSelected,
      };
    }) as Array<checkboxProps>;
    setCheckBoxes(newCheckBoxState);

    const newRootCheckBoxState = newCheckBoxState.every((data) => {
      return data.checkBoxState === true;
    });
    setRootCheckBox(newRootCheckBoxState);
  }, [data]);

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
      const newData: LandRowData = await searchApi.getLandOwners(keyword);
      setLandOwners(newData);
    } else {
      setLandOwners([]);
    }
  }, [keyword, setLandOwners]);

  const getRowId = (data: LandRowDatum) => data.id;

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
          landowners: landOwners,
          setLandowners: setLandOwners,
          countProducts: countProducts,
        })}
        rows={landOwners}
        rowHeight={30}
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
  }, [NoRowRender, checkBoxes, countProducts, landOwners, rootCheckBox, setLandOwners]);

  return (
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
