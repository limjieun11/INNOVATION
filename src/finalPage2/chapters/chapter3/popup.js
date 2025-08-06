// 팝업 요소 참조
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupImage = document.getElementById('popup-image');
const popupCloseBtn = document.getElementById('popup-close');

// 팝업 열기 함수
export function popupOpen(title, imgSrc) {
  popupTitle.textContent = title;
  popupImage.src = imgSrc;
  popup.classList.remove('hidden');
}

// 팝업 닫기 함수
function popupClose() {
  popup.classList.add('hidden');
  popupImage.src = '';
}

// 닫기 버튼 클릭
popupCloseBtn.addEventListener('click', popupClose);

// 팝업 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
  if (e.target === popup) {
    popupClose();
  }
});
