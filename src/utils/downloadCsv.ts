const convertToCSV = (objArray: object) => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line !== '') line += ',';

      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
};

export const downloadCSV = (props: { data: object; fileName: string }) => {
  const csvData = new Blob([convertToCSV(props.data)], { type: 'text/csv' });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement('a');
  link.href = csvURL;
  link.download = `${props.fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
