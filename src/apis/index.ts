import { getLocalStorageItem } from '@/utils/getLocalStorageItem';

import { AxiosSearchReturn, axiosSearch } from './routes/search';

type ApiObject = {
  search: AxiosSearchReturn;
};

const api = (): ApiObject => {
  const accessToken = getLocalStorageItem('accessToken')?.accessToken || '';
  const headers = {
    Authorization: 'Bearer ' + accessToken,
  };

  return {
    search: axiosSearch({ headers }),
  };
};

export default api;
