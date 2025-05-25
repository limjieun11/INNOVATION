class Particle {
  constructor(x, y, targetX, targetY, color) {
    this.pos = createVector(x, y);
    this.target = createVector(targetX, targetY);
    this.color = color;
    this.size = 3;
  }

  update() {
    const mouse = createVector(mouseX, mouseY);
    const distance = dist(mouse.x, mouse.y, this.pos.x, this.pos.y);

    if (distance < 80) {
      // 마우스가 가까우면 밀려남
      let force = p5.Vector.sub(this.pos, mouse);
      force.setMag(5);
      this.pos.add(force);
    } else {
      // 멀어지면 원래 위치로
      let back = p5.Vector.sub(this.target, this.pos);
      this.pos.add(back.mult(0.1));
    }
  }

  show() {
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.size);
  }
}
