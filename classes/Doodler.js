class Doodler {
  constructor(leftDoodlerPng, rightDoodlerPng) {
    // Positional Information of the Doodler
    this.x = width / 2 - 20;
    this.y = height / 2;
    this.height = 60;
    this.width = 60;

    // Movement Information of the Doodler
    this.velocity = 0; // Positive velocity = falling, Negative = jumping
    this.gravity = 0.1;
    this.jumpForce = 7.5;

    // Graphics
    this.left = leftDoodlerPng;
    this.right = rightDoodlerPng;
    this.goingLeft = true;
  }

  draw() {
    if (this.goingLeft) {
      image(this.left, this.x, this.y, this.width, this.height);
    } else {
      image(this.right, this.x, this.y, this.width, this.height);
    }
  }

  update(platforms) {
    translate(0, height / 2 - this.y); // center the player
    if (this.velocity < -this.jumpForce) this.velocity = -this.jumpForce;
    this.velocity += this.gravity;
    this.y += this.velocity;

    // left/right movement
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 4;
      this.goingLeft = true;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 4;
      this.goingLeft = false;
    }

    // screen wrapping
    if (this.x + this.width < 0) this.x = width;
    if (this.x > width) this.x = -this.width;

    // platform detection
    for (let platform of platforms) {
      if (
        this.y + this.height >= platform.y &&
        this.y + this.height <= platform.y + platform.height
      ) {
        let minX = platform.x - this.width;
        let maxX = platform.x + platform.width;

        if (this.x >= minX && this.x <= maxX && this.velocity > 0) {
          this.jump();
        }
      }
    }
  }

  jump() {
    this.velocity = -this.jumpForce;
  }
}
