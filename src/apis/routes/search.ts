import { AxiosResponse } from 'axios';

import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions, SearchLotRes } from '@interfaces/apis';

export interface AxiosSearchReturn {
  getLandOwners: (name: string, page: number, size: number) => Promise<AxiosResponse<SearchLotRes>>;
}

export const axiosSearch = (opt: AxiosHeaderOptions): AxiosSearchReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getLandOwners: async (name: string, page: number, size: number) => {
      const url = `/product/landRegistry/findAllByName/${name}`;
      return instance.get<SearchLotRes>(url, { params: { page: page, size: size } });
    },
  };
};
