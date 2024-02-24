export interface LandRowDatum {
  id: number;
  goon: string;
  meon: string;
  li: string;
  jibun: string;
  buyerAddress: string;
  name: string;
  chineseName: string;
  area: string;
  isSelected: Array<boolean>;
  isPaid: Array<boolean>;
}
export type LandRowData = Array<LandRowDatum>;

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
