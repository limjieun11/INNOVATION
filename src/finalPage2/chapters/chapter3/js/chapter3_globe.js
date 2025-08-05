// ✅ 기본 Globe.js 초기화
const world = Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .hexPolygonsData([])
  .hexPolygonResolution(3)
  .hexPolygonMargin(0.3)
  .hexPolygonColor(() => 'rgba(0, 255, 255, 0.5)') // 청록색 반투명
  .backgroundColor('rgba(0, 0, 0, 1)'); // 배경 검정

// ✅ HTML 요소에 지구 붙이기
const container = document.getElementById('globe-container');
world(container);

// ✅ 테스트용 헥사곤 데이터
const testHexData = [
  { lat: 37.5665, lng: 126.978, altitude: 0.3, name: '서울' },
  { lat: 35.6895, lng: 139.6917, altitude: 0.3, name: '도쿄' },
  { lat: 40.7128, lng: -74.006, altitude: 0.3, name: '뉴욕' },
];

// ✅ 지구에 데이터 적용
world.hexPolygonsData(testHexData);
