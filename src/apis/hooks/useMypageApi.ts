import { useMemo } from 'react';

import api from '@apis';
import { LotRowData } from '@interfaces/apis';
import { makeLandowenersRow } from '@utils';

type UseMypageApi = {
  getPaidLots: (name: string) => Promise<LotRowData>;
} | null;

export const UseMypageApi = (): UseMypageApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getPaidLots: async (name: string) => {
          try {
            const landOwners: LotRowData = await api()
              .mypage.getPaidLots(name)
              .then((data) => makeLandowenersRow(data.products));
            return landOwners;
          } catch (e) {
            console.error('Error: get paid land owners data', e);
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
