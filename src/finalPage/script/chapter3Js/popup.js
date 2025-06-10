import { popupData } from './popupData.js';

let isDetailOpen = false;

export function openPopup(caseName, headlineText = '전조 사례 등록 예정') {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('popup-overlay');
  const header = popup.querySelector('.popup-header');
  const body = popup.querySelector('.popup-body');

  if (!popup || !overlay || !header || !body) return;

  popup.classList.remove('detail-open');
  popup.style.display = 'flex';
  overlay.style.display = 'block';
  header.style.display = 'none';
  isDetailOpen = false;

  body.innerHTML = '';
  const contentWrap = document.createElement('div');
  contentWrap.className = 'popup-content-wrap';
  body.appendChild(contentWrap);

  const headlineEl = document.createElement('p');
  headlineEl.className = 'headline-only';
  headlineEl.textContent = headlineText;
  headlineEl.style.cursor = 'pointer';

  headlineEl.addEventListener('click', () => {
    if (!isDetailOpen) {
      const data = popupData[caseName];
      openDetailPopup(caseName, data?.detail, data?.image);
    }
  });

  contentWrap.appendChild(headlineEl);
}

function openDetailPopup(title, fullText = '', imageUrl = '') {
  const popup = document.getElementById('popup');
  const header = popup.querySelector('.popup-header');
  const body = popup.querySelector('.popup-body');

  if (!popup || !header || !body) return;

  popup.classList.add('detail-open');
  isDetailOpen = true;

  const formattedText = (fullText || '상세 설명이 없습니다.').replace(
    /(①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩)\s*([^\n]+)/g,
    '<span class="section-title">$1 $2</span>'
  );

  body.innerHTML = '';
  const contentWrap = document.createElement('div');
  contentWrap.className = 'popup-content-wrap';
  body.appendChild(contentWrap);

  const scrollBox = document.createElement('div');
  scrollBox.className = 'scroll-box';

  const textEl = document.createElement('p');
  textEl.className = 'headline';
  textEl.innerHTML = formattedText;
  scrollBox.appendChild(textEl);

  const imageArea = document.createElement('div');
  imageArea.className = 'popup-image-area';

  if (imageUrl) {
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      if (ratio < 1) {
        contentWrap.classList.add('horizontal');
      }
    };
    img.src = imageUrl;
    img.alt = '상세 이미지';
    imageArea.appendChild(img);
  } else {
    imageArea.innerHTML = '<span>이미지가 없습니다</span>';
  }

  header.style.display = 'block';
  header.querySelector('.country').textContent = title;

  contentWrap.appendChild(scrollBox);
  contentWrap.appendChild(imageArea);
}

export function closePopup() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('popup-overlay');
  if (!popup || !overlay) return;

  popup.style.display = 'none';
  overlay.style.display = 'none';
  popup.classList.remove('popup-open', 'detail-open');
  isDetailOpen = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('popup-overlay');
  const closeBtn = document.getElementById('popup-close-btn');

  overlay?.addEventListener('click', closePopup);
  closeBtn?.addEventListener('click', closePopup);
});
