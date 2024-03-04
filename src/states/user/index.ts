import { atomFamily, atom } from 'recoil';

import { LandRowData } from '@interfaces';

// interface & type

// atoms
export const productCountAtomFamily = atomFamily<number, string>({
  key: 'productCountAtomFamily',
  default: 0,
});

export const landOwnerAtom = atom<LandRowData>({
  key: 'landOwnerAtom',
  default: [],
});
