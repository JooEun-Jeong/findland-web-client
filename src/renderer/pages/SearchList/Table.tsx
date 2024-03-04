import React, { useState } from 'react';

import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon, CheckBox } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import _, { every } from 'lodash';

import { LandRowData } from '@interfaces';

import { countProps } from '.';

export type checkboxProps = {
  id: number;
  checkBoxState: boolean;
};

interface ColumnProps {
  rootCheckBox: boolean;
  setRootCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  checkBoxes: checkboxProps[];
  setCheckBoxes: React.Dispatch<React.SetStateAction<checkboxProps[]>>;
  landowners: LandRowData;
  setLandowners: React.Dispatch<React.SetStateAction<LandRowData>>;
  countProducts: ({ idx, compute }: countProps) => void;
}

export const ResultColumn = ({
  rootCheckBox,
  setRootCheckBox,
  checkBoxes,
  setCheckBoxes,
  landowners,
  setLandowners,
  countProducts,
}: ColumnProps): GridColDef[] => [
  {
    field: 'checkbox',
    width: 40,
    headerName: ' ',
    sortable: false,
    resizable: false,
    renderHeader: () => (
      <Checkbox
        disableRipple
        value=" "
        sx={{
          color: 'rgba(0, 0, 0, 0.8)',
          '&.Mui-checked': {
            color: '#ffbd59',
          },
          '&.Mui-disabled': {
            color: 'gray',
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
      const selectedLandowner = landowners.find((landowner) => params.id === landowner.id);
      return selectedLandowner?.isPaid.every((x) => x === true) ? (
        <Checkbox disabled />
      ) : (
        <Checkbox
          value=" "
          disableRipple
          sx={{
            color: 'rgba(0, 0, 0, 0.8)',
            '&.Mui-checked': {
              color: '#d88912',
            },
            '& .Mui-disabled': {
              backgroundColor: 'gray',
            },
          }}
          disabled={selectedLandowner?.isPaid.every((x) => x === true)}
          // icon={<CheckBoxBlankIcon />}
          // checkedIcon={<CheckBoxIcon sx={{ color: '#ffbd59' }} />}
          checked={
            (selectedLandowner &&
              landowners.find((landowner) => params.id === landowner.id)?.isSelected.every((x) => x === true)) ||
            checkBoxes.find((check) => params.id === check.id)?.checkBoxState ||
            false
          }
          onChange={(e) => {
            e.stopPropagation();
            console.log(checkBoxes);
            setLandowners(
              landowners.map((landowner) => {
                return params.id === landowner.id
                  ? {
                      ...landowner,
                      isSelected: landowner.isSelected.every((x) => x === true)
                        ? [false, false, false, false]
                        : [true, true, true, true],
                    }
                  : landowner;
              }),
            );
            countProducts({
              idx: 4,
              compute: selectedLandowner?.isSelected.every((x) => x === true) ? 'minus' : 'plus',
            });

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

            // 해당 행의 항목들이 모두 체크되지 않았다면, checkboxstate는 false로
            selectedLandowner?.isSelected.every((x) => x !== true) &&
              setCheckBoxes(
                checkBoxes.map((data) => {
                  return params.id === data.id
                    ? {
                        id: data.id,
                        checkBoxState: false,
                      }
                    : data;
                }),
              );
          }}
        />
      );
    },
  },
  {
    field: 'name',
    headerName: '성명',
    align: 'left',
    resizable: false,
    width: 80,
  },
  {
    field: 'chineseCharacter',
    headerName: '한자',
    align: 'left',
    resizable: false,
    width: 80,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLandowner = _.find(landowners, (landowner) => landowner.id === id);
      const productNum = 0;

      return selectedLandowner?.isPaid[productNum] ? (
        selectedLandowner?.chineseName || ''
      ) : (
        <Checkbox
          disableRipple
          value=" "
          icon={<CheckBoxBlankIcon />}
          checkedIcon={<CheckBoxIcon sx={{ color: '#ffbd59' }} />}
          checked={
            selectedLandowner?.isSelected[productNum] ||
            (selectedLandowner?.isSelected[productNum] &&
              checkBoxes.find((data) => params.id === data.id)?.checkBoxState === true) ||
            false
          }
          onChange={(e) => {
            e.stopPropagation();
            countProducts({
              idx: productNum,
              compute: selectedLandowner?.isSelected[productNum] ? 'minus' : 'plus',
              // landowner이 아직 update하기 전이니까 반대로 계산
            });
            setLandowners(
              landowners.map((landowner) => {
                return id === landowner.id
                  ? {
                      ...landowner,
                      isSelected: landowner.isSelected.map((item, i) => (i === productNum ? !item : item)),
                    }
                  : landowner;
              }),
            );
          }}
        />
      );
    },
  },
  {
    field: 'goon',
    headerName: '군',
    align: 'left',
    resizable: false,
    width: 80,
  },
  {
    field: 'meon',
    headerName: '면(읍)',
    align: 'left',
    resizable: false,
    width: 80,
  },
  {
    field: 'li',
    headerName: '리',
    align: 'left',
    resizable: false,
    width: 80,
  },
  {
    field: 'jibun',
    headerName: '지번',
    align: 'left',
    resizable: false,
    width: 80,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLandowner = _.find(landowners, (landowner) => landowner.id === id);
      const productNum = 1;
      return selectedLandowner?.isPaid[productNum] ? (
        selectedLandowner?.jibun || ''
      ) : (
        <Checkbox
          disableRipple
          value=" "
          icon={<CheckBoxBlankIcon />}
          checkedIcon={<CheckBoxIcon sx={{ color: '#ffbd59' }} />}
          checked={
            selectedLandowner?.isSelected[productNum] ||
            (selectedLandowner?.isSelected[productNum] &&
              checkBoxes.find((data) => params.id === data.id)?.checkBoxState === true) ||
            false
          }
          onChange={(e) => {
            e.stopPropagation();
            countProducts({
              idx: productNum,
              compute: selectedLandowner?.isSelected[productNum] ? 'minus' : 'plus',
              // landowner이 아직 update하기 전이니까 반대로 계산
            });
            setLandowners(
              landowners.map((landowner) => {
                return id === landowner.id
                  ? {
                      ...landowner,
                      isSelected: landowner.isSelected.map((item, i) => (i === productNum ? !item : item)),
                    }
                  : landowner;
              }),
            );
          }}
        />
      );
    },
  },
  {
    field: 'area',
    headerName: '평방미터',
    align: 'left',
    resizable: false,
    width: 80,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLandowner = _.find(landowners, (landowner) => landowner.id === id);
      const productNum = 2;

      return selectedLandowner?.isPaid[productNum] ? (
        selectedLandowner?.area || ''
      ) : (
        <Checkbox
          disableRipple
          value=" "
          icon={<CheckBoxBlankIcon />}
          checkedIcon={<CheckBoxIcon sx={{ color: '#ffbd59' }} />}
          checked={
            selectedLandowner?.isSelected[productNum] ||
            (selectedLandowner?.isSelected[productNum] &&
              checkBoxes.find((data) => params.id === data.id)?.checkBoxState === true) ||
            false
          }
          onChange={(e) => {
            e.stopPropagation();
            countProducts({
              idx: productNum,
              compute: selectedLandowner?.isSelected[productNum] ? 'minus' : 'plus',
              // landowner이 아직 update하기 전이니까 반대로 계산
            });
            setLandowners(
              landowners.map((landowner) => {
                return id === landowner.id
                  ? {
                      ...landowner,
                      isSelected: landowner.isSelected.map((item, i) => (i === productNum ? !item : item)),
                    }
                  : landowner;
              }),
            );
          }}
        />
      );
    },
  },
  {
    field: 'address',
    headerName: '소유자 주소',
    align: 'left',
    resizable: false,
    width: 180,
    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;
      const selectedLandowner = _.find(landowners, (landowner) => landowner.id === id);
      const productNum = 3;
      return selectedLandowner?.isPaid[productNum] ? (
        selectedLandowner?.buyerAddress || ''
      ) : (
        <Checkbox
          disableRipple
          value=" "
          icon={<CheckBoxBlankIcon />}
          checkedIcon={<CheckBoxIcon sx={{ color: '#ffbd59' }} />}
          checked={
            selectedLandowner?.isSelected[productNum] ||
            (selectedLandowner?.isSelected[productNum] &&
              checkBoxes.find((data) => params.id === data.id)?.checkBoxState === true) ||
            false
          }
          onChange={(e) => {
            e.stopPropagation();
            countProducts({
              idx: productNum,
              compute: selectedLandowner?.isSelected[productNum] ? 'minus' : 'plus',
              // landowner이 아직 update하기 전이니까 반대로 계산
            });
            setLandowners(
              landowners.map((landowner) => {
                return id === landowner.id
                  ? {
                      ...landowner,
                      isSelected: landowner.isSelected.map((item, i) => (i === productNum ? !item : item)),
                    }
                  : landowner;
              }),
            );
          }}
        />
      );
    },
  },
];
