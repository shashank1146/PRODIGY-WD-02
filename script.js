let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateDisplay(time) {
    const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(time % 1000).padStart(3, '0');
    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function reset() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    laps.innerHTML = '';
}

function lap() {
    const lapTime = document.createElement('li');
    lapTime.textContent = display.textContent;
    laps.appendChild(lapTime);
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

const themeButton = document.createElement('button');
themeButton.textContent = 'Toggle Theme';
themeButton.style.position = 'fixed';
themeButton.style.bottom = '20px';
themeButton.style.right = '20px';
document.body.appendChild(themeButton);

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.body.classList.add('light-theme');
