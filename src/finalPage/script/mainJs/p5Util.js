let canvasContainerId;
let canvasAspectRatio;
let isCanvasFlexible;

function setCanvasContainer(id, width, height, flexible = false) {
  canvasContainerId = id;
  isCanvasFlexible = flexible;
  canvasAspectRatio = width / height;

  const container = document.getElementById(canvasContainerId);
  let canvas;

  if (flexible) {
    canvas = createCanvas(
      container.offsetWidth,
      container.offsetWidth / canvasAspectRatio
    );
  } else {
    canvas = createCanvas(width, height);
  }

  canvas.parent(canvasContainerId);
}

function windowResized() {
  if (!isCanvasFlexible) return;

  const container = document.getElementById(canvasContainerId);
  resizeCanvas(
    container.offsetWidth,
    container.offsetWidth / canvasAspectRatio
  );
}
