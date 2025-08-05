// ✅ 전역 함수 등록을 DOMContentLoaded 밖에서 먼저!
window.showPopup = function (imgSrc) {
  const popup = document.getElementById('popup');
  const popupImage = document.getElementById('popup-image');

  if (popup && popupImage) {
    popupImage.src = imgSrc;
    popup.classList.remove('hidden');
  }
};

window.closePopup = function () {
  const popup = document.getElementById('popup');
  const popupImage = document.getElementById('popup-image');

  if (popup && popupImage) {
    popup.classList.add('hidden');
    popupImage.src = '';
  }
};

// ✅ 팝업 닫기 버튼 이벤트 연결은 DOMContentLoaded 안에서
document.addEventListener('DOMContentLoaded', () => {
  const popupClose = document.getElementById('popup-close');
  if (popupClose) {
    popupClose.addEventListener('click', () => {
      window.closePopup();
    });
  }
});
