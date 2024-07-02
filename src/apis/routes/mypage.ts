import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions, MyPageRes } from '@interfaces/apis';

export interface AxiosMypageReturn {
  getPaidLots: (page: number, size: number) => Promise<MyPageRes>;
}

export const axiosMypage = (opt: AxiosHeaderOptions): AxiosMypageReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getPaidLots: async (page: number, size: number) => {
      const url = `payment/payment/land-registry`;
      return instance.get(url, { params: { status: 'COMPLETED', page: page, size: size } });
    },
  };
};
