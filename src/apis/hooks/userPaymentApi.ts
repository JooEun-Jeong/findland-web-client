import { useMemo } from 'react';

import api from '@apis';
import { ProductTransferReq, ProductTransferRes } from '@interfaces/apis';

type UsePaymentApi = {
  postProductTransfer: (reqBody: ProductTransferReq) => Promise<ProductTransferRes>;
} | null;

export const UsePaymentApi = (): UsePaymentApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        postProductTransfer: async (reqBody: ProductTransferReq) => {
          const transferredResult = await api().payment.postProductTransfer(reqBody);
          return transferredResult;
        },
      };
    } else {
      return null;
    }
  }, []);

  return instance;
};
