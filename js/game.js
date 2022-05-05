const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const bird = new Image();
const bg = new Image();
const pipeUp = new Image();
const pipeDown = new Image();
const fg = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeDown.src = "img/pipeDown.png";

const gap = 120;
let birdY = 250;
let birdX = 50;
let scope = 0;

document.addEventListener("keydown", birdUp);
document.addEventListener("touchstart", birdUp);

function birdUp() {
  birdY -= 40;
}

const pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0,
};

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    ctx.drawImage(bird, birdX, birdY);
    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.font = "24px serif";
    ctx.fillText("Счет: " + scope, 20, canvas.height - 30);

    pipe[i].x--;

    if (pipe[i].x === 50) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height - pipeUp.height),
      });
    }

    if (
      (birdX + bird.width >= pipe[i].x &&
        birdX <= pipe[i].x + pipeUp.width &&
        (birdY <= pipe[i].y + pipeUp.height ||
          birdY + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      birdY + bird.height >= canvas.height - fg.height
    ) {
      cancelAnimationFrame(animate);
    }

    if (pipe[i].x === 50) {
      scope += 1;
    }
  }

  birdY += 1;
  const animate = requestAnimationFrame(draw);
}

pipeDown.addEventListener("load", draw);
