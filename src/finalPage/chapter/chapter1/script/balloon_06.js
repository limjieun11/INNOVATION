const comments = [
  '집 창문 다 막아놨음',
  '이번엔 제발 무사히 지나가길..',
  '근데 매번 역대 최고라더니 막상 오면 아님ㅋ',
  'ㄹㅇ',
  '맞아 겁만 엄청주고',
  '바람이 어쩌구 하더니 조용~',
  '뭐 별로 안불던데',
  '그래서 학교 쉼?',
  '맞아 휴교가 더 중요함',
  '응 역대급 태풍은 매년 있었어~',
  '진짜로 역.대.급?',
  '매번 별거 없던데',
  '더운데 좀 시원하겠네^^',
  '거짓말;;',
  '예측 맨날 틀리니깐 걱정ㄴ',
  '또 오다가 소멸 되겠지',
  '다른데로 가라 제발',
  '다 지나갔는데 뭘 조심햌ㅋㅋㅋ',
  '그냥 가랑비 수준',
  'ㄹㅇ 오긴함?',
  '새벽부터 온다면서 고요하네',
  '바람 거의 안불던데 태풍 맞음?',
  '공포 조장 하네',
  '그래서 다들 휴교함?',
  '장마보다 약한듯',
  '태풍 좋아허네',
  '태풍 와도 출근하는 세계 유일 국가일듯',
  '고것이 헬조선',
  '어차피 오면 약해져서 소멸함 걱정안해도 됨',
  '아 출근하기 싫다',
  '천벌 받는 거임',
  '나라가 망할 징조',
  '내가 봤을 땐 역대급 태풍일듯',
  '호들갑 작작 좀',
  '다들 출근이나 합시다',
  '별로 안 쎈 태풍인거 같은데',
  '나만 피해 안보면 그만',
  '위력은 대체 어디가야 느낄 수 있는 거지',
  '그냥 시원한 가랑비임',
  '호들갑ㅋㅋㅋㅋ',
  '늘 그렇듯 이번에도 틀릴 듯',
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
