// Game setup variables
const secretWord = "PLANET"; // Secret 6-letter science word for our MVP
let guessCount = 0;
const maxGuesses = 20;

// Grab DOM elements
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const guessCounter = document.getElementById("guess-counter");

// Listen for when the player submits a guess
guessForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Stop page from refreshing
  
  const userGuess = guessInput.value.toUpperCase();
  console.log("User guessed:", userGuess);
  
  // Clear the input box for the next guess
  guessInput.value = "";
});
// Game setup variables
const secretWord = "PLANET"; // Secret 6-letter word for our MVP
let guessCount = 0;
const maxGuesses = 20;

// DOM elements
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const guessCounter = document.getElementById("guess-counter");
const temperatureBar = document.getElementById("temperature-bar");
const temperatureLabel = document.getElementById("temperature-label");
const statusMessage = document.getElementById("status-message");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");

// Calculate matching letters to determine "temperature"
function calculateMatchScore(guess, target) {
  let matches = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      matches++;
    }
  }
  return matches;
}

// Update the thermometer bar visual based on score
function updateThermometer(matches, length) {
  // Percentage based on matching characters
  const percentage = Math.max(10, Math.round((matches / length) * 100));
  temperatureBar.style.width = percentage + "%";

  if (matches === length) {
    temperatureBar.style.background = "linear-gradient(to right, #ff416c, #ff4b2b)";
    temperatureLabel.textContent = "BOILING HOT! 🔥";
  } else if (matches >= 4) {
    temperatureBar.style.background = "linear-gradient(to right, #f857a6, #ff5858)";
    temperatureLabel.textContent = "Very Warm! ☀️";
  } else if (matches >= 2) {
    temperatureBar.style.background = "linear-gradient(to right, #f7b731, #eb3b5a)";
    temperatureLabel.textContent = "Lukewarm 🌤️";
  } else {
    temperatureBar.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
    temperatureLabel.textContent = "Freezing Cold! ❄️";
  }
}

// Event listener for submitting guesses
guessForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const userGuess = guessInput.value.toUpperCase();

  // Validate length
  if (userGuess.length !== secretWord.length) {
    statusMessage.textContent = `Please enter a ${secretWord.length}-letter word.`;
    return;
  }

  guessCount++;
  guessCounter.textContent = `Guesses: ${guessCount} / ${maxGuesses}`;

  // Check matching letters
  const matches = calculateMatchScore(userGuess, secretWord);
  updateThermometer(matches, secretWord.length);

  // Check Win Condition
  if (userGuess === secretWord) {
    statusMessage.textContent = `🎉 Congratulations! You guessed the secret word "${secretWord}" in ${guessCount} attempts!`;
    endGame();
  } else if (guessCount >= maxGuesses) {
    // Check Loss Condition
    statusMessage.textContent = `❌ Game Over! You ran out of guesses. The secret word was "${secretWord}".`;
    endGame();
  } else {
    statusMessage.textContent = `Match score: ${matches} / ${secretWord.length} letters in correct position.`;
  }

  guessInput.value = "";
});

function endGame() {
  guessInput.disabled = true;
  submitBtn.disabled = true;
  restartBtn.style.display = "inline-block";
}

// Restart button logic
restartBtn.addEventListener("click", function() {
  guessCount = 0;
  guessCounter.textContent = `Guesses: 0 / ${maxGuesses}`;
  statusMessage.textContent = "";
  temperatureBar.style.width = "10%";
  temperatureBar.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
  temperatureLabel.textContent = "Cold";
  guessInput.disabled = false;
  submitBtn.disabled = false;
  restartBtn.style.display = "none";
  guessInput.value = "";
});