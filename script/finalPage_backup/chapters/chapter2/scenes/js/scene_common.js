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

  // ✅ 전역 노출 (+ 앵커 헬퍼)
  window.PANO = {
    viewer,
    panorama,
    container: viewerElement,

    /**
     * 파노라마(Object3D)에 고정되는 앵커 생성 (yaw/pitch: 도)
     * 반환값: THREE.Object3D (panorama의 local space에 배치됨)
     */
    createAnchorFromYawPitch(yawDeg, pitchDeg) {
      const yr = (yawDeg * Math.PI) / 180;
      const pr = (pitchDeg * Math.PI) / 180;

      // -Z가 전방인 three 기준 단위벡터
      const x = Math.sin(yr) * Math.cos(pr);
      const y = Math.sin(pr);
      const z = -Math.cos(yr) * Math.cos(pr);

      // 거리(반지름)는 중요치 않음. 같은 시선(ray)이면 2D 투영 동일.
      const obj = new THREE.Object3D();
      obj.position.set(x, y, z); // 단위구 내부에 찍어도 OK
      panorama.add(obj); // ✅ 파노라마에 "붙인다"
      return obj;
    },
  };

  // (선택) 파노라마 준비 이벤트
  panorama.addEventListener('enter-fade-start', () => {
    window.dispatchEvent(new Event('panorama-ready'));
  });

  // "다음" 버튼
  const nextButton = document.getElementById('next-button');
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      window.location.href = nextPage;
    });
  }

  // 클릭 자체로 탈출시키지 않기(롱프레스는 easter-egg.js 담당)
  if (hasEasterEgg) {
    const egg = document.getElementById('easter-egg');
    if (egg) egg.addEventListener('click', (e) => e.preventDefault());
  }
}
