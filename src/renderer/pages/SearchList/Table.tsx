import React, { MouseEventHandler } from 'react';

import { Checkbox } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import _ from 'lodash';

import { LotRowData, LotRowDatum } from '@interfaces';
import { isUnpaid } from '@utils';

import { TableEachChecbox, TableRootChecbox } from './styled';

export type checkboxProps = {
  id: string;
  checkBoxState: boolean;
  purchaseStatus: string; // PENDING, NOT_PURCHASED, PURCHASED
};

interface ColumnProps {
  rootCheckBox: boolean;
  setRootCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  checkBoxes: checkboxProps[];
  setCheckBoxes: React.Dispatch<React.SetStateAction<checkboxProps[]>>;
  lots: LotRowData;
  setLots: React.Dispatch<React.SetStateAction<LotRowData>>;
  setLotCount: React.Dispatch<React.SetStateAction<number>>;
  isMypage: boolean;
}

interface countProps {
  idx: number;
  compute: string; // plus, minus
}

// // 이중으로 하면 hook이 된다..??!!!
// function countProduct({ product, compute }: computeProps) {
//   () => {
//     const [lotCount, setLotCount] = useRecoilState(productCountAtomFamily('lotCount'));
//     if (product === 'lot') {
//       compute === 'plus'
//         ? setLotCount((prev) => prev + 1)
//         : compute === 'minus'
//           ? setLotCount((prev) => prev - 1)
//           : setLotCount((prev) => prev);
//     }
//   };
// }

export const SearchResultColmns = ({
  rootCheckBox,
  setRootCheckBox,
  checkBoxes,
  setCheckBoxes,
  lots,
  setLots,
  setLotCount,
  isMypage,
}: ColumnProps): GridColDef[] => [
  {
    field: 'checkbox',
    minWidth: 30,
    flex: 0.0872,
    headerName: ' ',
    sortable: false,
    resizable: false,
    align: 'center',
    headerClassName: 'checkbox-header',
    cellClassName: 'checkbox-cell',
    headerAlign: 'center',
    renderHeader: () => {
      const allDisabled = lots.every((lot) =>
        isMypage ? !_.isUndefined(lot.mapAnalysisPurchaseStatus) : lot.purchaseStatus !== 'NOT_PURCHASED',
      );

      const handleRootCheckBoxClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        const newState = !rootCheckBox;
        setRootCheckBox(newState);
        const filteredBoxes = checkBoxes.filter(
          (box) => box.purchaseStatus === 'NOT_PURCHASED' || _.isUndefined(box.purchaseStatus),
        );
        setLotCount(newState ? filteredBoxes.length : 0);
      };

      return (
        <TableRootChecbox
          disableRipple
          value=" "
          disabled={allDisabled}
          checked={rootCheckBox}
          onClick={handleRootCheckBoxClick}
        />
      );
    },
    renderCell: (params: GridRenderCellParams) => {
      const selectedLot = lots.find((lot) => params.id === lot.id) as LotRowDatum;
      const checkboxState = checkBoxes.find((check) => params.id === check.id)?.checkBoxState || false;

      const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setCheckBoxes((prevCheckBoxes) =>
          prevCheckBoxes.map((data) => {
            if (params.id === data.id) {
              setLotCount((prev) => (checkboxState ? prev - 1 : prev + 1));
              return { ...data, checkBoxState: !data.checkBoxState };
            }
            return data;
          }),
        );
      };

      const isDisabled = isMypage
        ? !(
            selectedLot?.mapAnalysisPurchaseStatus === 'NOT_PURCHASED' ||
            _.isUndefined(selectedLot.mapAnalysisPurchaseStatus)
          )
        : !(isUnpaid(selectedLot) && selectedLot.purchaseStatus === 'NOT_PURCHASED');

      return isDisabled ? (
        <Checkbox
          disabled
          sx={{
            '& > svg': {
              height: '1rem',
              width: '1rem',
            },
          }}
        />
      ) : (
        <TableEachChecbox value=" " disableRipple checked={checkboxState} onChange={handleCheckBoxChange} />
      );
    },
  },
  {
    field: 'purchasedGoonDong',
    headerName: '매수 군',
    align: 'left',
    minWidth: 80,
    sortable: false,
    flex: 0.2778,
  },
  {
    field: 'purchasedJibun',
    headerName: '번지',
    align: 'left',
    minWidth: 40,
    flex: 0.1111,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLot = _.find(lots, (landowner) => landowner.id === id) as LotRowDatum;
      return typeof selectedLot.purchasedJibun !== 'undefined' ? selectedLot.purchasedJibun || '-' : '-';
    },
  },
  {
    field: 'purchasedArea',
    headerName: '면적',
    align: 'left',
    minWidth: 40,
    flex: 0.1111,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLot = _.find(lots, (landowner) => landowner.id === id) as LotRowDatum;

      return typeof selectedLot.purchasedArea !== 'undefined' ? selectedLot.purchasedArea || '-' : '-';
    },
  },
  {
    field: 'chineseName',
    headerName: '한자이름',
    align: 'left',
    minWidth: 60,
    flex: 0.1667,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLot = _.find(lots, (landowner) => landowner.id === id) as LotRowDatum;

      return typeof selectedLot.chineseName !== 'undefined' ? selectedLot.chineseName || '-' : '-';
    },
  },
  {
    field: 'buyerAddress',
    headerName: '거주지',
    align: 'left',
    minWidth: 75,
    flex: 0.2083,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLot = _.find(lots, (landowner) => landowner.id === id) as LotRowDatum;
      if (typeof selectedLot.buyerAddress !== 'undefined') {
        if (selectedLot.buyerAddress === 'X' || selectedLot.buyerAddress === 'x' || selectedLot.buyerAddress === '×') {
          return selectedLot.purchasedGoonDong;
        } else {
          return selectedLot.buyerAddress;
        }
      } else {
        return '-';
      }
    },
  },
];
