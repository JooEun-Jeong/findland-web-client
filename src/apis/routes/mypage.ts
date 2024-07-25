import { AxiosResponse } from 'axios';

import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions, MyPageContent, MyPageRes, PaymentRes } from '@interfaces/apis';

export interface AxiosMypageReturn {
  // getAllPaidLots: (page: number, size: number) => Promise<MyPageRes>;
  getAllPaymentInfo: (page: number, size: number) => Promise<AxiosResponse<PaymentRes>>;
  getPaidLots: (page: number, size: number, name?: string) => Promise<AxiosResponse<MyPageRes>>;
}

export const axiosMypage = (opt: AxiosHeaderOptions): AxiosMypageReturn => {
  const { headers } = opt;
  const instance = axiosCreateInstance({ headers });
  return {
    getAllPaymentInfo: async (page: number, size: number) => {
      const url = `payment/payment`;
      return instance.get(url, { params: { status: 'COMPLETED', page: page, size: size } });
    },
    getPaidLots: async (page: number, size: number, name?: string) => {
      const url = `payment/payment/land-registry`;

      const param_name = name ? name : '';
      return instance.get(url, { params: { status: 'COMPLETED', page: page, size: size, name: param_name } });
    },
  };
};
