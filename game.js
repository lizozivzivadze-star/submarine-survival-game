// =====================
// GAME STATE
// =====================
const gameState = {
  hull: 100,
  power: 100,
  stability: 100,
  problems: [],
  gameOver: false
};

// =====================
// DOM REFERENCES
// =====================
const hullEl = document.getElementById("hull");
const powerEl = document.getElementById("power");
const stabilityEl = document.getElementById("stability");
const warningsEl = document.getElementById("warnings");
const messageEl = document.getElementById("message");
const actionButtons = document.querySelectorAll("#actions button");

// =====================
// PROBLEMS
// =====================
const PROBLEM_TYPES = [
  { name: "Flooding detected", stat: "hull", drain: 2 },
  { name: "Power grid unstable", stat: "power", drain: 2 },
  { name: "Structural instability", stat: "stability", drain: 2 }
];

function spawnProblem() {
  const template = PROBLEM_TYPES[Math.floor(Math.random() * PROBLEM_TYPES.length)];
  gameState.problems.push({ ...template });
}

// =====================
// CORE LOGIC
// =====================
function applyProblems() {
  gameState.problems.forEach(problem => {
    gameState[problem.stat] -= problem.drain;
  });
}

function updateUI() {
  hullEl.textContent = Math.max(0, Math.floor(gameState.hull));
  powerEl.textContent = Math.max(0, Math.floor(gameState.power));
  stabilityEl.textContent = Math.max(0, Math.floor(gameState.stability));

  warningsEl.innerHTML = "";
  gameState.problems.forEach(problem => {
    const li = document.createElement("li");
    li.textContent = problem.name;
    warningsEl.appendChild(li);
  });
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

// =====================
// GAME LOOP (1 SECOND TICK)
// =====================
setInterval(() => {
  if (gameState.gameOver) return;

  // Chance to spawn new problem
  if (Math.random() < 0.4) {
    spawnProblem();
  }

  applyProblems();
  updateUI();
  checkGameOver();
}, 1000);

// =====================
// ACTIONS
// =====================
actionButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (gameState.gameOver) return;

    const action = button.dataset.action;

    switch (action) {
      case "ballast":
        gameState.stability += 15;
        gameState.hull -= 10;
        messageEl.textContent = "Ballast override engaged";
        break;

      case "power":
        gameState.power += 20;
        gameState.stability -= 10;
        messageEl.textContent = "Power rerouted";
        break;

      case "seal":
        gameState.hull += 20;
        gameState.power -= 10;
        messageEl.textContent = "Compartment sealed";
        break;

      case "vent":
        if (gameState.problems.length > 0) {
          gameState.problems.pop();
        }
        gameState.hull -= 5;
        gameState.power -= 5;
        gameState.stability -= 5;
        messageEl.textContent = "Emergency vent activated";
        break;
    }

    updateUI();
    checkGameOver();
  });
});
