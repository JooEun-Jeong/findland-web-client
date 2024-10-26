import { useMemo } from 'react';

import api from '@apis';
import { LotRowData, SearchLotRes, TotalLotInfo } from '@interfaces/apis';
import { makeLandowenersRow } from '@utils';

type UseSearchApi = {
  getLandOwners: (name: string, page: number, size: number) => Promise<TotalLotInfo>;
} | null;

export const UseSearchApi = (): UseSearchApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getLandOwners: async (name: string, page: number, size: number) => {
          try {
            const landOwnersInfo: TotalLotInfo = await api()
              .search.getLandOwners(name, page, size)
              .then((res) => {
                console.log('Here are data: ', res.data);
                return { landOwners: makeLandowenersRow(res.data.products), totalElement: res.data.totalElement };
              });

            return landOwnersInfo;
          } catch (e) {
            console.error('Error: get land owners data', e);
            return { landOwners: [], totalElement: -1 };
          }
        },
      };
    } else {
      return null;
    }
  }, []);

  return instance;
};
