// script2.js
document.addEventListener('DOMContentLoaded', () => {
    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let running = false;
    let lapCounter = 0;

    const display = document.getElementById('display');
    const startStopButton = document.getElementById('startStop');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapsList = document.getElementById('laps');

    startStopButton.addEventListener('click', () => {
        if (!running) {
            startTime = new Date().getTime() - (difference || 0);
            tInterval = setInterval(updateTime, 1);
            startStopButton.innerText = 'Pause';
            startStopButton.style.background = '#f44336';
            resetButton.disabled = false;
            lapButton.disabled = false;
            running = true;
        } else {
            clearInterval(tInterval);
            startStopButton.innerText = 'Start';
            startStopButton.style.background = '#4CAF50';
            running = false;
        }
    });

    resetButton.addEventListener('click', () => {
        clearInterval(tInterval);
        difference = 0;
        running = false;
        startStopButton.innerText = 'Start';
        startStopButton.style.background = '#4CAF50';
        resetButton.disabled = true;
        lapButton.disabled = true;
        display.innerText = '00:00:00.000';
        lapsList.innerHTML = '';
        lapCounter = 0;
    });

    lapButton.addEventListener('click', () => {
        if (running) {
            const lapTime = display.innerText;
            lapCounter++;
            const lapItem = document.createElement('li');
            lapItem.innerText = `Lap ${lapCounter}: ${lapTime}`;
            lapsList.appendChild(lapItem);
        }
    });

    function updateTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
        
        const milliseconds = Math.floor(difference % 1000);
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

        display.innerText = 
            (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' +
            (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
            (seconds ? (seconds > 9 ? seconds : '0' + seconds) : '00') + '.' +
            (milliseconds > 99 ? milliseconds : milliseconds > 9 ? '0' + milliseconds : '00' + milliseconds);
    }
});
