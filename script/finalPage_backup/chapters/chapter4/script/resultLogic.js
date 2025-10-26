import { QUESTIONS, loadAnswers, TOTAL } from './questionData.js';

const answers = loadAnswers();
const listEl = document.querySelector('.answer-list');
const done = Object.keys(answers).length;

document.querySelector('.summary').textContent =
  done === TOTAL
    ? '선택 완료! 아래는 당신의 선택 요약이에요.'
    : `아직 ${TOTAL - done}개 남았어요. (미선택은 표시되지 않음)`;

// 요약 렌더
QUESTIONS.forEach((q) => {
  const choice = answers[q.id];
  if (!choice) return;
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="q">${q.id}. ${q.title}</div>
    <div class="a">내 선택: <strong>${choice.toUpperCase()}</strong> — ${
    q[choice]
  }</div>
    <div class="pre">다른 사람들: A ${q.pre.a}% / B ${q.pre.b}%</div>
  `;
  listEl.appendChild(li);
});

// 다시하기
document.getElementById('restart').addEventListener('click', () => {
  localStorage.removeItem('ch4Answers');
  location.href = './index.html';
});
