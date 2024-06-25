import { getLocalStorageItem } from '@/utils/getLocalStorageItem';

import { AxiosMypageReturn, axiosMypage } from './routes/mypage';
import { AxiosPaymentReturn, axiosPayment } from './routes/payment';
import { AxiosSearchReturn, axiosSearch } from './routes/search';

type ApiObject = {
  search: AxiosSearchReturn;
  mypage: AxiosMypageReturn;
  payment: AxiosPaymentReturn;
};

const api = (): ApiObject => {
  const jwtToken = getLocalStorageItem('jwtToken') || '';
  const headers = {
    Authorization: 'Bearer ' + jwtToken,
  };

  return {
    search: axiosSearch({ headers }),
    mypage: axiosMypage({ headers }),
    payment: axiosPayment({ headers }),
  };
};

export default api;
