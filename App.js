// Constants for session and break lengths
let sessionLength = 25; // in minutes
let breakLength = 5; // in minutes

// Flag to indicate whether the timer is running
let isRunning = false;

// Countdown timer variables
let countdown;
let isSession = true; // Indicates whether it's a session or break
let currentTime = sessionLength * 60; // Current time in seconds

// Elements
const sessionLengthValue = document.getElementById('sessionLengthValue');
const breakLengthValue = document.getElementById('breakLengthValue');
const sessionTimer = document.getElementById('session');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

// Update the displayed session and break lengths
function updateDisplay() {
  const sessionMinutes = Math.floor(sessionLength);
  sessionLengthValue.textContent = sessionMinutes;
  breakLengthValue.textContent = breakLength;

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  sessionTimer.textContent = `${isSession ? 'Session' : 'Break'} ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Event listeners for changing session and break lengths
document.getElementById('increase-session').addEventListener('click', () => {
  if (!isRunning) {
    sessionLength += 1;
    currentTime = sessionLength * 60;
    updateDisplay();
  }
});

document.getElementById('decrease-session').addEventListener('click', () => {
  if (!isRunning && sessionLength > 1) {
    sessionLength -= 1;
    currentTime = sessionLength * 60;
    updateDisplay();
  }
});

document.getElementById('increase-break').addEventListener('click', () => {
  if (!isRunning) {
    breakLength += 1;
    updateDisplay();
  }
});

document.getElementById('decrease-break').addEventListener('click', () => {
  if (!isRunning && breakLength > 1) {
    breakLength -= 1;
    updateDisplay();
  }
});

// Event listener for the play button
playButton.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  }
});

// Event listener for the pause button
pauseButton.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  }
});

// Event listener for the reset button
resetButton.addEventListener('click', () => {
  resetTimer();
});

// Function to start the countdown timer
function startTimer() {
  isRunning = true;
  countdown = setInterval(() => {
    if (currentTime > 0) {
      currentTime -= 1;
      updateDisplay();
    } else {
      // Switch to the break or session
      isSession = !isSession;
      currentTime = isSession ? sessionLength * 60 : breakLength * 60;
    }
  }, 1000); // Update every second
}

// Function to pause the countdown timer
function pauseTimer() {
  isRunning = false;
  clearInterval(countdown);
}

// Function to reset the timer
function resetTimer() {
  isRunning = false;
  clearInterval(countdown);
  currentTime = sessionLength * 60; // Reset current time to session length
  updateDisplay();
}

// Initialize the display
updateDisplay();
