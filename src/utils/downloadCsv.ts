import { LotRowDatum } from '@interfaces';

const convertToCSV = (objArray: object) => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  // Remove specified keys from the objects
  const filteredArray = array.map((obj: LotRowDatum) => {
    const {
      isSelected,
      purchaseStatus,
      id,
      koreanName,
      chineseName,
      buyerAddress,
      purchasedGoonDong,
      purchasedJibun,
      purchasedArea,
    } = obj;
    return {
      koreanName,
      chineseName,
      buyerAddress: buyerAddress === 'X' ? purchasedGoonDong : buyerAddress,
      purchasedGoonDong,
      purchasedJibun,
      purchasedArea,
    };
  });

  // Get the column headers
  const headers = [
    '소유자 한글이름',
    '소유자 한자이름',
    '소유자 거주지',
    '매수한 토지 지역',
    '매수한 토지 번지',
    '매수한 토지 면적',
  ];
  str += headers.join(',') + '\r\n';

  for (let i = 0; i < filteredArray.length; i++) {
    let line = '';
    for (const index in filteredArray[i]) {
      if (line !== '') line += ',';

      // Enclose fields in double quotes and escape any double quotes within the field
      line += `"${filteredArray[i][index].toString().replace(/"/g, '""')}"`;
    }
    str += line + '\r\n';
  }
  return str;
};

export const downloadCSV = (props: { data: object; fileName: string }) => {
  const csvString = convertToCSV(props.data);

  // Add BOM to ensure UTF-8 encoding
  const utf8Bom = '\uFEFF';
  const csvData = new Blob([utf8Bom + csvString], { type: 'text/csv;charset=utf-8;' });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement('a');
  link.href = csvURL;
  link.download = `${props.fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
