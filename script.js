const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
  { x: 200, y: 200 }
];

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.key === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.key === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  } else if (event.key === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  }
}

// Phone Controls
document.getElementById("up").addEventListener("click", () => {
  if (direction !== "DOWN") direction = "UP";
});

document.getElementById("down").addEventListener("click", () => {
  if (direction !== "UP") direction = "DOWN";
});

document.getElementById("left").addEventListener("click", () => {
  if (direction !== "RIGHT") direction = "LEFT";
});

document.getElementById("right").addEventListener("click", () => {
  if (direction !== "LEFT") direction = "RIGHT";
});

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  // Wall Collision
  if (
    headX < 0 ||
    headX >= canvas.width ||
    headY < 0 ||
    headY >= canvas.height
  ) {
    clearInterval(game);
    alert("Game Over! Your Score: " + score);
    return;
  }

  // Self Collision
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === headX && snake[i].y === headY) {
      clearInterval(game);
      alert("Game Over! Your Score: " + score);
      return;
    }
  }

  let newHead = {
    x: headX,
    y: headY
  };

  // Eat Food
  if (headX === food.x && headY === food.y) {

    score++;
    document.getElementById("score").textContent = score;

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };

  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

const game = setInterval(draw, 250);