// // 360도 뷰어 테스트 공간
// // script.js;

// // 'your-image.jpg' 파일을 사용하여 파노라마 이미지 생성
// const panorama = new PANOLENS.ImagePanorama(
//   './assets/images/panoramaTest3.jpg'
// );

// // Panolens 뷰어 생성
// const viewer = new PANOLENS.Viewer({
//   container: document.querySelector('#container'),
//   autoRotate: false, // 자동 회전 사용 여부
//   autoRotateSpeed: 0.3, // 회전 속도 (조정 가능)
//   controlBar: true, // 컨트롤 바 표시 여부
// });

// // 뷰어에 파노라마 추가
// viewer.add(panorama);

// // 360도 씬 이미지 배열
// // 360도 이미지 배열
// === 초기 뷰어 설정 ===

const container = document.querySelector('#container');

// Panolens 뷰어 생성
const viewer = new PANOLENS.Viewer({
  container: container,
  autoRotate: false,
  autoRotateSpeed: 0.3,
  controlBar: true,
});

// === 360도 이미지와 캡션 배열 ===
const scenes = [
  {
    image: '../assets/panoramaTest/_ferry3.webp',
    caption: '',
  },
  {
    image: './assets/images/panoramaTest2.jpg',
    caption: '정상 영업중인 백화점',
  },
  {
    image: './assets/images/panoramaTest3.jpg',
    caption: '처참한 모습',
  },
];

let currentScene = 0;
let currentPanorama = null;

// === 캡션 생성 ===
const captionEl = document.createElement('div');
captionEl.style.position = 'absolute';
captionEl.style.bottom = '60px';
captionEl.style.width = '100%';
captionEl.style.textAlign = 'center';
captionEl.style.color = '#fff';
captionEl.style.fontSize = '18px';
captionEl.style.fontFamily = 'Arial, sans-serif';
captionEl.style.textShadow = '0 0 5px black';
captionEl.innerText = scenes[currentScene].caption;
document.body.appendChild(captionEl);

// === 다음 버튼 생성 ===
const nextBtn = document.createElement('button');
nextBtn.innerText = '다음 ▶';
nextBtn.style.position = 'absolute';
nextBtn.style.bottom = '20px';
nextBtn.style.right = '20px';
nextBtn.style.padding = '10px 18px';
nextBtn.style.background = '#f44';
nextBtn.style.color = '#fff';
nextBtn.style.border = 'none';
nextBtn.style.borderRadius = '6px';
nextBtn.style.cursor = 'pointer';
nextBtn.style.fontWeight = 'bold';
document.body.appendChild(nextBtn);

// === 파노라마 씬 로드 함수 ===
function loadScene(index) {
  const { image, caption } = scenes[index];
  const newPanorama = new PANOLENS.ImagePanorama(image);

  // 미리 캡션 세팅
  captionEl.innerText = caption;

  // 이전 파노라마 제거
  if (currentPanorama) {
    viewer.remove(currentPanorama);
    currentPanorama.dispose();
  }

  // 미리 viewer에 추가 (💡 핵심!)
  viewer.add(newPanorama);
  currentPanorama = newPanorama;

  // 로딩 성공 이벤트
  newPanorama.addEventListener('load', () => {
    console.log('✅ Panorama loaded:', image);
  });

  // 로딩 실패 이벤트
  newPanorama.addEventListener('error', (event) => {
    console.error('❌ 로딩 실패:', image);
    console.error('🔍 에러 이벤트:', event);
    captionEl.innerText = '⚠️ 이미지를 불러올 수 없습니다';
  });
}

// === 버튼 클릭 시 다음 씬 로딩 ===
nextBtn.addEventListener('click', () => {
  currentScene = (currentScene + 1) % scenes.length;
  loadScene(currentScene);
});

// === 첫 번째 씬 로딩 ===
loadScene(currentScene);
