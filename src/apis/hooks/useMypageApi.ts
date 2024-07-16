import { useMemo } from 'react';

import _ from 'lodash';

import api from '@apis';
import { Lot, LotRowData, MyPageContent } from '@interfaces/apis';
import { makeLandowenersRow } from '@utils';

type UseMypageApi = {
  getPaidLots: (page: number, size: number) => Promise<LotRowData>;
  getAllLandIdbyMapId: (page: number, size: number, name: string) => Promise<Map<string, string>>; // landId: mapAnalysis Id
} | null;

export const UseMypageApi = (): UseMypageApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getPaidLots: async (page: number, size: number) => {
          try {
            const landOwners: LotRowData = await api()
              .mypage.getPaidLots(page, size)
              .then((res) => {
                const products = res.data.content;
                // const landRegistries = products.map((product) => product.landRegistryPayment.product);
                // const mapAnalysisProductIds = products.map((product) => product.mapAnalysisProductId);
                const landRegistries: Array<Lot> = products
                  .filter((product) => product.product.productType === 'LAND_REGISTRY')
                  .map((product) => product.product);

                return makeLandowenersRow(landRegistries);
              });
            return landOwners;
          } catch (e) {
            console.error('Error: get paid land owners data', e);
            return [];
          }
        },
        getAllLandIdbyMapId: async (page: number, size: number, name: string) => {
          try {
            const landIdByMapId = new Map<string, string>();
            await api()
              .mypage.getPaymentInfo(page, size, name)
              .then((res) => {
                const data: Array<MyPageContent> = res.data.content;
                _.map(data, (item: MyPageContent) => {
                  const productId = item.landRegistryPayment.productId;
                  const mapId = item.mapAnalysisProductId;

                  console.log('productId and mapId ', productId, mapId);
                  landIdByMapId.set(productId, mapId);
                });
              });
            return landIdByMapId;
          } catch (e) {
            console.error('Error: get all land Id by map Id', e);
            return {} as Map<string, string>;
          }
        },
      };
    } else {
      return null;
    }
  }, []);

  return instance;
};
