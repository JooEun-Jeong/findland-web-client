import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import api from '@apis';
import { LotRowData, Lots } from '@interfaces/apis';
import { lotsAtom } from '@states/user';
import { makeLandowenersRow } from '@utils';

type UseSearchApi = {
  getLandOwners: (name: string) => void;
} | null;

export const UseSearchApi = (): UseSearchApi => {
  const setLots = useSetRecoilState(lotsAtom);
  const instance = useMemo(() => {
    if (api) {
      return {
        getLandOwners: async (name: string) => {
          try {
            const landOwners: LotRowData = await api()
              .search.getLandOwners(name)
              .then((lots) => makeLandowenersRow(lots));
            setLots(landOwners);
            return;
          } catch (e) {
            console.error('Error: get land owners data', e);
            return [];
          }
        },
      };
    } else {
      return null;
    }
  }, []);

  return instance;
};
