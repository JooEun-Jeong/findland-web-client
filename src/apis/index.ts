import { AxiosMypageReturn, axiosMypage } from './routes/mypage';
import { AxiosSearchReturn, axiosSearch } from './routes/search';

type ApiObject = {
  search: AxiosSearchReturn;
  mypage: AxiosMypageReturn;
};

const api = (): ApiObject => {
  const accessToken = '';
  const headers = {
    Authorization: 'Bearer ' + accessToken,
  };

  return {
    search: axiosSearch({ headers }),
    mypage: axiosMypage({ headers }),
  };
};

export default api;
