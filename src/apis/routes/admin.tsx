import { axiosCreateInstance } from '@apis/defaultSetting';
import { AxiosHeaderOptions, PageSpec, ProductTransferRes } from '@interfaces';

export interface AxiosAdminReturn {
  getAllTransferRequest: (page: number, size: number) => Promise<PageSpec<ProductTransferRes>>;
  approveTransferRequest: (id: string) => Promise<void>;
}

export const AxiosAdmin = (opt: AxiosHeaderOptions): AxiosAdminReturn => {
  const instance = axiosCreateInstance(opt);
  const route = 'admin/payment';
  const getAllTransferRequest = async (page: number, size: number): Promise<PageSpec<ProductTransferRes>> => {
    const res = await instance.get(`${route}/transfer-request`, {
      params: {
        page,
        size,
      },
    });
    return res.data;
  };

  const approveTransferRequest = async (id: string): Promise<void> => {
    await instance.post(`${route}/transfer-request/${id}/approve`);
  };

  return {
    getAllTransferRequest,
    approveTransferRequest,
  };
};
