export interface ProductTransferReq {
  userId: string; // user email
  productIds: Array<string>;
  bankAccountName: string;
}

export interface ProductTransferRes {
  id: string;
  userId: string;
  paymentIds: Array<string>;
  totalAmount: number;
  purchaseType: string; // 'TRANSFER'
  transferStatus: string; // 'PENDING'
  createdAt: string; // '2024-06-25T06:56:27.739Z'
  updatedAt: string; // '2024-06-25T06:56:27
}
