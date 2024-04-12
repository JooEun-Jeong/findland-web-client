import { LotRowData, Lots } from '@interfaces/apis';

export const makeLandowenersRow = (lots: Lots): LotRowData => {
  return lots.map((lot) => {
    return {
      id: lot.id,
      koreanName: lot.koreanName,
      chineseName: lot.chineseName,
      buyerAddress: lot.buyerAddress,
      purchasedGoonDong: lot.purchasedGoon + ' ' + lot.purchasedDong,
      purchasedJibun: lot.purchasedJibun,
      purchasedArea: lot.purchasedArea,
      isSelected: false,
    };
  }) as LotRowData;
};
