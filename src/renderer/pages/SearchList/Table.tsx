import React from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon, CheckBox } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import _ from 'lodash';

import { LotRowData, LotRowDatum } from '@interfaces';
import { productCountAtomFamily } from '@states/user';
import { doesNullExist } from '@utils';

export type checkboxProps = {
  id: number;
  checkBoxState: boolean;
};

interface ColumnProps {
  rootCheckBox: boolean;
  setRootCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  checkBoxes: checkboxProps[];
  setCheckBoxes: React.Dispatch<React.SetStateAction<checkboxProps[]>>;
  lots: LotRowData;
  setLots: React.Dispatch<React.SetStateAction<LotRowData>>;
}

interface countProps {
  idx: number;
  compute: string; // plus, minus
}

interface computeProps {
  product: string;
  compute: string; // plus, minus
}

// 이중으로 하면 hook이 된다..??!!!
function countProducts({ idx, compute }: countProps) {
  () => {
    const setCNameCount = useSetRecoilState(productCountAtomFamily('cNameCount'));
    const setJibunCount = useSetRecoilState(productCountAtomFamily('jibunCount'));
    const setAreaCount = useSetRecoilState(productCountAtomFamily('areaCount'));
    const setAddrCount = useSetRecoilState(productCountAtomFamily('addrCount'));
    if (idx === 0) {
      // cname
      compute === 'plus' ? setCNameCount((prev) => prev + 1) : setCNameCount((prev) => prev - 1);
    } else if (idx === 1) {
      // jibun
      compute === 'plus' ? setJibunCount((prev) => prev + 1) : setJibunCount((prev) => prev - 1);
    } else if (idx === 2) {
      // area
      compute === 'plus' ? setAreaCount((prev) => prev + 1) : setAreaCount((prev) => prev - 1);
    } else if (idx === 3) {
      // addr
      compute === 'plus' ? setAddrCount((prev) => prev + 1) : setAddrCount((prev) => prev - 1);
    } else if (idx === 4) {
      // all
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
  };
}

// 이중으로 하면 hook이 된다..??!!!
function countProduct({ product, compute }: computeProps) {
  () => {
    const [lotCount, setLotCount] = useRecoilState(productCountAtomFamily('lotCount'));
    if (product === 'lot') {
      compute === 'plus'
        ? setLotCount((prev) => prev + 1)
        : compute === 'minus'
          ? setLotCount((prev) => prev - 1)
          : setLotCount((prev) => prev);
    }
  };
}

export const ResultColumn = ({
  rootCheckBox,
  setRootCheckBox,
  checkBoxes,
  setCheckBoxes,
  lots,
  setLots,
}: ColumnProps): GridColDef[] => [
  {
    field: 'checkbox',
    minWidth: 30,
    flex: 0.0972,
    headerName: ' ',
    sortable: false,
    resizable: false,
    align: 'center',
    headerAlign: 'center',
    renderHeader: () => (
      <Checkbox
        disableRipple
        value=" "
        sx={{
          color: '#ffbd59',
          height: '100%',
          '&.Mui-checked': {
            color: '#ffbd59',
          },
          '&.Mui-disabled': {
            color: 'gray',
            '& > svg': {
              height: '1.5em',
              width: '1.5em',
            },
          },
          '& > svg': {
            height: '1.5em',
            width: '1.5em',
          },
        }}
        // icon={<CheckBoxBlankIcon />}
        // checkedIcon={<CheckBoxIcon sx={{ color: '#ffbd59' }} />}
        checked={rootCheckBox}
        onClick={(e) => {
          e.stopPropagation();
          setRootCheckBox(!rootCheckBox);
        }}
      />
    ),
    renderCell: (params: GridRenderCellParams) => {
      const selectedLot = lots.find((lot) => params.id === lot.id) as LotRowDatum;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [lotCount, setLotCount] = useRecoilState(productCountAtomFamily('lotCount'));
      return doesNullExist(selectedLot) ? (
        <Checkbox
          value=" "
          disableRipple
          sx={{
            // height: '100%',
            height: '1.5em',
            width: '1.5em',
            color: '#ffbd59',
            '&.Mui-checked': {
              color: 'rgba(255, 140, 68, 0.598)',
            },
            '& .Mui-disabled': {
              backgroundColor: 'gray',
              '& .MuiSvgIcon-root': {
                height: '1.5em',
                width: '1.5em',
              },
              height: '1.5em',
              width: '1.5em',
            },
            '& .MuiSvgIcon-root': {
              height: '1.5em',
              width: '1.5em',
            },
          }}
          disabled={!doesNullExist(selectedLot)}
          // icon={<CheckBoxBlankIcon />}
          // checkedIcon={<CheckBoxIcon sx={{ color: '#ffbd59' }} />}
          checked={checkBoxes.find((check) => params.id === check.id)?.checkBoxState || false}
          onChange={(e) => {
            e.stopPropagation();
            console.log(checkBoxes);
            checkBoxes.find((check) => params.id === check.id)?.checkBoxState
              ? setLotCount((prev) => prev - 1)
              : setLotCount((prev) => prev + 1);

            // 직접 체크박스 눌렀을 때 변경
            setCheckBoxes(
              checkBoxes.map((data) => {
                return params.id === data.id
                  ? {
                      id: data.id,
                      checkBoxState: !data.checkBoxState,
                    }
                  : data;
              }),
            );
          }}
        />
      ) : (
        <Checkbox
          disabled
          sx={{
            '& > svg': {
              height: '1.5em',
              width: '1.5em',
            },
          }}
        />
      );
    },
  },
  {
    field: 'purchasedGoonDong',
    headerName: '매수 군',
    align: 'left',
    minWidth: 80,
    flex: 0.2778,
  },
  {
    field: 'purchasedJibun',
    headerName: '번지',
    align: 'left',
    minWidth: 40,
    flex: 0.1111,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLot = _.find(lots, (landowner) => landowner.id === id) as LotRowDatum;
      const productNum = 1;
      return typeof selectedLot.purchasedJibun !== 'undefined' ? selectedLot.purchasedJibun || '-' : '-';
    },
  },
  {
    field: 'purchasedArea',
    headerName: '면적',
    align: 'left',
    minWidth: 40,
    flex: 0.1111,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLot = _.find(lots, (landowner) => landowner.id === id) as LotRowDatum;
      const productNum = 2;

      return typeof selectedLot.purchasedArea !== 'undefined' ? selectedLot.purchasedArea || '-' : '-';
    },
  },
  {
    field: 'chineseName',
    headerName: '한자이름',
    align: 'left',
    minWidth: 60,
    flex: 0.1667,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLot = _.find(lots, (landowner) => landowner.id === id) as LotRowDatum;
      const productNum = 0;

      return typeof selectedLot.chineseName !== 'undefined' ? selectedLot.chineseName || '-' : '-';
    },
  },
  {
    field: 'buyerAddress',
    headerName: '거주지',
    align: 'left',
    resizable: false,
    minWidth: 75,
    flex: 0.2083,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLot = _.find(lots, (landowner) => landowner.id === id) as LotRowDatum;
      const productNum = 3;
      return typeof selectedLot.buyerAddress !== 'undefined' ? selectedLot.buyerAddress || '-' : '-';
    },
  },
];
