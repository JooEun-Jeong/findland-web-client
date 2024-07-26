import { Lot, LotRowData } from '@interfaces/apis';

export const makeLandowenersRow = (lots: Array<Lot>): LotRowData => {
  return lots.map((lot) => {
    return {
      id: lot.id,
      koreanName: lot.koreanName,
      chineseName: lot.chineseName,
      buyerAddress: lot.buyerAddress,
      purchasedGoonDong: lot.purchasedGoon + ' ' + lot.purchasedMyeon + ' ' + lot.purchasedLi,
      purchasedJibun: lot.purchasedJibun,
      purchasedArea: lot.purchasedArea,
      isSelected: false,
    };
  }) as LotRowData;
};
