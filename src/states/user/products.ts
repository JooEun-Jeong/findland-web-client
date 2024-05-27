// Products
import { atomFamily, atom } from 'recoil';

import { LotRowData } from '@interfaces';

export const productCountAtomFamily = atomFamily<number, string>({
  key: 'productCountAtomFamily',
  default: 0,
});

export const lotsAtom = atom<LotRowData>({
  key: 'lotsAtom',
  default: [],
});
