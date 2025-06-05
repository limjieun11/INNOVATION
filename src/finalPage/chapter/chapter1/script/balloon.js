const comments = [
  '6.25도 이러다 갑자기..',
  '그때랑 지금이랑 같나 ㅋ',
  '또 시작이네',
  '그만하자 정은아!',
  '어서와라',
  '더 많이 쏴라',
  '신났네',
  '풍선 놀이들 하고 있네~',
  '진짜 전쟁 나도 놀랍지 않음',
  '경계심이 사라졌네',
  '뉴스 제목 자극적임',
  '또 관심 끌기지',
  '그냥 무감각해짐',
  '이번엔 또 뭐가 떨어지려나',
  '이젠 놀랍지도 않다',
  '평소처럼 지나가겠지',
  '비슷한 소식만 계속됨',
  '정신 무장해야',
  '시끄럽기만 해',
  '그냥 조용히 살고 싶다',
];

const container = document.getElementById('balloon-container');
let currentIdx = 0;
let observer;

function createBalloonElement(text, index) {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon', index % 2 === 0 ? 'left' : 'right');
  balloon.textContent = text;

  // ✅ 랜덤 간격: 20~80px
  const margin = Math.floor(Math.random() * 60) + 20;
  balloon.style.marginBottom = `${margin}px`;

  return balloon;
}

function revealNextBalloon() {
  if (currentIdx >= comments.length) return;

  const balloon = createBalloonElement(comments[currentIdx], currentIdx);
  container.appendChild(balloon);
  observer.observe(balloon);
  currentIdx++;
}

observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
        setTimeout(() => revealNextBalloon(), 300);
      }
    });
  },
  {
    threshold: 0.6,
  }
);

// 시작 시 하나만 먼저
revealNextBalloon();
