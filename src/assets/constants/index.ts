export const FindMethods = [
  {
    title: '1. 조상님의 이름을 검색해보세요.',
    content: [
      '검색결과 나온 필지의 한자성함, 소유자주소가 조상님의 제적등본 상 한자성함, 거주지주소와 일치한다면 100년전쯤 조상님의 땅이었던 것입니다.',
    ],
  },
  {
    title: '2. 한글로 번역된 국가기록문서를 확인보세요.',
    content: [
      '- 검색된 결과물은 토지 º 임야조사부, 보안림편입고시, 국유임야매각고시 등 일제강점기에 한문으로 제작된 국가 기록들을 한글로 번역한 것입니다.',
      '- 토지조사부는 현행 토지제도의 근간으로, 대법원 판례상 최고 법적효력이 인정되는 원시취득 문서입니다.',
    ],
  },
  // {
  //   title: '3. AI를 활용하여 조상땅찾기를 진행해보세요!',
  //   content: ['100년전 필지의 현재주소, 조상님이 거주하시던 지역의 정보등을 AI에게 물어보세요.'],
  // },
];

export const OpenImDetail =
  '해당 데이터는 1910년대 일제강점 초기, 토지 조사 사업의 결과물로서 한문으로 제작된 토지조사부 및 임야조사부 등의 자료 원문을 한글로 번역한 것입니다. 자료원문은 국가기록원에서 확인하실 수 있습니다.';

const QA1 = {
  mainTitle: 'Q1. 증조, 고조 할아버지가 땅이 있으셨다는데, 지자체 조상땅찾기 서비스에서는 안나옵니다.',
  cons: [
    {
      content: [
        '지자체 조상땅찾기 서비스에서는 현재 할아버지 성함으로 된 토지만 나옵니다. 또 2008년 이전에 사망하신 분의 토지는 확인할 수 없습니다. 6.25때 소실되었거나, 일제강점기때 민간인들 가지고 있었던 엄청나게 많은 토지들은 1980년대 이후 상당부분 국가로 귀속되었기에 확인되지 않는 것입니다.',
      ],
    },
  ],
};
const QA2 = {
  mainTitle: 'Q2. 지자체 조상땅찾기 서비스에 안나오는 땅들을 찾을 수 있나요?',
  cons: [
    {
      content: ['땅찾GO에서 제공하는 [토지조사부, 임야조사부] 자료를 확인하시면 찾으실 수 있습니다. '],
    },
  ],
};
const QA3 = {
  mainTitle: 'Q3. 땅찾GO에서 제공하는 토지조사부, 임야조사부는 무엇인가요?',
  cons: [
    {
      content: [
        '일제강점 초기, 총독부 임시토지조사국이 토지조사사업(1910-1918)과 임야조사사업(1916-1924)을 실시했습니다. 그 결과 만들어진 서류가 토지조사부, 임야조사부입니다. 이 서류들은 현재 대법원에서 인정하는 조상땅찾기 소송관련 가장 강력한 법적효력을 지닌 문서입니다.',
      ],
    },
  ],
};

const QA4 = {
  mainTitle: 'Q4. 옛날 땅이 지금 어디에 있는지 도저히 못찾겠어요',
  cons: [
    {
      content: [
        '땅찾GO에서 “현재예상지역 지도서비스”를 활용하시면 비교적 쉽게 찾으실 수 있습니다. 행정구역 변천과 토지 지번의 지속적인 변경으로 인해 100년전 할아버지 땅이 지금 어디인지 정확히 찾아내는 작업은 매우 복잡합니다. 이 과정을 지도 서비스를 활용해서 큰 도움을 받으실 수 있습니다.',
      ],
    },
  ],
};

export const QAs = [QA1, QA2, QA3, QA4];

export const TempPatentDetail = '특허 가출원 번호: 10-2023-0076900';

export const TmpResult = [];
export const TmpResult2 = [
  {
    id: 1,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 2,
    koreanName: '김숙',
    chineseName: null,
    buyerAddress: null, // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: null, // 17번
    purchasedArea: null, // 24평
  },
  {
    id: 3,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 4,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 5,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 6,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 7,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 8,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 9,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 10,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 11,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 12,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
];

export const myPageDummyResult = [
  {
    id: 1,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 4,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 5,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 6,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 7,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 8,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 9,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 10,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 11,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
  {
    id: 12,
    koreanName: '김숙',
    chineseName: '金淑',
    buyerAddress: '경기도 부천군', // 경기도 부천군
    purchasedGoon: '경기도 고양군', // 경기도 고양군
    purchasedDong: '대화동', // 대화동
    purchasedJibun: '17번', // 17번
    purchasedArea: '24평', // 24평
  },
];
