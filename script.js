let canvas = document.querySelector('#canvas');

let context;

context = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let playerX = 0;
let playerY = 375;

let astroidX = 375;
let astroidY = 0;
let astroidspeed = 50;

const blockSize = 25;

let isJumping = false;
let updateGame = setInterval(update, 20);

function update() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'red';
  context.fillRect(playerX, playerY, blockSize, blockSize);
  context.fillStyle = 'green';
  context.fillRect(astroidX, astroidY, blockSize, blockSize);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jump();
  }
  if (e.code === 'ArrowRight') {
    moveRight();
  }
  if (e.code === 'ArrowLeft') {
    moveLeft();
  }
});

astroidDown();

function moveRight() {
  playerX += blockSize;
  if (playerX === canvas.width) {
    playerX = 0;
  }
}
function moveLeft() {
  playerX -= blockSize;
  if (playerX < -1) {
    playerX = 375;
  }
}

function astroidDown() {
  let astroidTimer = setInterval(() => {
    astroidY += blockSize;
    if (astroidY === canvas.width -blockSize) {
      clearInterval(astroidTimer);
      astroidUp();
    }
  }, astroidspeed);
}
function astroidUp() {
  let astroidTimer2 = setInterval(() => {
    astroidY -= blockSize;
    if (astroidY === 0) {
      clearInterval(astroidTimer2);
      astroidDown();
    }
  }, astroidspeed);
}

function jump(e) {
  if (!isJumping) {
    isJumping = true;
    let counting = 0;
    let timerID = setInterval(() => {
      counting++;
      playerY -= 5;
      if (counting === 10) {
        clearInterval(timerID);
        let fallingTimerId = setInterval(() => {
          counting--;
          playerY += 5;
          if (playerY === 375) {
            clearInterval(fallingTimerId);
            isJumping = false;
            astroidspeed -= 10;
          }
        }, 100);
      }
    }, 100);
  }
}
