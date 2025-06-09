import { popupData } from './popupData.js';

let isDetailOpen = false;

// 팝업 열기 함수 (기본 헤드라인 모드)
export function openPopup(
  caseName,
  headlineText = '전조 사례 등록 예정',
  address = '',
  imageUrl = ''
) {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('popup-overlay');
  const header = popup?.querySelector('.popup-header');
  const body = popup?.querySelector('.popup-body');

  if (!popup || !header || !body || !overlay) return;

  // 초기화
  popup.classList.remove('detail-open');
  popup.classList.add('popup-open');
  isDetailOpen = false;

  // 헤더 제거
  header.innerHTML = '';

  // 본문에 헤드라인 텍스트만 삽입
  body.innerHTML = `
    <p class="headline-only" id="popup-headline-text">${headlineText}</p>
  `;

  // 팝업 및 오버레이 표시
  popup.style.display = 'flex';
  overlay.style.display = 'block';

  // 헤드라인 클릭 이벤트 연결
  setTimeout(() => {
    const headlineEl = document.getElementById('popup-headline-text');
    if (headlineEl) {
      headlineEl.style.cursor = 'pointer';
      headlineEl.addEventListener('click', () => {
        if (!isDetailOpen) {
          const data = popupData[caseName];
          const detailText = data?.detail || '상세 설명이 없습니다.';
          const detailImage = data?.image || '';
          openDetailPopup(caseName, detailText, detailImage);
        }
      });
    }
  }, 0);
}

// 상세 팝업 전환 함수
function openDetailPopup(title, fullText, imageUrl = '') {
  const popup = document.getElementById('popup');
  const header = popup?.querySelector('.popup-header');
  const body = popup?.querySelector('.popup-body');

  if (!popup || !header || !body) return;

  popup.classList.add('detail-open');
  isDetailOpen = true;

  // 타이틀 강조 처리
  const formattedText = fullText.replace(
    /(①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩)\s*([^\n]+)/g,
    `<span class="section-title">$1 $2</span>`
  );

  // 콘텐츠 삽입
  header.innerHTML = `<h2 class="country">${title}</h2>`;
  body.innerHTML = `
    <p class="headline">${formattedText}</p>
    <div class="popup-image-area">
      ${
        imageUrl
          ? `<img src="${imageUrl}" alt="상세 이미지">`
          : '<span>이미지가 아직 없습니다</span>'
      }
    </div>
  `;
}

// 팝업 닫기 함수 (외부에서 호출 가능)
export function closePopup() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('popup-overlay');
  if (!popup || !overlay) return;

  popup.style.display = 'none';
  overlay.style.display = 'none';
  popup.classList.remove('popup-open');
  popup.classList.remove('detail-open');
  isDetailOpen = false;
}

// 오버레이 클릭 시 팝업 닫기 이벤트 연결
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('popup-overlay');
  if (overlay) {
    overlay.addEventListener('click', closePopup);
  }

  const closeBtn = document.getElementById('popup-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }
});
