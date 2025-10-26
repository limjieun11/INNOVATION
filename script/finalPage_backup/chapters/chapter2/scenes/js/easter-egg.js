document.addEventListener('DOMContentLoaded', () => {
  const egg = document.getElementById('easter-egg');
  if (!egg) return;

  const nextUrl = egg.getAttribute('data-next') || '../exit/chapter2_exit.html';

  // ====== 롱프레스 네비게이션(기존 유지) ======
  const HOLD_MS = 10;
  let downTs = 0;
  let rafId = null;

  function setHoldProgress(p) {
    egg.style.setProperty('--hold', String(Math.max(0, Math.min(1, p))));
  }
  function navigate() {
    if (egg.dataset.locked) return;
    egg.dataset.locked = '1';
    // scale 효과가 위치 계산에 영향 없도록 transform에 translate 유지
    egg.style.transform = 'translate(-50%, -50%) scale(0.96)';
    setTimeout(() => {
      window.location.href = nextUrl;
    }, 120);
  }
  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    downTs = performance.now();
    setHoldProgress(0);
    const tick = () => {
      const p = (performance.now() - downTs) / HOLD_MS;
      setHoldProgress(p);
      if (p >= 1) navigate();
      else rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
  }
  function onPointerUpCancel() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    downTs = 0;
    setHoldProgress(0);
    // 원래 스케일 복원
    egg.style.transform = 'translate(-50%, -50%)';
  }
  egg.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointerup', onPointerUpCancel);
  window.addEventListener('pointercancel', onPointerUpCancel);
  window.addEventListener('blur', onPointerUpCancel);

  // ====== 안정화 앵커링: 파노라마 구 표면에 고정 → 월드좌표 투영 ======
  const yawDeg = parseFloat(egg.dataset.yaw || '0');
  const pitchDeg = parseFloat(egg.dataset.pitch || '0');

  const tryAttach = () => {
    const container = document.getElementById('viewer');
    if (!container) {
      requestAnimationFrame(tryAttach);
      return;
    }
    if (!window.PANO || !PANO.viewer || !PANO.viewer.camera || !PANO.panorama) {
      requestAnimationFrame(tryAttach);
      return;
    }

    const viewer = PANO.viewer;
    const camera = viewer.camera;
    const panorama = PANO.panorama;

    // Panolens 기본 스피어 반지름(대부분 5000). 정확히 표면에 박아 미세 떨림 제거
    const SPHERE_RADIUS = 5000;

    // yaw/pitch(도) → 방향벡터
    const toDir = (yaw, pitch) => {
      const yr = (yaw * Math.PI) / 180;
      const pr = (pitch * Math.PI) / 180;
      const x = Math.sin(yr) * Math.cos(pr);
      const y = Math.sin(pr);
      const z = -Math.cos(yr) * Math.cos(pr); // three.js -Z forward
      return new THREE.Vector3(x, y, z);
    };

    // ✅ 파노라마 로컬 공간에 앵커 Object3D 생성(구 표면에 정확히 고정)
    const dir = toDir(yawDeg, pitchDeg).normalize();
    const anchorObj = new THREE.Object3D();
    anchorObj.position.copy(dir).multiplyScalar(SPHERE_RADIUS);
    panorama.add(anchorObj);

    // 재사용 벡터들
    const world = new THREE.Vector3();
    const camForward = new THREE.Vector3();
    const tmp = new THREE.Vector3();

    const update2D = () => {
      // 최신 행렬 반영
      camera.updateMatrixWorld(true);
      panorama.updateMatrixWorld(true);
      anchorObj.updateMatrixWorld(true);

      // 월드 좌표
      anchorObj.getWorldPosition(world);

      // 시야 뒤쪽이면 바로 숨김(“반대편 보면 아예 안 보임” 요구)
      camera.getWorldDirection(camForward).normalize(); // 카메라가 바라보는 방향
      // 카메라 → 앵커 방향
      tmp.copy(world).sub(camera.position).normalize();
      const facing = camForward.dot(tmp); // <0이면 거의 뒤쪽
      if (facing <= 0) {
        egg.style.visibility = 'hidden';
        return;
      }

      // 화면 투영(NDC)
      const ndc = world.clone().project(camera);

      // 화면 안쪽 여부 검사
      const onScreen =
        ndc.z <= 1 && ndc.x >= -1 && ndc.x <= 1 && ndc.y >= -1 && ndc.y <= 1;

      if (!onScreen) {
        egg.style.visibility = 'hidden';
        return;
      }

      // CSS 픽셀 좌표(정수 스냅으로 미세 드리프트 제거)
      const rect = container.getBoundingClientRect();
      const px = Math.round((ndc.x * 0.5 + 0.5) * rect.width);
      const py = Math.round((-ndc.y * 0.5 + 0.5) * rect.height);

      // 위치 적용
      egg.style.left = `${px}px`;
      egg.style.top = `${py}px`;
      egg.style.visibility = 'visible';
    };

    // Panolens 렌더루프에 동기화(프레임 정확히 맞춤)
    if (typeof viewer.addUpdateCallback === 'function') {
      viewer.addUpdateCallback(update2D);
    } else {
      const loop = () => {
        update2D();
        requestAnimationFrame(loop);
      };
      loop();
    }

    // 초기 1회
    update2D();

    // (선택) Alt+클릭으로 새 위치 캘리브레이션
    container.addEventListener('click', (e) => {
      if (!e.altKey) return;
      const r = container.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);
      const newDir = raycaster.ray.direction.clone().normalize();
      anchorObj.position.copy(newDir).multiplyScalar(SPHERE_RADIUS); // 표면 재고정

      // 참고용: 새 yaw/pitch 콘솔 출력
      const yaw = (Math.atan2(newDir.x, -newDir.z) * 180) / Math.PI;
      const pitch = (Math.asin(newDir.y) * 180) / Math.PI;
      console.log(`[egg] yaw=${yaw.toFixed(2)}°, pitch=${pitch.toFixed(2)}°`);
    });
  };

  tryAttach();
});
