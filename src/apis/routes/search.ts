import { axiosCreateInstance } from '@apis/defaultSetting';
import { TmpResult } from '@constants';
import { AxiosHeaderOptions, Lots } from '@interfaces/apis';

export interface AxiosSearchReturn {
  getLandOwners: (name: string) => Promise<Lots>;
}

export const axiosSearch = (opt: AxiosHeaderOptions): AxiosSearchReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getLandOwners: async (name: string) => {
      const url = `search/${name}`;
      // return instance.get(url);
      return TmpResult;
    },
  };
};
