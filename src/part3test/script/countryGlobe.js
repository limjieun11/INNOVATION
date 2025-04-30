import { openPopup } from './popup.js';

const targetCountries = {
  'South Korea': 0.7,
  Japan: 0.4,
  'United States': 0.18,
  France: 0.07,
  Germany: 0.3,
  China: 0.27,
  'United Kingdom': 0.06,
  Canada: 0.13,
  Australia: 0.25,
  Brazil: 0.6,
};

const world = Globe()(document.getElementById('globe-container'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .backgroundColor('#000')
  .polygonCapColor((feat) =>
    targetCountries[feat.properties.name] ? 'red' : 'rgba(0,0,0,0)'
  )
  .polygonSideColor(() => 'rgba(255, 0, 0, 0.3)')
  .polygonStrokeColor(() => '#111')
  .polygonAltitude((feat) => targetCountries[feat.properties.name] || 0)
  .polygonsTransitionDuration(300)
  .onPolygonClick((polygon) => {
    if (targetCountries[polygon.properties.name]) {
      openPopup(polygon.properties.name, '전조 사례 등록 예정');
    }
  });

// 국가 데이터 불러오기
fetch('../../assets/countries.geojson')
  .then((res) => res.json())
  .then((countries) => {
    const filtered = countries.features.filter((feat) =>
      Object.keys(targetCountries).includes(feat.properties.name)
    );
    world.polygonsData(filtered);
  });

// 카메라 회전
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.3;
