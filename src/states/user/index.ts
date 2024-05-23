import { atomFamily, atom } from 'recoil';

import { LotRowData } from '@interfaces';

// interface & type

// atoms
export const productCountAtomFamily = atomFamily<number, string>({
  key: 'productCountAtomFamily',
  default: 0,
});

export const lotsSearchAtom = atom<LotRowData>({
  key: 'lotsSearchAtom',
  default: [],
});

export const lotsPaidAtom = atom<LotRowData>({
  key: 'lotsPaidAtom',
  default: [],
});
