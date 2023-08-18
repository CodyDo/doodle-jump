// COMPLETE: https://codepen.io/ainc/pen/ZxGXwd
let doodler;

let gapBtwnPlatforms;
let platforms;
let platformCount;

let score;
let highScore;
let newHighScore;
let gameOverVal;
let gameStart;
let paused;

let bg;
let doodlerLeft;
let doodlerRight;
let plaformImg;

function preload() {
  bg = loadImage(
    'assets/bg.png',
    () => print('Successfully loaded background image'),
    () => print('Failed to load background image'),
  );
  doodlerLeft = loadImage(
    './assets/doodler-left.png',
    () => print('Successfully loaded left-facing doodler image'),
    () => print('Failed to load left-facing doodler image'),
  );
  doodlerRight = loadImage(
    './assets/doodler-right.png',
    () => print('Successfully loaded right-facing doodler image'),
    () => print('Failed to load right-facing doodler iamge'),
  );
  platformImg = loadImage(
    './assets/platform.png',
    () => print('Successfully loaded platform image'),
    () => print('Failed to load platform image'),
  );
}

function setup() {
  createCanvas(400, 600);
  frameRate(60);
  platforms = [];
  platformCount = 6;
  score = 0;
  highScore = 0;
  newHighScore = false;
  gameOverVal = false;
  gameStart = false;
  paused = false;
  doodler = new Doodler(doodlerLeft, doodlerRight);

  // create platforms
  gapBtwnPlatforms = height / platformCount;
  platforms.push(
    new Platform(doodler.x, doodler.y + doodler.height + 10, platformImg),
  );
  for (let i = 1; i < 10; i++) {
    platforms.push(
      new Platform(
        random(width),
        height * 0.5 - i * gapBtwnPlatforms,
        platformImg,
      ),
    );
  }
}

function draw() {
  image(bg, 0, 0);

  // Game hasn't started
  if (!gameStart) {
    textAlign(CENTER);
    textSize(50);
    text('Doodle Jump', width / 2, height / 2 - 50);
    textSize(30);
    text('Press SPACE to Start', width / 2, height / 2 + 50);
  } else if (paused) {
    textAlign(CENTER);
    textSize(40);
    text('PAUSED', width / 2, height / 2 - 55);
    textSize(30);
    text(`High Score: ${highScore}`, width / 2, height / 2);
    text(`Current Score: ${score}`, width / 2, height / 2 + 50);
  } else {
    // Check if you died (fell a little past the lowest plaform)
    if (doodler.y > platforms[0].y + 300) {
      noLoop();
      gameOver();
    } else {
      doodler.update(platforms);
      doodler.draw();

      // draw the platforms
      for (let platform of platforms) {
        platform.draw();
      }

      // create more platforms as player moves up the screen
      if (doodler.y < platforms[platforms.length - 1].y + 200) {
        platforms.push(
          new Platform(
            random(width),
            platforms[platforms.length - 1].y - gapBtwnPlatforms,
            platformImg,
          ),
        );
      }

      // update score and display
      if (platforms[0].y > doodler.y + 300) {
        platforms.splice(0, 1);
        score++;
        if (score > highScore) {
          highScore = score;
          newHighScore = true;
        }
      }

      displayScore();
    }
  }
}

function restart() {
  platforms = [];
  score = 0;
  gameOverVal = false;
  doodler = new Doodler(doodlerLeft, doodlerRight);
  platforms.push(
    new Platform(doodler.x, doodler.y + doodler.height + 10, platformImg),
  );
  for (let i = 1; i < 10; i++) {
    platforms.push(
      new Platform(
        random(width),
        height * 1.5 - i * gapBtwnPlatforms - doodler.y,
        platformImg,
      ),
    );
  }
}

function keyPressed() {
  if (key == ' ' && gameOverVal) {
    restart();
    loop();
  }

  if (key == ' ' && !gameStart) {
    gameStart = true;
  }

  if (key == 'r' && !gameOverVal) {
    restart();
  }

  if (keyCode == ESCAPE && !gameOverVal) {
    paused = !paused;
  }
}

function displayScore() {
  push();
  fill(0, 0, 0);
  textSize(30);
  textAlign(CENTER);
  text(score, width / 2, doodler.y - 150);
  pop();
}

function gameOver() {
  gameOverVal = true;
  textSize(30);
  image(bg, 0, 0);
  textAlign(CENTER);
  if (newHighScore) {
    text(`New High Score: ${highScore}`, width / 2, height / 2 - 50);
    newHighScore = false;
  } else {
    text(`High Score: ${highScore}`, width / 2, height / 2 - 60);
    text(`You scored ${score}`, width / 2, height / 2 - 5);
  }
  textSize(25);
  text(`Press SPACE to play again`, width / 2, height / 2 + 50);
}
