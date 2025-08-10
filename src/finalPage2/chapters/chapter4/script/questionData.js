// 질문/선택지와 "미리 보여줄" 집계 퍼센트
export const QUESTIONS = [
  {
    id: 1,
    title: 'A vs B, 당신의 선택은?',
    a: '아침형 인간',
    b: '저녁형 인간',
    pre: { a: 62, b: 38 },
  },
  {
    id: 2,
    title: '평생 한 가지 선택만 가능하다면?',
    a: '여행 자유',
    b: '시간 여유',
    pre: { a: 47, b: 53 },
  },
  {
    id: 3,
    title: '직장에서 더 중요한 것은?',
    a: '연봉',
    b: '워라밸',
    pre: { a: 35, b: 65 },
  },
  {
    id: 4,
    title: '한 달 동안 필수로 하나만!',
    a: '커피',
    b: '운동',
    pre: { a: 58, b: 42 },
  },
];

// 진행률 계산용
export const TOTAL = QUESTIONS.length;

// 유틸: 답 저장/로드
export function loadAnswers() {
  try {
    return JSON.parse(localStorage.getItem('ch4Answers')) ?? {};
  } catch {
    return {};
  }
}
export function saveAnswer(qid, choice) {
  const store = loadAnswers();
  store[qid] = choice; // 'a' or 'b'
  localStorage.setItem('ch4Answers', JSON.stringify(store));
}
