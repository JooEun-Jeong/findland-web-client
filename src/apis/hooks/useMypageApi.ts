import { useMemo } from 'react';

import api from '@apis';
import { LotRowData } from '@interfaces/apis';
import { makeLandowenersRow } from '@utils';

type UseMypageApi = {
  getPaidLots: (page: number, size: number) => Promise<LotRowData>;
} | null;

export const UseMypageApi = (): UseMypageApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getPaidLots: async (page: number, size: number) => {
          try {
            const landOwners: LotRowData = await api()
              .mypage.getPaidLots(page, size)
              .then((data) => {
                const products = data.content;
                const landRegistries = products.map((product) => product.landRegistryPayment.product);
                const mapAnalysisProductIds = products.map((product) => product.mapAnalysisProductId);

                return makeLandowenersRow(landRegistries);
              });
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
