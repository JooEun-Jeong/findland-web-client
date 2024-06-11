import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions, ProductTransferReq, ProductTransferRes } from '@interfaces/apis';

export interface AxiosPaymentReturn {
  postProductTransfer: (reqBody: ProductTransferReq) => Promise<ProductTransferRes>;
}

export const axiosPayment = (opt: AxiosHeaderOptions): AxiosPaymentReturn => {
  const { headers } = opt;

  const url = `/payment`;
  const instance = axiosCreateInstance({ headers });
  return {
    postProductTransfer: async (reqBody) => {
      return instance.post(url + `/transfer-request`, reqBody);
    },
  };
};
