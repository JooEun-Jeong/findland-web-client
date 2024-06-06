import { getLocalStorageItem } from '@/utils/getLocalStorageItem';

import { AxiosSearchReturn, axiosSearch } from './routes/search';

type ApiObject = {
  search: AxiosSearchReturn;
};

const api = (): ApiObject => {
  const jwtToken = getLocalStorageItem('jwtToken')?.jwtToken || '';
  const headers = {
    Authorization: 'Bearer ' + jwtToken,
  };

  return {
    search: axiosSearch({ headers }),
  };
};

export default api;
