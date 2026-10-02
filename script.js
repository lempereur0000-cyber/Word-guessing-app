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