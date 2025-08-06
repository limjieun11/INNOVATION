import { popupOpen } from './popup.js';
import { popupImgData } from './popupImgData.js';

// Globe 생성
const globeContainer = document.getElementById('globe-container');
const world = Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
  .hexPolygonResolution(3)
  .hexPolygonMargin(0.3)
  .showAtmosphere(true)
  .atmosphereColor('lightskyblue')
  .hexPolygonColor(() => 'rgba(255, 255, 255, 0.4)')
  .onHexPolygonClick(handleHexClick);

world(globeContainer);

// 초기 데이터
let currentData = [];
setHexData('rule');

// 버튼 이벤트
document.querySelectorAll('#type-buttons button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-type');
    setHexData(type);
  });
});

// 헥사곤 데이터 설정
function setHexData(type) {
  import(`./hexData_${type}.js`).then((module) => {
    currentData = module.default;
    world.hexPolygonsData(currentData);
  });
}

// 헥사곤 클릭 핸들러
function handleHexClick(hex) {
  const title = hex.name;
  const imgSrc = popupImgData[title];
  if (imgSrc) {
    popupOpen(title, imgSrc);
  }
}
