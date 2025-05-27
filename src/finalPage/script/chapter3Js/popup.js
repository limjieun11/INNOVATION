export function openPopup(title, content) {
  document.getElementById('popup-title').innerText = title;
  document.getElementById('popup-content').innerText = content;
  document.getElementById('popup').style.display = 'block';
}

export function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// 👇 여기 추가했던 거 기억나지?
window.openPopup = openPopup;
window.closePopup = closePopup;
