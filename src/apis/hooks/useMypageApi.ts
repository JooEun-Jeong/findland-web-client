import { useMemo } from 'react';

import _ from 'lodash';

import api from '@apis';
import { LotRowData } from '@interfaces/apis';
import { makeLandowenersRow } from '@utils';

type UseMypageApi = {
  getAllPaidLots: (page: number, size: number) => Promise<LotRowData>;
  getOneLandownerWithName: (page: number, size: number, name: string) => Promise<LotRowData>;
} | null;

export const UseMypageApi = (): UseMypageApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getAllPaidLots: async (page: number, size: number) => {
          try {
            const landOwners: LotRowData = await api()
              .mypage.getPaidLots(page, size)
              .then((res) => {
                const products = res.data.content;
                const landRegistries = products.map((product) => {
                  return {
                    ...product.landRegistryPayment.product,
                    mapAnalysisProductId: product.mapAnalysisProductId,
                    mapAnalysisPurchaseStatus: product.mapAnalysisPayment?.purchaseStatus,
                  };
                });

                return makeLandowenersRow(landRegistries);
              });
            return landOwners;
          } catch (e) {
            console.error('Error: get paid land owners data', e);
            return [];
          }
        },
        getOneLandownerWithName: async (page: number, size: number, name: string) => {
          try {
            const landowners = await api()
              .mypage.getPaidLots(page, size, name)
              .then((res) => {
                const data = res.data.content;
                // product가 null이 아니라는 가정 아래에
                return _.map(data, (item) => item.landRegistryPayment.product);
              });
            return makeLandowenersRow(landowners);
          } catch (e) {
            console.error(`Error: get ${name} data `, e);
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
