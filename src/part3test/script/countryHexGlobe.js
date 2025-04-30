import { openPopup } from './popup.js';

// 🎯 타겟 국가 리스트
const targetCountries = [
  'South Korea',
  'Japan',
  'United States',
  'France',
  'Germany',
  'China',
  'United Kingdom',
  'Canada',
  'Australia',
  'Brazil',
];

// 🎯 국가별 고정 높이 지정
const countryAltitudes = {
  'South Korea': 0.7,
  Japan: 0.5,
  'United States': 0.6,
  France: 0.4,
  Germany: 0.3,
  China: 0.8,
  'United Kingdom': 0.5,
  Canada: 0.6,
  Australia: 0.7,
  Brazil: 0.4,
};

// 🎯 헥사곤 포인트 (lat, lng, name, altitude 포함)
const hexPoints = [
  { lat: 37.5, lng: 127.0, name: '서울', altitude: 0.72 },
  { lat: 35.7, lng: 139.7, name: '도쿄', altitude: 1.0 },
  { lat: 40.7128, lng: -74.006, name: '뉴욕', altitude: 1.1 },
  { lat: 48.8566, lng: 2.3522, name: '파리', altitude: 0.9 },
  { lat: 51.5, lng: -0.1, name: '런던', altitude: 1.3 },
];

// 🌎 지구본 생성
//Image courtesy of NASA's Visible Earth
const world = Globe()(document.getElementById('globe-container'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .backgroundColor('#f1f1')
  .showAtmosphere(true) // ← 경계 빛 켜기
  .atmosphereColor('#3399ff') // ← 파란색 빛
  .atmosphereAltitude(0.25); // ← 퍼지는 두께 설정

// ✅ 국가 폴리곤 설정 (빨간색, 고정 높이)
world
  .polygonsTransitionDuration(300)
  .polygonCapColor((feat) =>
    targetCountries.includes(feat.properties.name)
      ? 'red'
      : 'rgba(8, 0, 255, 0)'
  )
  .polygonAltitude((feat) => countryAltitudes[feat.properties.name] || 0)
  .polygonSideColor(() => 'rgba(4, 0, 255, 0.3)')
  .polygonStrokeColor(() => '#111')

  // ✅ 헥사곤 설정 (하얀색, 개별 높이)
  .hexPolygonsData(
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
  )
  .hexPolygonColor(() => '#005')
  .hexPolygonAltitude((d) => d.properties.altitude || 0.71)
  .onHexPolygonClick((hex) => {
    const props = hex.properties;
    openPopup(props.name, '전조 사례 등록 예정');
  });

// 🗺 국가 경계선 데이터 불러오기
fetch('../../assets/countries.geojson')
  .then((res) => res.json())
  .then((countries) => {
    const filtered = countries.features.filter((feat) =>
      targetCountries.includes(feat.properties.name)
    );
    world.polygonsData(filtered);
  });

// 🌍 카메라 자동 회전
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.3;
