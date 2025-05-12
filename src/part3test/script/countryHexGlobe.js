import { openPopup } from './popup.js';

const world = Globe()(document.getElementById('globe-container'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .backgroundColor('rgba(0,0,0,0)')
  .showAtmosphere(true)
  .atmosphereColor('#3399ff')
  .atmosphereAltitude(0.15)
  .polygonCapColor((feat) =>
    currentCountries.includes(feat.properties.name) ? 'red' : 'rgba(0,0,0,0)'
  )
  .polygonSideColor(() => 'rgba(66, 135, 80, 0.3)')
  .polygonStrokeColor(() => '#111')
  .polygonAltitude((feat) => countryAltitudes[feat.properties.name] || 0)
  .polygonsTransitionDuration(300)
  .hexPolygonColor(() => 'white')
  .hexPolygonAltitude((d) => d.properties.altitude || 0.1)
  .onHexPolygonClick((hex) =>
    openPopup(hex.properties.name, '전조 사례 등록 예정')
  );

// 📌 기본 변수
let currentCountries = [];
const countryAltitudes = {};

const fullDataset = {
  rule: {
    countries: ['South Korea', 'United States'],
    hexPoints: [
      { lat: 37.5, lng: 127.0, name: '서울', altitude: 0.8 },
      { lat: 40.7, lng: -74.0, name: '뉴욕', altitude: 1.1 },
    ],
  },
  build: {
    countries: ['Germany', 'China'],
    hexPoints: [
      { lat: 52.5, lng: 13.4, name: '베를린', altitude: 1.0 },
      { lat: 39.9, lng: 116.3, name: '베이징', altitude: 0.9 },
    ],
  },
  perception: {
    countries: ['France', 'Australia'],
    hexPoints: [
      { lat: 48.8, lng: 2.3, name: '파리', altitude: 0.95 },
      { lat: -33.9, lng: 151.2, name: '시드니', altitude: 0.7 },
    ],
  },
  responsibility: {
    countries: ['Canada', 'Brazil'],
    hexPoints: [
      { lat: 45.4, lng: -75.7, name: '오타와', altitude: 0.6 },
      { lat: -23.5, lng: -46.6, name: '상파울루', altitude: 0.9 },
    ],
  },
  profit: {
    countries: ['United Kingdom', 'Japan'],
    hexPoints: [
      { lat: 51.5, lng: -0.1, name: '런던', altitude: 1.0 },
      { lat: 35.7, lng: 139.7, name: '도쿄', altitude: 0.8 },
    ],
  },
};

// ✅ 버튼 클릭 이벤트
document.querySelectorAll('#case-menu button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    const { countries, hexPoints } = fullDataset[type];

    currentCountries = countries;
    countries.forEach(
      (c, i) => (countryAltitudes[c] = 0.7 + Math.random() * 0.3)
    ); // 높이 무작위

    // 폴리곤 로딩
    fetch('../../assets/countries.geojson')
      .then((res) => res.json())
      .then((geo) => {
        const filtered = geo.features.filter((feat) =>
          currentCountries.includes(feat.properties.name)
        );
        world.polygonsData(filtered);
      });

    // 헥사곤 적용
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

    // active 클래스 토글 (선택된 버튼 강조)
    document
      .querySelectorAll('#case-menu button')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ✅ 초기값 표시
document.querySelector('#case-menu button')?.click();

// 🎥 자동 회전
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.3;
