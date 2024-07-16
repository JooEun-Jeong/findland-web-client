import { AxiosResponse } from 'axios';

import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions, MyPageContent, MyPageRes, PaymentRes } from '@interfaces/apis';

export interface AxiosMypageReturn {
  // getPaidLots: (page: number, size: number) => Promise<MyPageRes>;
  getPaidLots: (page: number, size: number) => Promise<AxiosResponse<PaymentRes>>;
  getPaymentInfo: (page: number, size: number, name: string) => Promise<AxiosResponse<MyPageRes>>;
}

export const axiosMypage = (opt: AxiosHeaderOptions): AxiosMypageReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getPaidLots: async (page: number, size: number) => {
      const url = `payment/payment`;
      return instance.get(url, { params: { status: 'COMPLETED', page: page, size: size } });
    },
    getPaymentInfo: async (page: number, size: number, name: string) => {
      const url = `payment/payment/land-registry`;
      return instance.get(url, { params: { status: 'COMPLETED', page: page, size: size, name: name } });
    },
  };
};
