import { LotRowDatum } from '@interfaces';

type productParam = 'chineseName' | 'buyerAddress' | 'purchasedJibun' | 'purchasedArea';

export const isUnpaid = (lot: LotRowDatum) => {
  const testingParameters: Array<productParam> = ['chineseName', 'buyerAddress', 'purchasedJibun', 'purchasedArea'];

  const isPaid = testingParameters.map((param: productParam) => lot[param]?.includes('*'));
  return isPaid.includes(true);
};
