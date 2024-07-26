import { AxiosResponse } from 'axios';

import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions, SearchLotRes } from '@interfaces/apis';

export interface AxiosSearchReturn {
  getLandOwners: (name: string) => Promise<AxiosResponse<SearchLotRes>>;
}

export const axiosSearch = (opt: AxiosHeaderOptions): AxiosSearchReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getLandOwners: async (name: string) => {
      const url = `/api/v1/product/landRegistry/findAllByName/${name}`;
      return instance.get<SearchLotRes>(url);
    },
  };
};
