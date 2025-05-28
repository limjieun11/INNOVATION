import { openPopup } from './popup.js';
import { popupData } from './popupData.js';

const globeContainer = document.getElementById('globe-container');

// 🌐 Globe 초기화
const world = Globe()(globeContainer)
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
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
    countries: [
      'South Korea',
      'United States',
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
      { lat: 36.815, lng: 127.119, name: '천안 열차', altitude: 0.85 },
      { lat: 35.211, lng: 128.56, name: '모산 수학여행', altitude: 0.85 },
      { lat: 37.342, lng: 127.95, name: '원주터널 열차', altitude: 0.9 },
      { lat: 37.524, lng: 126.97, name: '이리역 폭발', altitude: 0.9 },
      { lat: 35.838, lng: 128.737, name: '경산 열차', altitude: 0.8 },
      { lat: 35.423, lng: 127.595, name: '천호대교 버스', altitude: 0.85 },
      { lat: 35.314, lng: 127.729, name: '지리산 폭우', altitude: 0.8 },
      { lat: 35.879, lng: 128.628, name: '대구 지하철', altitude: 0.95 },
      { lat: 36.991, lng: 127.112, name: '평택 크레인', altitude: 0.85 },
      { lat: 35.693, lng: 129.051, name: '언양 분기점 화재', altitude: 0.85 },
      { lat: 37.652, lng: 126.794, name: '안철수 유세버스', altitude: 0.85 },

      // 미국
      { lat: 44.9778, lng: -93.265, name: '펨버톤 대화재', altitude: 1.0 },
      { lat: 40.7128, lng: -74.006, name: '트라이앵글 화재', altitude: 1.0 },
      { lat: 32.7767, lng: -96.797, name: '샌디에이고 항공', altitude: 1.0 },
      { lat: 38.9072, lng: -77.0369, name: '닉슨보거 극장', altitude: 1.0 },
      { lat: 28.5383, lng: -81.3792, name: '플로리다', altitude: 0.95 },
      { lat: 39.7392, lng: -104.9903, name: '덴버 디스코', altitude: 0.95 },
      { lat: 30.3322, lng: -81.6557, name: '잭슨빌 호텔', altitude: 0.95 },
      { lat: 39.0997, lng: -94.5786, name: '캔자스시티', altitude: 1.0 },

      // 기타 국가
      { lat: 25.0343, lng: -77.3963, name: '바하마 화재', altitude: 1.0 },
      { lat: 21.0285, lng: 105.8542, name: '베트남 사고', altitude: 0.9 },
      { lat: 40.4168, lng: -3.7038, name: '스페인 로스레테오', altitude: 0.9 },
      { lat: 50.4501, lng: 30.5234, name: '우크라이나 브리유', altitude: 0.9 },
      { lat: 55.7558, lng: 37.6173, name: '러시아 페름', altitude: 1.0 },
      { lat: 50.8503, lng: 4.3517, name: '벨기에 참사', altitude: 0.9 },
      { lat: 51.1657, lng: 10.4515, name: '독일 참사', altitude: 1.0 },
      { lat: 13.7563, lng: 100.5018, name: '방콕 쑤완나품', altitude: 1.0 },
      { lat: 59.3293, lng: 18.0686, name: '스웨덴 에테보리', altitude: 1.0 },
      { lat: -23.4425, lng: -58.4438, name: '파라과이 야순', altitude: 0.9 },
      { lat: -0.7893, lng: 113.9213, name: '인도네시아', altitude: 1.0 },
      { lat: 41.9028, lng: 12.4964, name: '이탈리아 제노바', altitude: 1.0 },
      { lat: 33.6844, lng: 73.0479, name: '파키스탄 카라치', altitude: 0.95 },
      { lat: -14.235, lng: -51.9253, name: '브라질', altitude: 0.95 },
      { lat: 33.3128, lng: 44.3615, name: '이라크 바그다드', altitude: 0.95 },

      // 여분 처리 (예: 명확한 좌표 없을 시 수도 또는 중심도시 기준)
      { lat: 35.6895, lng: 139.6917, name: '도쿄 사고', altitude: 0.95 },
      { lat: 51.5072, lng: -0.1276, name: '런던 사고', altitude: 1.0 },
      { lat: 28.6139, lng: 77.209, name: '인도 뉴델리', altitude: 0.95 },
    ],
  },
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
      // 🇰🇷 대한민국 - 13건
      { lat: 36.5563, lng: 126.9411, name: '와우아파트 붕괴', altitude: 0.9 },
      { lat: 35.5702, lng: 126.9918, name: '시민회관 화재', altitude: 0.85 },
      {
        lat: 36.4945,
        lng: 127.0274,
        name: '번데기 식중독 사건',
        altitude: 0.73,
      },
      {
        lat: 35.1796,
        lng: 129.0756,
        name: '부산 대화호텔 화재',
        altitude: 0.85,
      },
      { lat: 39.5499, lng: 127.0557, name: '성수대교 붕괴', altitude: 0.9 },
      { lat: 39.515, lng: 127.032, name: '삼풍백화점 붕괴', altitude: 1.2 },
      {
        lat: 37.1967,
        lng: 126.8315,
        name: '씨랜드 청소년 화재',
        altitude: 1.11,
      },
      {
        lat: 37.4718,
        lng: 126.6458,
        name: '인현동 호프집 화재',
        altitude: 0.98,
      },
      { lat: 34.39, lng: 127.1266, name: '한풍구 붕괴', altitude: 0.9 },
      {
        lat: 40.8078,
        lng: 127.1458,
        name: '제천 스포츠센터 화재',
        altitude: 0.86,
      },
      {
        lat: 34.1653,
        lng: 126.8484,
        name: '광주 철거건물 붕괴',
        altitude: 0.91,
      },
      {
        lat: 37.275,
        lng: 127.4228,
        name: '이천 쿠팡 물류센터 화재',
        altitude: 1.0,
      },
      {
        lat: 35.1321,
        lng: 126.7937,
        name: '광주 아이파크 붕괴',
        altitude: 0.93,
      },

      // 🇺🇸 미국
      { lat: 42.2391, lng: -71.7201, name: '펨버트 공장 화재', altitude: 0.85 },
      {
        lat: 25.7617,
        lng: -80.1918,
        name: '플로리다 콘도 붕괴',
        altitude: 0.92,
      },
      {
        lat: 38.8951,
        lng: -77.0364,
        name: '니커보커 극장 붕괴',
        altitude: 0.84,
      },
      {
        lat: 39.0997,
        lng: -94.5786,
        name: '하얏트 캔자스시티 붕괴',
        altitude: 0.85,
      },
      {
        lat: 44.9778,
        lng: -93.265,
        name: '미시시피강 교량 붕괴',
        altitude: 0.85,
      },
      {
        lat: 25.7743,
        lng: -80.1937,
        name: '챔플레인 타워 붕괴',
        altitude: 0.86,
      },

      // 🇮🇹 이탈리아
      { lat: 46.2787, lng: 12.2986, name: '바이온트 댐 붕괴', altitude: 0.9 },
      { lat: 44.4056, lng: 8.9463, name: '제노바 교량 붕괴', altitude: 0.92 },

      // 🇬🇧 영국
      { lat: 51.5219, lng: -0.1337, name: '그렌펠 타워 화재', altitude: 0.9 },
      {
        lat: 51.5074,
        lng: -0.1278,
        name: '런던 킹스크로스 화재',
        altitude: 0.85,
      },

      // 🇯🇵 일본
      {
        lat: 34.6937,
        lng: 135.5023,
        name: '센니치 백화점 화재',
        altitude: 0.85,
      },

      // 🇧🇷 브라질
      {
        lat: -23.5505,
        lng: -46.6333,
        name: '조엘마 빌딩 화재',
        altitude: 0.88,
      },

      // 🇷🇺 러시아 (소련)
      { lat: 54.3296, lng: 55.9578, name: '우파 철도 참사', altitude: 0.9 },

      // 🇫🇷 프랑스
      { lat: 41.9268, lng: 8.7369, name: '아르망세사리 화재', altitude: 0.86 },

      // 🇹🇭 태국
      {
        lat: 13.7563,
        lng: 100.5018,
        name: '로얄 플라자 호텔 붕괴',
        altitude: 0.84,
      },

      // 🇩🇪 독일
      { lat: 50.7374, lng: 7.0982, name: '쾰른 건물 붕괴', altitude: 0.86 },

      // 🇦🇹 오스트리아
      { lat: 47.2635, lng: 12.7585, name: '카프룬 터널 화재', altitude: 0.85 },

      // 🇵🇹 포르투갈
      { lat: 41.1496, lng: -8.6109, name: '도로강 교량 붕괴', altitude: 0.85 },

      // 🇮🇱 이스라엘
      {
        lat: 31.7683,
        lng: 35.2137,
        name: '예루살렘 결혼식장 붕괴',
        altitude: 0.87,
      },

      // 🇵🇱 폴란드
      {
        lat: 50.2701,
        lng: 18.9591,
        name: '카토비체 전시장 붕괴',
        altitude: 0.84,
      },

      // 🇧🇩 방글라데시
      {
        lat: 23.8103,
        lng: 90.4125,
        name: '르잉가르 호텔 침몰',
        altitude: 0.83,
      },

      // 🇨🇳 중국
      { lat: 38.914, lng: 121.6147, name: '텅팡조싱 침몰', altitude: 0.86 },
      { lat: 39.3434, lng: 117.3616, name: '텐진 항구 폭발', altitude: 0.88 },

      // 🇸🇦 사우디아라비아
      { lat: 21.4225, lng: 39.8262, name: '메카 크레인 붕괴', altitude: 0.87 },

      // 🇱🇧 레바논
      {
        lat: 33.8938,
        lng: 35.5018,
        name: '베이루트 항구 폭발',
        altitude: 0.91,
      },

      // 🇲🇽 멕시코
      {
        lat: 19.4326,
        lng: -99.1332,
        name: '멕시코 지하철 붕괴',
        altitude: 0.87,
      },

      // 🇮🇳 인도
      {
        lat: 22.3039,
        lng: 70.8022,
        name: '구자라트 다리 붕괴',
        altitude: 0.88,
      },
    ],
  },
  perception: {
    countries: ['South Korea', 'United States of America', 'Canada', 'France'],
    hexPoints: [
      { lat: 37.565, lng: 125.9784, name: '성수대교 붕괴', altitude: 0.8 },
      { lat: 37.515, lng: 126.032, name: '삼풍백화점 붕괴', altitude: 0.9 },
      { lat: 34.2543, lng: 126.5708, name: '세월호 침몰', altitude: 0.95 },
      { lat: 45.4215, lng: -75.6972, name: '항공 96편 사고', altitude: 0.8 },
      { lat: 48.9111, lng: 2.3911, name: '981편 추락 사고', altitude: 0.9 },
      { lat: 28.5721, lng: -80.648, name: '챌린저 폭발', altitude: 1.0 },
      { lat: 32.7767, lng: -96.797, name: '737 MAX 결함', altitude: 0.9 },
    ],
  },
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
      { lat: 34.4169, lng: 127.385, name: '남원역 추돌사고', altitude: 0.85 },
      { lat: 37.2806, lng: 127.4417, name: '이천 화재 사고', altitude: 0.85 },
      { lat: 38.5346, lng: 126.9949, name: '이태원 압사 사고', altitude: 0.95 },
      { lat: 35.6858, lng: 126.5981, name: '잼버리 부실 운영', altitude: 0.8 },

      { lat: 41.9742, lng: -87.9073, name: '191편 추락', altitude: 1.0 },
      { lat: 25.7907, lng: -80.13, name: '101편 추락', altitude: 0.95 },
      { lat: 23.2599, lng: 77.4126, name: '보팔 사고', altitude: 0.9 },

      { lat: 35.552, lng: 139.716, name: 'JAL350편', altitude: 0.9 },
      { lat: 36.0603, lng: 138.7672, name: 'JAL123편', altitude: 0.95 },

      { lat: 53.402, lng: -1.5006, name: '힐스버러 참사', altitude: 0.85 },
      { lat: 70.0, lng: 37.0, name: '쿠르스크함 침몰', altitude: 0.85 },

      { lat: 47.77, lng: 9.1667, name: '공중충돌 사고', altitude: 0.85 },
      { lat: 51.4344, lng: 6.7623, name: '러브퍼레이드 압사', altitude: 0.85 },

      { lat: 15.3694, lng: 44.191, name: '예멘 압사 사고', altitude: 0.85 },
    ],
  },
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
      { lat: 34.75, lng: 127.75, name: '남영호 침몰', altitude: 0.6 },
      { lat: 34.45, lng: 126.32, name: '한성호 침몰', altitude: 0.65 },
      { lat: 34.85, lng: 128.43, name: 'YTL30호 침몰', altitude: 0.75 },
      { lat: 35.72, lng: 126.32, name: '서해훼리호 침몰', altitude: 0.5 },
      { lat: 34.25, lng: 126.57, name: '세월호 침몰', altitude: 0.65 },

      { lat: 41.8781, lng: -87.6298, name: '이스트랜드호 침몰', altitude: 0.8 },
      {
        lat: 25.7617,
        lng: -80.1918,
        name: '밸류젯 592편 추락',
        altitude: 0.75,
      },

      { lat: -8.3791, lng: -74.5539, name: 'LANSA 508편 추락', altitude: 0.7 },

      { lat: 41.1189, lng: 1.2445, name: '로스 알파케스 참사', altitude: 0.7 },

      { lat: 13.0, lng: 122.0, name: '도냐 파츠호 침몰', altitude: 0.65 },

      { lat: 13.45, lng: -16.58, name: '르 졸라호 침몰', altitude: 0.65 },

      {
        lat: 27.2579,
        lng: 33.8116,
        name: '알살람 보카치오 침몰',
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
    fetch('../assets/countries.geojson')
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
