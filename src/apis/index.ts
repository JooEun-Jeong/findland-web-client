import { getLocalStorageItem } from '@/utils/getLocalStorageItem';
import { AxiosAdmin, AxiosAdminReturn } from '@apis/routes/admin';

import { AxiosMypageReturn, axiosMypage } from './routes/mypage';
import { AxiosPaymentReturn, axiosPayment } from './routes/payment';
import { AxiosSearchReturn, axiosSearch } from './routes/search';

type ApiObject = {
  search: AxiosSearchReturn;
  mypage: AxiosMypageReturn;
  payment: AxiosPaymentReturn;
  admin: AxiosAdminReturn;
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
    admin: AxiosAdmin({ headers }),
  };
};

export default api;
