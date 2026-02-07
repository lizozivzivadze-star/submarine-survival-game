const gameState = {
  hull: 100,
  power: 100,
  stability: 100,
  gameOver: false
};

const hullEl = document.getElementById("hull");
const powerEl = document.getElementById("power");
const stabilityEl = document.getElementById("stability");
const messageEl = document.getElementById("message");
const actionBtn = document.getElementById("actionBtn");

function updateUI() {
  hullEl.textContent = Math.max(0, gameState.hull);
  powerEl.textContent = Math.max(0, gameState.power);
  stabilityEl.textContent = Math.max(0, gameState.stability);
}

function checkGameOver() {
  if (
    gameState.hull <= 0 ||
    gameState.power <= 0 ||
    gameState.stability <= 0
  ) {
    gameState.gameOver = true;
    messageEl.textContent = "SUBMARINE LOST";
  }
}

// GAME LOOP — runs once per second
setInterval(() => {
  if (gameState.gameOver) return;

  // Simulated damage
  gameState.hull -= 2;
  gameState.stability -= 1;

  updateUI();
  checkGameOver();
}, 1000);

// ONE ACTION
actionBtn.addEventListener("click", () => {
  if (gameState.gameOver) return;

  // Ballast Override
  gameState.stability += 15;
  gameState.hull -= 10;

  messageEl.textContent = "Ballast adjusted";
  updateUI();
  checkGameOver();
});
