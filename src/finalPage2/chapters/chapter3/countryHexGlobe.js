// countryHexGlobe.js
import { openPopup } from './popup.js';
import { popupData } from './popupData.js';

const globeContainer = document.getElementById('globe-container');

// 🌐 Globe 초기화
const world = Globe()(globeContainer)
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
  .backgroundColor('rgba(0,0,0,0)')
  .showAtmosphere(true)
  .atmosphereColor('#ffffff')
  .atmosphereAltitude(0.15)
  .polygonCapColor((feat) =>
    currentCountries.includes(feat.properties.name)
      ? '#017B92'
      : 'rgba(0, 0, 0, 0)'
  )
  .polygonSideColor(() => 'rgba(1, 122, 146, 0.24)')
  .polygonStrokeColor(() => '#fff')
  .polygonAltitude((feat) => countryAltitudes[feat.properties.name] || 0)
  .polygonsTransitionDuration(300)
  .hexPolygonColor(() => 'white')
  .hexPolygonAltitude((d) => (d.properties.altitude || 0.1) + 0.3);
world.onHexPolygonClick((hex) => {
  const caseName = hex?.properties?.name;
  const data = popupData[caseName];

  if (data) {
    openPopup(caseName, data.headline, data.address, data.image);
  } else {
    openPopup(caseName, '전조 사례 등록 예정', '', '');
  }
});

// Globe 회전 및 상호작용 설정
world.controls().enabled = true;
world.controls().autoRotate = false;
world.controls().autoRotateSpeed = 0.3;

// Canvas 포인터 이벤트 보정
const canvas = globeContainer.querySelector('canvas');
if (canvas) {
  canvas.style.pointerEvents = 'auto';
  canvas.style.zIndex = '2';
}

// ✅ 공통 변수
let currentCountries = [];
const countryAltitudes = {};

// ✅ 유형 설명 텍스트
const typeDescriptions = {
  rule: '안전 규정은 단순한 권고가 아니라, 생명과 직결된 약속 입니다. 그러나 반복되는 무시와 방심은 결국 큰 참사로 이어졌습니다. 이 영역에서는 "안전 규정 위반"이 주요 원인이 된 국내외 사고들을 모아 보여줍니다. 작은 경고를 가벼이 여기지 않는 문화, 그 시작을 위해 기억 합니다.',
  build:
    '시설과 구조물은 생명을 지탱하는 기반입니다. 그러나 부실한 공사와 관리 소홀은 예고된 붕괴를 불러왔습니다. 이 영역에서는 부실 시공, 점검 부재, 관리 태만으로 인한 참사를 기록 합니다. "당연한 신뢰"가 배신당한 순간들을 통해, 책임의 무게를 돌아봅니다.',
  perception:
    '위험은 늘 신호를 보냅니다. 하지만 인지하지 못하거나, 경고를 무시한 순간 재앙은 현실이 되었습니다. 이 영역에서는 초기 위험 징후를 과소평가하거나 방치해 벌어진 참사를 모았습니다. "설마"라는 안일함이 어떤 결과를 부르는지, 선명히 보여줍니다.',
  responsibility:
    '책임은 구조의 핵심이며, 통제되지 않은 시스템은 언제든 붕괴할 수 있습니다. 담당자가 존재했지만 역할을 다하지 않았고, 기관은 경고를 받았지만 대응하지 않았던 순간들. 군중 통제 실패, 경고 전달 누락, 감시 체계 무력화는 대개 현장에 직접 있던 사람이 아니라 관리 책임이 있었으나 대응하지 않은 이들의 판단에서 비롯 되었습니다.',
  profit:
    '이익은 필요하지만, 생명보다 앞설 수는 없습니다. 그러나 다수의 참사는 "조금 더 벌기 위해" 안전을 희생한 결정에서 시작 되었습니다. 과적, 불법 개조, 정비 생략, 무리한 일정 강행 등은 경제적 손실 회피를 이유로 안전을 외면한 흔적들 입니다. "한 번쯤 괜찮겠지" 혹은 "돈이 안 되니까" 라는 판단이 만들어낸 비극을 보여줍니다. 가장 무서운 위험은 눈에 보이지 않는 위험이 아니라, 보면서도 외면한 탐욕 입니다.',
};

// ✅ 유형별 국가 및 헥사곤 좌표
const fullDataset = {
  rule: {
    //안전규정 위반
    countries: [
      'South Korea',
      'United States of America',
      'Bahamas',
      'Vietnam',
      'Spain',
      'Ukraine',
      'Russia',
      'Belgium',
      'Germany',
      'Thailand',
      'Sweden',
      'Paraguay',
      'Indonesia',
      'Italy',
      'Pakistan',
      'Brazil',
      'Iraq',
      'Japan',
      'United Kingdom',
      'India',
    ],
    hexPoints: [
      // 대한민국
      { lat: 36.815, lng: 127.119, name: '천안 열차 추돌사고', altitude: 0.85 },
      { lat: 35.211, lng: 128.56, name: '모산 수학여행 참사', altitude: 0.85 },
      {
        lat: 37.342,
        lng: 127.99,
        name: '원주 삼광터널 열차 충돌 사고',
        altitude: 0.8,
      },
      {
        lat: 35.9707,
        lng: 127.0093,
        name: '이리역 폭발 사고',
        altitude: 1.2,
      },
      {
        lat: 35.8251,
        lng: 128.7415,
        name: '경산 열차 추돌 사고',
        altitude: 1.5,
      },
      {
        lat: 37.5459,
        lng: 127.1279,
        name: '천호대교 버스 추락',
        altitude: 1.45,
      },
      {
        lat: 35.3509,
        lng: 127.7303,
        name: '지리산 폭우 참사',
        altitude: 1.1,
      },
      {
        lat: 35.8667,
        lng: 128.5933,
        name: '대구 지하철 참사',
        altitude: 0.95,
      },

      {
        lat: 36.991,
        lng: 127.112,
        name: '평택 안중 타워 크레인 붕괴 사고',
        altitude: 0.85,
      },
      {
        lat: 35.693,
        lng: 129.051,
        name: '경부 고속도로 언양 분기점 관광 버스 화재',
        altitude: 0.85,
      },
      {
        lat: 36.81,
        lng: 127.113,
        name: '안철수 유세버스 사망사고',
        altitude: 0.85,
      },

      // 미국
      { lat: 45.0506, lng: -87.7515, name: '페시티고 화재', altitude: 1.0 },
      {
        lat: 40.7309,
        lng: -73.9959,
        name: '트라이앵글 의류공장 화재 사고',
        altitude: 1.0,
      },
      { lat: 41.7325, lng: -49.9469, name: '타이타닉호 침몰', altitude: 1.0 },
      { lat: 35.4437, lng: 139.638, name: '사쿠라기초 사고', altitude: 1.3 },
      { lat: 35.7335, lng: 139.7825, name: '미카와시마 사고', altitude: 0.95 },
      {
        lat: 25.0343,
        lng: -77.3963,
        name: '야머스 캐슬호 화재 사고',
        altitude: 0.95,
      },
      { lat: 17.0, lng: 108.0, name: 'USS 포레스탈 화재 사건', altitude: 0.95 },
      { lat: 28.4827, lng: -16.3415, name: '테네리페 참사', altitude: 1.0 },

      {
        lat: 32.7157,
        lng: -117.1611,
        name: '샌디에고 상공 공중 추돌 사고',
        altitude: 1.0,
      },

      {
        lat: 35.6812,
        lng: 139.7671, // 도쿄 치요다구 호텔 뉴 재팬
        name: '호텔 뉴 재팬 화재 사고',
        altitude: 0.9,
      },
      {
        lat: 51.389,
        lng: 30.099, // 우크라이나 체르노빌 원전
        name: '체르노빌 원자력 발전소 폭발',
        altitude: 0.9,
      },
      {
        lat: 53.75,
        lng: 87.75, // 러시아 바르나울(코로무쉬 공항 인근 추정)
        name: '아에로플로트 6502편 추락사고',
        altitude: 0.9,
      },
      {
        lat: 39.2904,
        lng: -76.6122, // 미국 메릴랜드 주 볼티모어 인근
        name: '메릴랜드 열차 충돌 사고',
        altitude: 1.0,
      },
      {
        lat: 51.1242,
        lng: 1.3131, // 영국 도버 해협 인근
        name: '해럴드 오브 프리 엔터프리즈호 참사',
        altitude: 0.9,
      },
      {
        lat: 49.4361,
        lng: 7.6003, // 독일 람슈타인 공군기지
        name: '람슈타인 에어쇼 참사',
        altitude: 1.0,
      },
      {
        lat: 32.7511,
        lng: 130.2994, // 일본 운젠 후겐다케
        name: '운젠 분화',
        altitude: 1.0,
      },
      {
        lat: 13.8213,
        lng: 100.0644, // 태국 나콘파톰주
        name: '케이더 인형 공장 화재',
        altitude: 1.0,
      },
      {
        lat: 55.5953,
        lng: 37.3496, // 러시아 모스크바 남쪽 항로 상공 (추락 지점 중심)
        name: '아에로플로트 593편 추락 사고',
        altitude: 0.9,
      },

      {
        lat: 57.7072,
        lng: 11.9668, // 스웨덴 예테보리
        name: '예테보리 디스코텍 화재',
        altitude: 1.0,
      },
      {
        lat: 36.4713,
        lng: 140.5634, // 일본 이바라키현 도카이촌
        name: '도카이촌 방사능 누출 사고',
        altitude: 1.0,
      },
      {
        lat: 49.8125,
        lng: 23.9561, // 우크라이나 르비우 국제공항
        name: '우크라이나 르비우 국제공항 공군 에어쇼 참사',
        altitude: 0.95,
      },
      {
        lat: -29.6881,
        lng: -53.8069, // 브라질 산타마리아 (Kiss 클럽)
        name: '스테이션 나이트클럽 화재 사고',
        altitude: 0.95,
      },
      {
        lat: -34.6765,
        lng: -58.4527, // 아르헨티나 부에노스아이레스, 슈퍼마켓 화재 실제 발생 위치 근접
        name: '이쿠아 볼라노스 슈퍼마켓 화재',
        altitude: 0.95,
      },
      {
        lat: 35.0108,
        lng: 135.758, // 일본 교토 부 후쿠치야마시~아마가사키 구간 (대표 위치)
        name: '후쿠치야마선 탈선 사고',
        altitude: 0.95,
      },
      {
        lat: -5.1357,
        lng: 119.4121, // 인도네시아 마카사르 인근 (사고 해역)
        name: '아담항공 574편 추락 사고',
        altitude: 1.0,
      },
      {
        lat: 32.7765,
        lng: -79.9311, // 미국 사우스캐롤라이나주 찰스턴
        name: '찰스턴 소파 슈퍼 스토어 화재',
        altitude: 0.95,
      },
      {
        lat: 56.8373,
        lng: 60.5975, // 러시아 예카테린부르크 인근 (사고 추정 지점)
        name: '아에로플로트 821편 추락 사고',
        altitude: 0.95,
      },
      {
        lat: -3.4168,
        lng: 102.8984, // 인도네시아 벵쿨루 인근 (실제 화재 도시)
        name: '프로마야 로사지 나이트 클럽 화재',
        altitude: 0.95,
      },
      {
        lat: 54.7833,
        lng: 20.5167, // 러시아 스몰렌스크 북부 군 비행장 인근
        name: '폴란드 공군 Tu-154 추락 사고',
        altitude: 0.95,
      },
      {
        lat: 42.3643,
        lng: 10.922, // 이탈리아 지질섬 인근 (좌초 해역)
        name: '코스타 콩코르디아 호 좌초 사고',
        altitude: 0.95,
      },
      {
        lat: 24.9426,
        lng: 67.1184, // 파키스탄 카라치
        name: '알리 엔터프라이즈 의류공장 화재',
        altitude: 0.95,
      },
      {
        lat: 42.8782,
        lng: -8.5448, // 스페인 갈리시아, 산티아고 데 콤포스텔라
        name: '스페인 갈리시아 고속열차 탈선 사고',
        altitude: 0.95,
      },
      {
        lat: -29.6868,
        lng: -53.8071, // 브라질 산타마리아
        name: '키스 나이트 클럽 화재',
        altitude: 0.95,
      },
      {
        lat: 37.7764,
        lng: -122.2236, // 미국 캘리포니아주 오클랜드
        name: '고스트 쉽 창고 화재',
        altitude: 0.95,
      },
      {
        lat: 38.7767,
        lng: -90.4148, // 미국 미주리주 덕헤드
        name: '미주리 오리보트 전복 사고',
        altitude: 0.95,
      },
      {
        lat: 45.9319,
        lng: 8.5084, // 이탈리아 피에몬테, 모타로네산 인근
        name: '이탈리아 모타론산 케이블카 추락 사고',
        altitude: 0.95,
      },
      {
        lat: 34.7025,
        lng: 135.4959, // 일본 오사카시 기타구
        name: '오사카 빌딩 화재',
        altitude: 0.95,
      },
      {
        lat: 41.4264,
        lng: -49.9489, // 대서양 해저, RMS Titanic 잔해지점 인근
        name: '타이타닉호 관광 잠수정 사고',
        altitude: 0.95,
      },
      {
        lat: 36.2697,
        lng: 43.3781, // 이라크 카라코쉬
        name: '카라코쉬 결혼식장 화재',
        altitude: 0.95,
      },
    ],
  },

  //부실공사
  build: {
    countries: [
      'South Korea',
      'United States of America',
      'Italy',
      'United Kingdom',
      'Japan',
      'Brazil',
      'Russia',
      'France',
      'Thailand',
      'Germany',
      'Austria',
      'Portugal',
      'Israel',
      'Poland',
      'Bangladesh',
      'China',
      'Saudi Arabia',
      'Lebanon',
      'Mexico',
      'India',
    ],
    hexPoints: [
      // 🇰🇷 대한민국
      {
        lat: 37.5563,
        lng: 126.9393,
        name: '와우 시민 아파트 붕괴 사고',
        altitude: 0.9,
      },
      {
        lat: 37.5702,
        lng: 126.9918,
        name: '서울 시민회관 화재 사고',
        altitude: 0.85,
      },
      {
        lat: 36.4945,
        lng: 127.0274,
        name: '번데기 집단 식중독 사건',
        altitude: 0.73,
      },
      {
        lat: 35.1796,
        lng: 129.0756,
        name: '부산 대화호텔 화재 사건',
        altitude: 0.85,
      },
      { lat: 37.541, lng: 127.056, name: '성수대교 붕괴 사고', altitude: 0.9 },
      {
        lat: 37.5053,
        lng: 127.0246,
        name: '삼풍백화점 붕괴 사고',
        altitude: 1.2,
      },
      {
        lat: 37.1967,
        lng: 126.8315,
        name: '씨랜드 청소년 수련원 화재',
        altitude: 1.11,
      },
      {
        lat: 37.4718,
        lng: 126.6458,
        name: '인천 인현동 호프집 화재',
        altitude: 0.98,
      },
      {
        lat: 37.3955,
        lng: 127.1104,
        name: '판교 테크노밸리 축제 환풍구 붕괴 사고',
        altitude: 0.9,
      },
      {
        lat: 37.1376,
        lng: 128.2126,
        name: '제천 스포츠센터 화재 사고',
        altitude: 0.86,
      },
      {
        lat: 35.1532,
        lng: 126.9198,
        name: '광주 광역시 동구 학동 철거 건물 붕괴 사고',
        altitude: 0.91,
      },
      {
        lat: 37.275,
        lng: 127.4228,
        name: '이천 쿠팡 물류센터 화재 사고',
        altitude: 1.0,
      },
      {
        lat: 35.1321,
        lng: 126.7937,
        name: '광주 화정 아이파크 붕괴 사고',
        altitude: 0.93,
      },

      //해외
      {
        lat: 42.2391,
        lng: -71.7201,
        name: '펨버트 공장 붕괴 사고',
        altitude: 0.85,
      },
      {
        lat: 25.7617,
        lng: -80.1918,
        name: '니커보커 극장 붕괴 사고',
        altitude: 0.92,
      },
      {
        lat: 46.2681,
        lng: 12.3408,
        name: '바이온트댐 붕괴 사고',
        altitude: 0.84,
      },
      {
        lat: 51.5085,
        lng: 0.0269,
        name: '로넌 포인트 붕괴 사고',
        altitude: 0.85,
      },
      {
        lat: 34.6937,
        lng: 135.5023,
        name: '센니치 백화점 화재 사건',
        altitude: 0.85,
      },
      {
        lat: 41.8781,
        lng: -87.6298,
        name: '스카이라인 타워 붕괴 사고',
        altitude: 0.86,
      },
      {
        lat: -23.5515,
        lng: -46.6333,
        name: '조엘마 빌딩 화재',
        altitude: 0.9,
      },
      {
        lat: 25.7617,
        lng: -80.1918,
        name: '하버 케이 콘도미니엄 붕괴 사고',
        altitude: 0.92,
      },
      {
        lat: 39.0997,
        lng: -94.5786,
        name: '하얏트 리젠시 호텔 고가 통로 붕괴',
        altitude: 0.9,
      },
      {
        lat: 63.1106,
        lng: 11.7202,
        name: '스타바 댐 붕괴 사고', // 실제 위치: 노르웨이 스태이렌 인근
        altitude: 0.85,
      },
      {
        lat: 51.5308,
        lng: -0.1238,
        name: '런던 킹스 크로스 역 화재 사건', // 실제 위치: 영국 런던 킹스크로스역
        altitude: 0.85,
      },
      {
        lat: 54.7667,
        lng: 56.0333,
        name: '우파 철도 참사', // 실제 위치: 러시아 우파 인근
        altitude: 0.88,
      },
      {
        lat: 42.4072,
        lng: 9.1556,
        name: '아르망드-세사리 스타디움 참사', // 실제 위치: 프랑스 코르시카 바스티아
        altitude: 0.9,
      },
      {
        lat: 14.5823,
        lng: 121.0154,
        name: '로얄 플라자 호텔 붕괴 사고', // 실제 위치: 필리핀 마닐라 시내
        altitude: 0.86,
      },
      {
        lat: 29.9511,
        lng: -90.0715,
        name: '빅 바유 캐넛 탈선 사고', // 실제 위치: 미국 루이지애나 뉴올리언스 인근
        altitude: 0.84,
      },
      {
        lat: 51.3467,
        lng: 6.6078,
        name: '에세데 사고', // 실제 위치: 독일 노르트라인베스트팔렌주
        altitude: 0.86,
      },

      {
        lat: 47.2752,
        lng: 12.7609,
        name: '오스트리아 카프룬 터널 화재', // 실제 위치: Kaprun, Austria
        altitude: 0.85,
      },
      {
        lat: 41.0962,
        lng: -8.4951,
        name: '포르투갈 도루강 교량 붕괴 사고', // 실제 위치: Castelo de Paiva, Portugal
        altitude: 0.85,
      },
      {
        lat: 31.7683,
        lng: 35.2137,
        name: '예루살렘 결혼식장 붕괴 사고', // 실제 위치: Jerusalem, Israel
        altitude: 0.87,
      },
      {
        lat: 41.8864,
        lng: -87.6258,
        name: '시카고 발코니 붕괴사고', // 실제 위치: Chicago, Illinois, USA
        altitude: 0.84,
      },
      {
        lat: 47.7267,
        lng: 12.8769,
        name: '바트 라이헨할 아이스링크 붕괴 사고', // 실제 위치: Bad Reichenhall, Germany
        altitude: 0.83,
      },
      {
        lat: 50.2584,
        lng: 19.0275,
        name: '카토비체 국제 전시장 지붕 붕괴 사고', // 실제 위치: Katowice, Poland
        altitude: 0.86,
      },
      {
        lat: 44.9391,
        lng: -93.0977,
        name: '미시시피 강 교량 붕괴 사고', // 실제 위치: Minneapolis, Minnesota, USA
        altitude: 0.88,
      },
      {
        lat: 23.9037,
        lng: 90.132,
        name: '방글라데시 라나 플라자 붕괴 사고', // 실제 위치: Savar, Dhaka, Bangladesh
        altitude: 0.87,
      },
      {
        lat: 30.8222,
        lng: 112.8917,
        name: '둥팡즈싱 호 침몰 사고', // 실제 위치: Jianli County, Hubei Province, China
        altitude: 0.91,
      },
      {
        lat: 39.0339,
        lng: 117.7353,
        name: '텐진 항구 폭발 사고',
        altitude: 0.87,
      },
      {
        lat: 21.3891,
        lng: 39.8579,
        name: '메가 크레인 붕괴 사고',
        altitude: 0.88,
      },
      {
        lat: 51.5206,
        lng: -0.21,
        name: '런던 그렌펠 타워 화재 사고',
        altitude: 0.88,
      },
      {
        lat: 44.4134,
        lng: 8.9339,
        name: '제노바 모란디 교량 붕괴 사고',
        altitude: 0.88,
      },
      {
        lat: 33.9016,
        lng: 35.5196,
        name: '베이루트 항구 폭발 사고',
        altitude: 0.88,
      },
      {
        lat: 19.3578,
        lng: -99.123,
        name: '멕시코시티 도시 철도 12호선 교량 붕괴 사고',
        altitude: 0.88,
      },
      {
        lat: 25.8783,
        lng: -80.1211,
        name: '플로리다 챔플레인 타워 붕괴 사고',
        altitude: 0.88,
      },
      {
        lat: 22.1914,
        lng: 69.7036,
        name: '인도 구자라트 다리 붕괴 사고',
        altitude: 0.88,
      },
    ],
  },

  //위험 인지 실패
  perception: {
    countries: ['South Korea', 'United States of America', 'Canada', 'France'],
    hexPoints: [
      // 국내 사고
      {
        lat: 37.5408,
        lng: 127.0563,
        name: '성수대교 붕괴 사고',
        altitude: 0.8,
      },
      {
        lat: 37.503,
        lng: 127.0256,
        name: '삼풍 백화점 붕괴 사고',
        altitude: 0.9,
      },
      {
        lat: 34.2543,
        lng: 126.5708,
        name: '청해진해운 세월호 침몰 사고',
        altitude: 0.95,
      },

      // 해외 사고
      {
        lat: 42.3106,
        lng: -82.9423,
        name: '아메리칸 항공 96편 도어 탈락 사고',
        altitude: 0.8,
      }, // Windsor, Ontario
      {
        lat: 49.0071,
        lng: 2.4574,
        name: '터키 항공 981편 추락 사고',
        altitude: 0.9,
      }, // Orly/Ermenonville
      {
        lat: 28.6084,
        lng: -80.6043,
        name: '챌린저 우주 왕복선 폭발 사고',
        altitude: 1.0,
      }, // Kennedy Space Center
      {
        lat: 31.05,
        lng: -95.3198,
        name: '컬럼비아 우주 왕복선 공중 분해 사고',
        altitude: 1.0,
      }, // East Texas debris zone
      {
        lat: 21.3069,
        lng: -157.8583,
        name: '보잉 737 MAX 결함 사고',
        altitude: 0.9,
      }, // Representing Boeing HQ Maui-Waikiki area,
    ],
  },

  //관리 책임 부족
  responsibility: {
    countries: [
      'South Korea',
      'United States of America',
      'Japan',
      'India',
      'United Kingdom',
      'Norway',
      'Germany',
      'Yemen',
    ],
    hexPoints: [
      {
        lat: 35.4294,
        lng: 127.39,
        name: '남원역 열차 추돌사고',
        altitude: 0.85,
      },
      {
        lat: 37.2806,
        lng: 127.4417,
        name: '이천 냉동창고 화재사고',
        altitude: 0.85,
      },
      {
        lat: 37.5346,
        lng: 126.9949,
        name: '이태원 압사 사고',
        altitude: 0.95,
      },
      {
        lat: 35.6858,
        lng: 126.5981,
        name: '제 25회 세계 스카우트 잼버리 부실 운영',
        altitude: 0.8,
      },

      {
        lat: 41.9742,
        lng: -87.9073,
        name: '아메리칸 항공 191편 추락 사고',
        altitude: 1.0,
      },
      {
        lat: 35.5523,
        lng: 139.7798,
        name: '일본항공 350편 추락 사고',
        altitude: 0.95,
      },
      {
        lat: 36.2397,
        lng: 138.7158,
        name: '일본 항공 123편 추락 사고',
        altitude: 0.9,
      },
      {
        lat: 23.2599,
        lng: 77.4126,
        name: '보팔 가스 누출 사고',
        altitude: 0.9,
      },
      {
        lat: 53.402,
        lng: -1.5006,
        name: '힐스버러 참사',
        altitude: 0.95,
      },

      {
        lat: 69.4167,
        lng: 33.4167,
        name: '쿠르스크 함 침몰 사건',
        altitude: 0.85,
      },
      {
        lat: 47.5667,
        lng: 9.3667,
        name: '위버링겐 상공 공중 추돌 사고',
        altitude: 0.85,
      },
      {
        lat: 25.7907,
        lng: -80.13,
        name: '초크 오션 항공 101편 추락 사고',
        altitude: 0.85,
      },
      {
        lat: 51.4344,
        lng: 6.7623,
        name: '러브 퍼레이드 압사 참사',
        altitude: 0.85,
      },
      {
        lat: 15.3694,
        lng: 44.191,
        name: '예멘 압사 사고',
        altitude: 0.85,
      },
    ],
  },

  //과도이익 추구
  profit: {
    countries: [
      'South Korea',
      'United States of America',
      'Peru',
      'Spain',
      'Philippines',
      'Gambia',
      'Egypt',
    ],
    hexPoints: [
      {
        lat: 34.75,
        lng: 127.75,
        name: '남영호 침몰 사고',
        altitude: 1.0,
      },
      {
        lat: 34.45,
        lng: 126.32,
        name: '한성호 침몰 사고',
        altitude: 1.5,
      },
      {
        lat: 34.85,
        lng: 128.43,
        name: '통영 YTL 30호 침몰 사건',
        altitude: 0.85,
      },
      {
        lat: 35.72,
        lng: 126.32,
        name: '서해훼리호 침몰 사고',
        altitude: 0.9,
      },
      {
        lat: 34.24,
        lng: 125.96,
        name: '청해진해운 세월호 침몰 사고',
        altitude: 0.95,
      },
      {
        lat: 41.8781,
        lng: -87.6298,
        name: '이스트랜드호 참사',
        altitude: 0.8,
      },
      {
        lat: -12.0821,
        lng: -77.0338,
        name: 'LANSA 508편 추락 사고',
        altitude: 0.95,
      },
      {
        lat: 40.6132,
        lng: 0.6226,
        name: '로스 알파케스 참사',
        altitude: 0.9,
      },
      {
        lat: 38.9656,
        lng: -0.1794,
        name: '도냐 파츠호 침몰 사고',
        altitude: 0.9,
      },
      {
        lat: 25.995,
        lng: -80.2406,
        name: '벨류젯 592편 추락 사고',
        altitude: 0.85,
      },
      {
        lat: 15.0,
        lng: -17.0,
        name: '르 줄라호 침몰 사고',
        altitude: 0.85,
      },
      {
        lat: 27.2579,
        lng: 33.8116,
        name: '알 살람 보카치오 98호 침몰 사고',
        altitude: 0.8,
      },
    ],
  },
};

// ✅ 버튼 클릭 이벤트 처리
document.querySelectorAll('#case-menu button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    const { countries, hexPoints } = fullDataset[type];

    currentCountries = countries;
    countries.forEach((c) => {
      countryAltitudes[c] = 0.7 + Math.random() * 0.3;
    });

    const descBox = document.getElementById('type-description');
    if (descBox && typeDescriptions[type]) {
      descBox.innerText = typeDescriptions[type];
    }

    // GeoJSON 불러와서 국가 강조
    fetch('./style/countries.geojson')
      .then((res) => res.json())
      .then((geo) => {
        const filtered = geo.features.filter((feat) =>
          currentCountries.includes(feat.properties.name)
        );
        world.polygonsData(filtered);
      });

    // 헥사곤 데이터 적용
    world.hexPolygonsData([]); // 먼저 클리어

    setTimeout(() => {
      world.hexPolygonsData(
        hexPoints.map((d) => ({
          type: 'Feature',
          properties: { name: d.name, altitude: d.altitude },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [d.lng - 0.5, d.lat - 0.5],
                [d.lng + 0.5, d.lat - 0.5],
                [d.lng + 0.5, d.lat + 0.5],
                [d.lng - 0.5, d.lat + 0.5],
                [d.lng - 0.5, d.lat - 0.5],
              ],
            ],
          },
        }))
      );
    }, 0);

    // 버튼 활성화 토글
    document
      .querySelectorAll('#case-menu button')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ✅ 첫 유형 자동 실행
document.querySelector('#case-menu button')?.click();

// countryHexGlobe.js 하단에 추가
document
  .querySelector('#popup #popup-content')
  .addEventListener('click', () => {
    openDetailPopup(
      '이건 상세 설명입니다. 더 자세한 정보가 나와요.',
      'image_path.png'
    );
  });
