import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions, LotRowData, SearchLotRes } from '@interfaces/apis';

export interface AxiosMypageReturn {
  getPaidLots: (name: string) => Promise<SearchLotRes>;
}

export const axiosMypage = (opt: AxiosHeaderOptions): AxiosMypageReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getPaidLots: async (name: string) => {
      const url = `mypage/${name}`;
      return instance.get(url);
      // return myPageDummyResult;
    },
  };
};
