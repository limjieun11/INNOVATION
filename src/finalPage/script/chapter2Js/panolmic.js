// === Panolens Viewer 생성 ===
const container = document.querySelector('#container');
const viewer = new PANOLENS.Viewer({
  container: container,
  autoRotate: false,
  autoRotateSpeed: 0.3,
  controlBar: true,
});

// === 씬 배열 정의 (이스터에그 위치 포함) ===
const scenes = [
  {
    image: '../assets/panoramaTest/room_final2.webp',
    caption: '4월 16일 나의 방',
    hasEgg: false,
  },
  {
    image: '../assets/panoramaTest/SubwayStation01.webp',
    caption: '지하철',
    hasEgg: true,
    eggPosition: { x: 4500, y: -1900, z: 2000 },
  },
  {
    image: '../assets/panoramaTest/_departmentstore.webp',
    caption: '백화점',
    hasEgg: true,
    eggPosition: { x: -4000, y: 2500, z: -1900 },
  },
  {
    image: '../assets/panoramaTest/_ferry3.webp',
    caption: '여객선 복도',
    hasEgg: true,
    eggPosition: { x: -5000, y: -50, z: 5000 },
  },
];

let currentScene = 0;
let currentPanorama = null;

// === 캡션 엘리먼트 생성 ===
const captionEl = document.createElement('div');
captionEl.innerText = scenes[currentScene].caption;

Object.assign(captionEl.style, {
  position: 'fixed',
  top: '165px',
  left: '380px',
  fontFamily: 'Noto Sans KR, sans-serif',
  fontSize: '15px',
  fontWeight: '400',
  color: '#222',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '4px 10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  zIndex: '9999',
  opacity: '0',
  transform: 'translateY(-4px)',
  transition: 'all 0.4s ease',
});
document.body.appendChild(captionEl);

// === 다음 버튼 생성 ===
const nextBtn = document.createElement('button');
nextBtn.innerText = '다음 ▶';

Object.assign(nextBtn.style, {
  position: 'fixed',
  top: '110px',
  right: '145px',
  background: '#ffffff',
  color: '#000000',
  padding: '8px 16px',
  border: '1.5px solid #000000',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  zIndex: '9999',
  boxShadow: '0 2px 6px rgba(0 0 0 / 10%)',
  transition: 'all 0.2s ease',
});
nextBtn.addEventListener('mouseover', () => {
  nextBtn.style.backgroundColor = '#000';
  nextBtn.style.color = '#fff';
});
nextBtn.addEventListener('mouseout', () => {
  nextBtn.style.backgroundColor = '#fff';
  nextBtn.style.color = '#000';
});
document.body.appendChild(nextBtn);

// === 파노라마 로딩 함수 ===
function loadScene(index) {
  const { image, caption, hasEgg, eggPosition } = scenes[index];
  const newPanorama = new PANOLENS.ImagePanorama(image);

  // 캡션 애니메이션
  captionEl.innerText = caption;
  captionEl.style.opacity = '0';
  captionEl.style.transform = 'translateY(-4px)';
  requestAnimationFrame(() => {
    captionEl.style.opacity = '1';
    captionEl.style.transform = 'translateY(0)';
  });

  // 기존 파노라마 제거
  if (currentPanorama && typeof currentPanorama.dispose === 'function') {
    viewer.remove(currentPanorama);
    currentPanorama.dispose();
  }

  // 이스터에그 추가
  if (hasEgg && eggPosition) {
    const egg = new PANOLENS.Infospot(
      150,
      '/src/finalPage/assets/png/투명.png'
    ); // ✅ 투명 아이콘 적용
    egg.position.set(eggPosition.x, eggPosition.y, eggPosition.z);

    egg.addEventListener('click', () => {
      window.location.href = '/src/finalPage/chapter/chapter2Escape.html';
    });

    egg.addEventListener('ready', () => {
      if (egg.element) {
        egg.element.style.opacity = '0';
        egg.element.style.pointerEvents = 'auto';
        egg.element.style.width = '1px';
        egg.element.style.height = '1px';
      }
    });

    newPanorama.add(egg);
  }

  viewer.add(newPanorama);
  currentPanorama = newPanorama;
}

// === 다음 버튼 클릭 시 씬 순환
nextBtn.addEventListener('click', () => {
  currentScene = (currentScene + 1) % scenes.length;
  loadScene(currentScene);
});

// === 첫 번째 씬 로딩
loadScene(currentScene);
