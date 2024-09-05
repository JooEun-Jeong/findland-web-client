## findLand's web client ![Generic badge](https://img.shields.io/badge/React-18.2.0-green.svg)  

> 토지조사부 데이터를 구매 및 열람, 지도 위치 확인 서비스 신청이 가능한 사이트입니다.  
- [Dev 웹서버 바로가기](https://dev.findland.store/)  
- [Prod 웹서버 바로가기](http://findland.store/)


### How to Use  

#### Install libraries
- node 버전: `v18.20.0`
- 사용하는 라이브러리 소개:  
  `React`, `Typescript`, `MUI`, `recoil`, `Webpack`  
- 사용하는 협업 툴 소개:  
  `eslint`, `prettier`

```bash
git clone https://github.com/findLandGO/findLand-web-client.git 
cd findLand-web-client
yarn        # install
yarn start  # start development server
```

### How to Deploy web
#### Use Tag to trigger Github Action  
Thanks to 주안님!
- **Dev 서버**  
  - Check list
    [ ] index.html에 script 태그에 `data-adbreak-test="on"`이 있는지 확인
    [ ] package.json에 scripts에 `build`의 command가 `build:dev`의 command와 동일한지 확인
  - If all are perfect,
    ```bash
    git tag dev-[anything]
    git push origin dev-[anything]
    ```  
  > build 시간 대략 3분  

- **Prod 서버**  
  - Check list
    [ ] index.html에 script 태그에 `data-adbreak-test="on"`가 없는지 확인
    [ ] package.json에 scripts에 `build`의 command가 `build:prod`의 command와 동일한지 확인
  - If all are perfect,
    ```bash
    git tag v[anything]
    git push origin v[anything]
    ```  
  > build 시간 대략 12분
  