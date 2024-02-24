import { AxiosHeaderOptions, ResponseLandData } from '@interfaces/apis';
import { axiosCreateInstance } from '@apis/defaultSetting';

export interface AxiosSearchReturn {
  getLandOwners: (name: string) => Promise<ResponseLandData>;
}

export const axiosSearch = (opt: AxiosHeaderOptions): AxiosSearchReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getLandOwners: async (name: string) => {
      const url = `search/${name}`;
      return instance.get(url);
    },
  };
};
