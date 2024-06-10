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
  chineseName: string | null; // 결제하지 않았다면 null, 결제한 항목이라면 string
  buyerAddress: string | null; // 경기도 부천군
  purchasedGoonDong: string; // 경기도 고양군
  purchasedJibun: string | null; // 17번
  purchasedArea: string | null; // 24평
  isSelected: boolean;
}
export type LotRowData = Array<LotRowDatum>;
