let marker = document.getElementById("marker");
let zone = document.getElementById("zone");
let btnStart = document.getElementById("btnStart");

let scoreEl = document.getElementById("score");
let levelEl = document.getElementById("level");
let livesEl = document.getElementById("lives");

let score = 0, level = 1, lives = 3;
let markerPos = 0, speed = 5, direction = 1;
let gameInterval = null;
let playing = false;

function startGame() {
  if (playing) return;
  playing = true;
  resetZone();
  markerPos = 0;
  speed = 5 + level;
  gameInterval = setInterval(moveMarker, 30);
}

function moveMarker() {
  markerPos += direction * speed;
  if (markerPos >= 100 || markerPos <= 0) direction *= -1;
  marker.style.left = markerPos + "%";
}

function resetZone() {
  let width = 10 + Math.max(0, 20 - level * 2);
  let pos = Math.random() * (100 - width);
  zone.style.left = pos + "%";
  zone.style.width = width + "%";
}

function stopMarker() {
  if (!playing) return;
  clearInterval(gameInterval);
  playing = false;

  let zoneLeft = parseFloat(zone.style.left);
  let zoneWidth = parseFloat(zone.style.width);
  let markerCenter = markerPos;

  if (markerCenter >= zoneLeft && markerCenter <= zoneLeft + zoneWidth) {
    score += 10;
    level++;
    alert("✅ Acertou! Próxima fase!");
  } else {
    lives--;
    alert("❌ Errou!");
  }

  scoreEl.textContent = score;
  levelEl.textContent = level;
  livesEl.textContent = lives;

  if (lives <= 0) {
    alert("🏁 Fim de jogo! Pontos: " + score);
    score = 0; level = 1; lives = 3;
  }
}

btnStart.addEventListener("click", startGame);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") stopMarker();
});
