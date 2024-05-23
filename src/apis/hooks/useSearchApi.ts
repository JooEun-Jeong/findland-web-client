import { useMemo } from 'react';

import api from '@apis';
import { LotRowData } from '@interfaces/apis';
import { makeLandowenersRow } from '@utils';

type UseSearchApi = {
  getLandOwners: (name: string) => Promise<LotRowData>;
} | null;

export const UseSearchApi = (): UseSearchApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getLandOwners: async (name: string) => {
          try {
            const landOwners: LotRowData = await api()
              .search.getLandOwners(name)
              .then((lots) => makeLandowenersRow(lots));

            return landOwners;
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
