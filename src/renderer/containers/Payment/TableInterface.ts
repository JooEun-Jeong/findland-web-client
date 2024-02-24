import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// will be only one
/**
 * count: `string`;
 * chineseCharacterCount: `number`;
 * jibunCount: `number`;
 * areaCount: `number`;
 * addressCount: `number`;
 * id: `number`;
 */
export interface ResultRow {
  count: string;
  chineseCharacterCount: number;
  jibunCount: number;
  areaCount: number;
  addressCount: number;
  id: number;
}

export const ResultColumn: GridColDef[] = [
  {
    field: 'count',
    headerName: ' ',
    align: 'left',
    resizable: false,
    width: 50,
    cellClassName: 'title',
  },
  {
    field: 'chineseCharacterCount',
    headerName: '한자',
    align: 'center',
    resizable: false,
    width: 80,
  },
  {
    field: 'jibunCount',
    headerName: '지번',
    align: 'center',
    resizable: false,
    width: 80,
  },
  {
    field: 'areaCount',
    headerName: '평방미터',
    align: 'center',
    resizable: false,
    width: 80,
  },
  {
    field: 'addressCount',
    headerName: '소유자 주소',
    align: 'center',
    resizable: false,
    width: 100,
  },
];
