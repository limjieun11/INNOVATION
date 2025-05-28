let img;
let particles = [];

function preload() {
  img = loadImage('./assets/png/title1.png');
}

function setup() {
  setCanvasContainer('canvas-container', 3, 2, true);
  noStroke();
  imageMode(CENTER);

  img.loadPixels();
  const step = 2;
  const particleSize = 1;
  const scale = min((width * 0.4) / img.width, (height * 0.5) / img.height);

  for (let y = 0; y < img.height; y += step) {
    for (let x = 0; x < img.width; x += step) {
      const idx = 4 * (x + y * img.width);
      const r = img.pixels[idx];
      const g = img.pixels[idx + 1];
      const b = img.pixels[idx + 2];
      const a = img.pixels[idx + 3];

      if (a > 100) {
        let tx = x * scale + (width / 2 - (img.width * scale) / 2 - 50);
        let ty = y * scale + (height / 2 - (img.height * scale) / 2 - 360);
        particles.push(new Particle(tx, ty, tx, ty, color(r, g, b, a)));
      }
    }
  }
}

function draw() {
  clear();
  particles.forEach((p) => {
    p.update();
    p.show();
  });
}

// 마우스 따라다니는 커스텀 커서
document.addEventListener('mousemove', function (e) {
  const cursor = document.getElementById('cursor-circle');
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});
