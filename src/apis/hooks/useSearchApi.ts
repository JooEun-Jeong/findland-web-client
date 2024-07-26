import { useMemo } from 'react';

import api from '@apis';
import { LotRowData, SearchLotRes } from '@interfaces/apis';
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
              .then((res) => {
                console.log('Here are data: ', res.data);
                return makeLandowenersRow(res.data.products);
              });

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
