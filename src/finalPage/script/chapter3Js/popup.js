let isDetailOpen = false;

export function openPopup(
  headline,
  detailText = '전조 사례 등록 예정',
  address = '',
  imageUrl = ''
) {
  const popup = document.getElementById('popup');
  const header = document.querySelector('#popup .popup-header');
  const body = document.querySelector('#popup .popup-body');

  if (!popup || !header || !body) return;

  // 헤드라인용 기본 뷰 세팅
  header.innerHTML = `<h2 class="country">${headline}</h2>`;
  body.innerHTML = `
    <p class="headline" id="popup-headline-text">${detailText}</p>
    <p class="address">${address}</p>
  `;
  popup.style.display = 'flex';
  isDetailOpen = false;

  // 클릭 이벤트 덮어쓰기 (한 번만 바인딩되게)
  setTimeout(() => {
    const headlineEl = document.getElementById('popup-headline-text');
    if (headlineEl) {
      headlineEl.style.cursor = 'pointer';
      headlineEl.addEventListener('click', () => {
        if (!isDetailOpen) {
          openDetailPopup(headline, '여기가 상세 설명입니다.', imageUrl);
        }
      });
    }
  }, 0);
}

function openDetailPopup(title, fullText, imageUrl = '') {
  const popup = document.getElementById('popup');
  const header = document.querySelector('#popup .popup-header');
  const body = document.querySelector('#popup .popup-body');

  if (!popup || !header || !body) return;

  header.innerHTML = `<h2 class="country">${title}</h2>`;

  body.innerHTML = `
    <p class="headline">${fullText}</p>
    <div class="popup-image-area">
      ${
        imageUrl
          ? `<img src="${imageUrl}" alt="상세 이미지">`
          : '<span>이미지가 아직 없습니다</span>'
      }
    </div>
  `;

  isDetailOpen = true;
  popup.style.display = 'block'; // 혹시 누락되었으면
}
