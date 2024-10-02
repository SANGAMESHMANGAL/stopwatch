let startTime, updatedTime, difference, tInterval;
let savedTime = 0;
let running = false;
let paused = false;

const display = document.getElementById("display");
const lapsList = document.getElementById("laps");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 10);
        running = true;
        paused = false;
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
    savedTime = 0;
    updateTime();  // Update one last time after stopping
}

function pauseTimer() {
    if (running && !paused) {
        clearInterval(tInterval);
        savedTime = difference;
        paused = true;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    savedTime = 0;
    display.textContent = "00:00:00.00";
    lapsList.innerHTML = "";
}

function lapTime() {
    if (running) {
        const lap = document.createElement("li");
        lap.textContent = display.textContent;
        lapsList.appendChild(lap);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    const formatTime = (unit) => (unit < 10 ? "0" : "") + unit;
    
    display.textContent = `${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds)}`;
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("lapBtn").addEventListener("click", lapTime);
