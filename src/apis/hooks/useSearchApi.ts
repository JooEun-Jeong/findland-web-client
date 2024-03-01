import { useMemo } from 'react';

import api from '@apis';
import { LandRowData } from '@interfaces/apis';
import { makeLandowenersRow } from '@utils';

type UseSearchApi = {
  getLandOwners: (name: string) => Promise<LandRowData>;
} | null;

export const UseSearchApi = (): UseSearchApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getLandOwners: async (name: string) => {
          try {
            const landOwners = (await api()
              .search.getLandOwners(name)
              .then((data) => makeLandowenersRow(data))) as LandRowData;

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
