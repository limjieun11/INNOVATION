const comments = [
  '저런걸 대체 왜 함',
  '맞아 너무 위험해 보임',
  '재밌잖아ㅋ',
  '저것만큼 무식한 게임이 없음',
  '하지만 재밌죠?',
  '중독성 장난 아님',
  '젤 재밌었다',
  '오우 저거 너무 위험해보이는데 당장해보자',
  '위험하면 하지마~',
  '저거 우리는 옆으로 날아서 탐ㅋㅋㅋ',
  '최근에도 유행하던데',
  '아니 이거 안죽음',
  '재미있어 보이던데',
  '스위치 끄듯ㅋㅋㅋㅋ',
  '기절놀이 오늘만 7번 했음',
  '나도ㅋ',
  'ㄹㅇ 개꿀잼',
  '우리 학교 저 놀이 유행하고 있음',
  '하지마라.. 이거하고 입원함..',
  '구라ㄴㄴ',
  'ㅋㅋㅋㅋㅋㅋㅋㅋ',
  '뭘 고통스러워 재밌더만',
  '댓글 보니깐 다들 살아있네 뭘',
  '근데 나 해봤는데 ㄹㅇ 재밌음',
  '그렇게 하다 가는거다',
  '편하게 죽으면 나야 좋지 뭐',
  '남자가 빨리죽는 이유ㅋㅋ',
  '저 놀이는 남녀 불문이긴 함ㅋㅋㅋ',
  '별 이상한 놀이네ㅋㅋ',
  '새로운 놀이 발견',
  '오',
  '내일 저거 해봐야겠다',
  'MZ스럽네 YOUNG 하구만 뭘',
  'ㄹㅇ 귀여운 수준',
  '오~ 따라해봐야지~',
  '너무 위험한데.. 이해안감',
  '재밌잖아 한잔해',
  '라떼는 불장난 많이 했지',
  '어차피 안죽음 ㄱㅊ',
  '호들갑은',
  '역시 책임 없는 쾌락이 최고임',
  '지금도 재밌게 하는 중임',
  '나 해봤는데 건강함',
  '멀쩡해~',
  '이런걸로 뉴스 내는게 이상함',
];

const container = document.getElementById('balloon-container');
let currentIdx = 0;
let observer;

function createBalloonElement(text, index) {
  const balloon = document.createElement('div');
  const isLeft = index % 2 === 0;
  balloon.classList.add('balloon', isLeft ? 'left' : 'right');
  balloon.textContent = text;

  // ✅ 세로 간격: 40~120px 랜덤
  const verticalSpacing = Math.floor(Math.random() * 100) + 40;
  balloon.style.marginBottom = `${verticalSpacing}px`;

  // ✅ 수평 간격: 32~128px 랜덤
  const horizontalSpacing = Math.floor(Math.random() * 128) + 32;
  if (isLeft) {
    balloon.style.marginLeft = `${horizontalSpacing}px`;
  } else {
    balloon.style.marginRight = `${horizontalSpacing}px`;
  }

  return balloon;
}

function revealNextBalloon() {
  if (currentIdx >= comments.length) return;

  const balloon = createBalloonElement(comments[currentIdx], currentIdx);
  container.appendChild(balloon);
  observer.observe(balloon);
  currentIdx++;

  // ✅ 마지막 말풍선이면 일정 시간 뒤 자동 페이지 이동
  if (currentIdx === comments.length) {
    setTimeout(() => {
      window.location.href = '/src/finalPage/chapter1_intro.html'; // 다음 페이지 경로 설정
    }, 2000); // 4초 뒤 이동 (필요 시 조절 가능)
  }
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

// 첫 말풍선 시작
revealNextBalloon();
