let timer;
let isRunning = false;
let elapsedTime = 0;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");
const themeSelector = document.getElementById("theme-selector");

function updateTime() {
    elapsedTime++;
    let seconds = elapsedTime % 60;
    let minutes = Math.floor(elapsedTime / 60) % 60;
    let hours = Math.floor(elapsedTime / 3600);

    display.textContent = 
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds > 9 ? seconds : "0" + seconds);
}

startButton.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTime, 1000);
        playSound('start-sound.mp3');
    }
});

pauseButton.addEventListener("click", () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        playSound('pause-sound.mp3');
    }
});

resetButton.addEventListener("click", () => {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    lapsContainer.innerHTML = ""; // Clear all lap records
    playSound('reset-sound.mp3');
});

lapButton.addEventListener("click", () => {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapElement = document.createElement("div");
        lapElement.textContent = lapTime;
        lapElement.className = "lap-time";
        lapsContainer.appendChild(lapElement);
    }
});

function playSound(src) {
    const sound = new Audio(src);
    sound.play();
}

themeSelector.addEventListener('change', (event) => {
    document.body.className = event.target.value;
});
