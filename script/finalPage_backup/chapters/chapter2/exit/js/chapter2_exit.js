document.addEventListener('keydown', (e) => {
  const goIntro = () => (location.href = '../intro/chapter2_intro.html');
  const goBack = () =>
    history.length
      ? history.back()
      : (location.href = '../scenes/scene1_before.html');

  if (e.key === 'Enter') goIntro();
  if (e.key === 'Escape') goBack();
});
