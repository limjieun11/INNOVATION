const comments = [
  '요즘 킥보드 헬멧 안쓴사람 보기 싫음',
  '다 안쓰던데 뭘',
  '걍 위험해보여서 애초에 안탐ㅋ',
  '근데 헬멧 쓰기 귀찮긴 해',
  '의무화 법은 대체 왜 만듦?',
  '각자도생',
  'ㄹㅇ 이런 법 누가 만들었지?',
  '아니 헬멧을 누가 써ㅋㅋㅋ',
  '99프로가 안쓰는 듯',
  '애초에 누가 헬멧을 들고다녀',
  'ㄹㅇ 귀찮음',
  '나 킥보드 3명이서 타는 거 봄',
  '난 4명',
  'ㅁㅊ',
  '날씨 더운데 헬멧을 어떻게 씀',
  'ㄹㅇ 그냥 안타고 말지',
  '알지만 쓰기 싫어',
  '먼 자전거를 타는데 헬멧을 써',
  '지 책임이지 뭘 이걸 의무화까지',
  '그냥 본인이 알아서 쓰자',
  '근데 아무도 안씀ㅋ',
  '안전모 보다는 교육이 더 중요함ㅇㅇ',
  '귀찮..',
  '안 탐 ㅅㄱ',
  '근데 안전모 써도 죽음',
  '뛰는 사람도 헬멧쓰자',
  'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
  'ㅋㅋㅋㅋㅋ',
  '그럼 인정한다ㅋㅋㅋ',
  '자전거를 안타고 말지 헬멧 절대 안씀',
  '스릴ㅋ',
  '쓰는건 개인 자율 아니냐',
  'ㅇㅈ 무슨 의무화를 시키냐',
  '짜증나',
  '걍 냅둬라 안쓴사람 죽든말든',
  '누가 모자쓰고 댕김',
  '안쓸래',
  '그럼 자전거로 40키로 달리면 헬멧 써야함?',
  '야구모자는 안됨??',
  '되겠냐',
  '자전거는 느리잖아',
  '몰라 배째',
  '경찰들 이런것만 단속 잘함',
  '솔직히 킥라니는 사고나도 자연사임',
  '안타깝지만!ㅋㅋㅋ',
  '범칙금? 안내고말지~ 걍 도망다닐래',
  '헬멧쓰면 머리 망가짐',
  '조심해서 타면 그만이야',
  '안걸린다는 생각으로 걍 타야겠다',
  '걸리면 도망ㄱ',
  '주변에 쓰는 사람 안보이던데',
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
