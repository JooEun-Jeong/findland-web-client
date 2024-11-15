import { Lot } from './search';

export interface ProductTransferReq {
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

/// my page
export interface MyPageRes {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Array<MyPageContent>;
}

export interface MyPageContent {
  landRegistryPayment: LandRegiPayment;
  mapAnalysisProductId: string;
  mapAnalysisPayment: MapAnalysisPayment | null;
}

export interface LandRegiPayment {
  id: string;
  userId: string; // user email
  productId: string;
  product: Lot;
  transferRequestId: string;
  amount: number;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface MapAnalysisPayment {
  id: string;
  userId: string;
  productId: string;
  product: MapAnalysisService;
  transferRequestId: string;
  amount: number;
  purchaseStatus: string; // PENDING, PURCHASED, NOT_PURCHASED
  createdAt: string;
  updatedAt: string;
}

export interface MapAnalysisService {
  id: string;
  itemType: string;
  productType: string;
  amount: number;
  name: null;
  purchaseStatus: string;
}

/////////////
export interface PaymentRes {
  content: Array<LandRegiPayment>;
}
