export interface ResponseLandDatum {
  id: number;
  goon: string;
  meon: string;
  li: string;
  jibun: string;
  jimok: string;
  squareMeter: string;
  buyerAddress: string;
  coOwner: string;
  name: string;
  chineseName: string;
  area: string;
}
export type ResponseLandData = Array<ResponseLandDatum>;
////////////////////

export interface Lot {
  id: string;
  itemType: string;
  productType: string;
  amount: number;
  koreanName: string;
  chineseName: string;
  buyerAddress: string;
  purchasedGoon: string;
  purchasedMyeon: string;
  purchasedLi: string;
  purchasedJibun: string;
  purchasedJimok: string;
  purchasedArea: string;
  purchaseStatus: string;
  mapAnalysisProductId?: string;
  mapAnalysisPurchaseStatus?: string;
}

export interface SearchLotRes {
  products: Array<Lot>;
  page: number;
  size: number;
  totalPage: number;
  totalElement: number;
}

export interface LotRowDatum {
  id: string;
  koreanName: string;
  chineseName: string;
  buyerAddress: string;
  purchasedGoonDong: string; // 경기도 고양군
  purchasedJibun: string; // 17번
  purchasedArea: string; // 24평
  isSelected: boolean;
  purchaseStatus: string; // COMPLETED, NOT_PURCHASED
  mapAnalysisProductId?: string;
  mapAnalysisPurchaseStatus?: string;
}
export type LotRowData = Array<LotRowDatum>;

export interface TotalLotInfo {
  landOwners: LotRowData;
  totalElement: number;
}
