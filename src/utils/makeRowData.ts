import { LandRowData, ResponseLandData } from '@interfaces/apis';

export const makeLandowenersRow = (landOwners: ResponseLandData): LandRowData => {
  return landOwners.map((landOwner) => {
    return {
      id: landOwner.id,
      name: landOwner.name,
      chineseName: landOwner.chineseName,
      goon: landOwner.goon,
      meon: landOwner.meon,
      li: landOwner.li,
      jibun: landOwner.jibun,
      area: landOwner.squareMeter,
      buyerAddress:
        landOwner.buyerAddress === 'x' || landOwner.buyerAddress === '×'
          ? landOwner.goon + landOwner.meon + landOwner.li
          : landOwner.buyerAddress,
      isSelected: [false, false, false, false],
      isPaid: [false, false, false, false],
    };
  }) as LandRowData;
};
