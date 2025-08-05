function initPanorama(imagePath, nextPage, hasEasterEgg = false) {
  const viewerElement = document.getElementById('viewer');
  if (!viewerElement) {
    console.error('❌ #viewer 요소가 존재하지 않습니다.');
    return;
  }

  const panorama = new PANOLENS.ImagePanorama(imagePath);
  const viewer = new PANOLENS.Viewer({
    container: viewerElement,
    autoHideInfospot: false,
    controlBar: false,
  });

  viewer.add(panorama);

  const nextButton = document.getElementById('next-button');
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      window.location.href = nextPage;
    });
  }

  if (hasEasterEgg) {
    const egg = document.getElementById('egg');
    if (egg) {
      egg.addEventListener('click', () => {
        window.location.href = './escape.html';
      });
    }
  }
}
