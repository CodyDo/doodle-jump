class Platform {
  constructor(x, y, platformImg) {
    this.x = x;
    this.y = y;

    this.height = 20;
    this.width = 70;

    this.img = platformImg;
  }

  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
    // rect(this.x, this.y + this.height, this.width, this.height);
  }
}
