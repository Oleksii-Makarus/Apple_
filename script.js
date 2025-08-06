const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const timerDisplay = document.getElementById('timer');
const gameOverDiv = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');
const hud = document.getElementById('hud');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');

let score = 0;
let lives = 3;
let timeLeft = 60;
let gameInterval;
let appleInterval;
let difficulty = 1;

function createApple() {
  const apple = document.createElement('div');
  apple.classList.add('apple');
  const startX = Math.random() * (window.innerWidth - 50);
  apple.style.left = `${startX}px`;
  apple.style.top = `-40px`;
  gameArea.appendChild(apple);

  let position = -40;
  const fallSpeed = 2 + Math.random() * 2 + difficulty * 0.5;

  const fall = setInterval(() => {
    position += fallSpeed;
    apple.style.top = `${position}px`;

    if (position > window.innerHeight) {
      clearInterval(fall);
      apple.remove();
      loseLife();
    }
  }, 20);

  const destroyApple = () => {
    score++;
    scoreDisplay.textContent = score;
    apple.classList.add('hit');
    clearInterval(fall);
    setTimeout(() => apple.remove(), 200);
  };

  apple.addEventListener('click', destroyApple);
  apple.addEventListener('touchstart', destroyApple);
}

function loseLife() {
  lives--;
  livesDisplay.textContent = lives;
  if (lives <= 0) {
    endGame();
  }
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    endGame();
  }

  if (timeLeft % 15 === 0 && timeLeft !== 60) {
    difficulty++;
  }
}

function startGame() {
  score = 0;
  lives = 3;
  timeLeft = 60;
  difficulty = 1;
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  timerDisplay.textContent = timeLeft;
  gameOverDiv.style.display = 'none';
  startScreen.style.display = 'none';
  hud.style.display = 'flex';
  gameArea.style.display = 'block';
  gameInterval = setInterval(updateTimer, 1000);
  appleInterval = setInterval(createApple, 800);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(appleInterval);
  const apples = document.querySelectorAll('.apple');
  apples.forEach(a => a.remove());
  finalScore.textContent = score;
  gameOverDiv.style.display = 'block';
}

function restartGame() {
  startGame();
}

//Обробник кнопки старту
startButton.addEventListener('click', startGame);