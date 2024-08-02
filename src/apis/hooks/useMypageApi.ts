import { useMemo } from 'react';

import _ from 'lodash';

import api from '@apis';
import { TotalLotInfo } from '@interfaces/apis';
import { makeLandowenersRow } from '@utils';

type UseMypageApi = {
  getAllPaidLots: (page: number, size: number) => Promise<TotalLotInfo>;
  getOneLandownerWithName: (page: number, size: number, name: string) => Promise<TotalLotInfo>;
} | null;

export const UseMypageApi = (): UseMypageApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getAllPaidLots: async (page: number, size: number) => {
          try {
            const landOwnersInfo = await api()
              .mypage.getPaidLots(page, size)
              .then((res) => {
                const products = res.data.content;
                const landRegistries = products.map((product) => {
                  return {
                    ...product.landRegistryPayment.product,
                    mapAnalysisProductId: product.mapAnalysisProductId,
                    mapAnalysisPurchaseStatus: product.mapAnalysisPayment?.product.purchaseStatus,
                  };
                });

                return { landOwners: makeLandowenersRow(landRegistries), totalElement: res.data.totalElements };
              });
            return landOwnersInfo;
          } catch (e) {
            console.error('Error: get paid land owners data', e);
            return { landOwners: [], totalElement: 0 };
          }
        },
        getOneLandownerWithName: async (page: number, size: number, name: string) => {
          try {
            const landOwnersInfo = await api()
              .mypage.getPaidLots(page, size, name)
              .then((res) => {
                const data = res.data.content;
                // product가 null이 아니라는 가정 아래에
                const landRegistries = _.map(data, (item) => ({
                  ...item.landRegistryPayment.product,
                  mapAnalysisProductId: item.mapAnalysisProductId,
                  mapAnalysisPurchaseStatus: item.mapAnalysisPayment?.product.purchaseStatus,
                }));
                return { landOwners: makeLandowenersRow(landRegistries), totalElement: res.data.totalElements };
              });
            return landOwnersInfo;
          } catch (e) {
            console.error(`Error: get ${name} data `, e);
            return { landOwners: [], totalElement: 0 };
          }
        },
      };
    } else {
      return null;
    }
  }, []);

  return instance;
};
