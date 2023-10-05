const ball = document.getElementById("ball");
const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");

let ballX = 400;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 2;

const updateBallPosition = () => {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY < 0 || ballY > 380) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ballX < 30 &&
    ballY > parseInt(leftPaddle.style.top) &&
    ballY < parseInt(leftPaddle.style.top) + 100
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX > 750 &&
    ballY > parseInt(rightPaddle.style.top) &&
    ballY < parseInt(rightPaddle.style.top) + 100
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX < 0 || ballX > 800) {
    // Ball out of bounds
    resetBall();
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
};

const resetBall = () => {
  ballX = 400;
  ballY = 200;
  ballSpeedX = 5;
  ballSpeedY = 2;
};

const gameLoop = () => {
  updateBallPosition();
  requestAnimationFrame(gameLoop);
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && parseInt(rightPaddle.style.top) > 0) {
    rightPaddle.style.top = parseInt(rightPaddle.style.top) - 10 + "px";
  }

  if (event.key === "ArrowDown" && parseInt(rightPaddle.style.top) < 300) {
    rightPaddle.style.top = parseInt(rightPaddle.style.top) + 10 + "px";
  }
});

document.addEventListener("mousemove", (event) => {
  const mouseY =
    event.clientY -
    document.querySelector(".game-container").getBoundingClientRect().top;

  if (mouseY >= 0 && mouseY <= 300) {
    leftPaddle.style.top = mouseY + "px";
  }
});

gameLoop();
