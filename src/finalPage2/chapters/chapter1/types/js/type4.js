// type1.js

const commentData = [
  '또야? 뉴스 좀 그만 나와라.',
  '저번엔 물풍선, 이젠 뭐냐?',
  '무서운 건 아닌데 짜증 난다.',
  '실제로 터질 땐 누가 책임질 건데?',
  '긴장감도 없고 관심도 없어졌다.',
  '언제까지 무시할 수 있을까?',
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('commentContainer');

  commentData.forEach((text, i) => {
    const bubble = document.createElement('div');
    bubble.classList.add('comment-bubble');
    bubble.textContent = text;

    setTimeout(() => {
      container.appendChild(bubble);
    }, i * 800);
  });
});
