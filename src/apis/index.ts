import { getLocalStorageItem } from '@/utils/getLocalStorageItem';

import { AxiosMypageReturn, axiosMypage } from './routes/mypage';
import { AxiosSearchReturn, axiosSearch } from './routes/search';

type ApiObject = {
  search: AxiosSearchReturn;
  mypage: AxiosMypageReturn;
};

const api = (): ApiObject => {
  const jwtToken = getLocalStorageItem('jwtToken')?.jwtToken || '';
  const headers = {
    Authorization: 'Bearer ' + jwtToken,
  };

  return {
    search: axiosSearch({ headers }),
    mypage: axiosMypage({ headers }),
  };
};

export default api;
