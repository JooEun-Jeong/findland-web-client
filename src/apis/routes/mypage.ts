import { axiosCreateInstance } from '@apis/defaultSetting';
import { myPageDummyResult } from '@constants';
import { AxiosHeaderOptions, Lots } from '@interfaces/apis';

export interface AxiosMypageReturn {
  getPaidLots: (name: string) => Promise<Lots>;
}

export const axiosMypage = (opt: AxiosHeaderOptions): AxiosMypageReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getPaidLots: async (name: string) => {
      const url = `mypage/${name}`;
      // return instance.get(url);
      return myPageDummyResult;
    },
  };
};
