let startTime, interval;
let elapsedTime = 0;
let running = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

function formatTime(ms) {
  let date = new Date(ms);
  let mins = String(date.getUTCMinutes()).padStart(2, '0');
  let secs = String(date.getUTCSeconds()).padStart(2, '0');
  let millis = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${mins}:${secs}.${millis}`;
}

function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;
  timerDisplay.textContent = formatTime(diff);
}

startBtn.onclick = () => {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateTime, 10);
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  }
};

pauseBtn.onclick = () => {
  if (running) {
    clearInterval(interval);
    elapsedTime += Date.now() - startTime;
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
};

resetBtn.onclick = () => {
  clearInterval(interval);
  timerDisplay.textContent = "00:00:00.000";
  elapsedTime = 0;
  running = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  lapsList.innerHTML = '';
};

lapBtn.onclick = () => {
  if (running) {
    const currentTime = Date.now() - startTime + elapsedTime;
    const lapTime = formatTime(currentTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.prepend(li);
  }
};
