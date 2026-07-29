/**
 * Task 5.3: Nigerian States Quiz Dataset
 * Clean, production-ready array with 10 state-capital pairs.
 */
const quizData = [
  { state: "Niger", capital: "Minna" },
  { state: "Federal Capital Territory", capital: "Abuja" },
  { state: "Lagos", capital: "Ikeja" },
  { state: "Kano", capital: "Kano" },
  { state: "Kaduna", capital: "Kaduna" },
  { state: "Anambra", capital: "Awka" },
  { state: "Oyo", capital: "Ibadan" },
  { state: "Rivers", capital: "Port Harcourt" },
  { state: "Borno", capital: "Maiduguri" },
  { state: "Edo", capital: "Benin City" },
];

let score = 0;
let totalQuestions = 0;
let currentPair = null;

// Fires immediately when the browser finishes rendering the DOM structures
window.onload = function () {
  generateNextQuestion();
};

/**
 * Selects a random state item from the tracking array
 */
function generateNextQuestion() {
  // Reset all user interaction tools cleanly
  document.getElementById("capitalInput").value = "";
  document.getElementById("capitalInput").disabled = false;
  document.getElementById("submitBtn").disabled = false;

  const feedbackBox = document.getElementById("feedbackBox");
  feedbackBox.style.display = "none";
  feedbackBox.className = "feedback-display";

  document.getElementById("nextBtn").style.display = "none";

  // Grab a random index position from the data array
  const randomIndex = Math.floor(Math.random() * quizData.length);
  currentPair = quizData[randomIndex];

  // Swap out "Loading..." with the selected state name string
  document.getElementById("statePrompt").textContent = currentPair.state;
  document.getElementById("capitalInput").focus();
}

/**
 * Validates user text input against the correct capital data token
 */
function checkAnswer() {
  const userInput = document.getElementById("capitalInput").value.trim();
  const feedbackBox = document.getElementById("feedbackBox");

  if (userInput === "") {
    alert("Please type a capital city name before submitting your answer.");
    return;
  }

  // Freeze controls while displaying feedback indicators
  document.getElementById("capitalInput").disabled = true;
  document.getElementById("submitBtn").disabled = true;

  totalQuestions++;
  document.getElementById("totalAnswered").textContent = totalQuestions;

  // Standardize comparison values to avoid case-sensitivity failures
  const sanitizedGuess = userInput.toLowerCase();
  const correctAnswer = currentPair.capital.toLowerCase();

  if (sanitizedGuess === correctAnswer) {
    score++;
    document.getElementById("currentScore").textContent = score;

    feedbackBox.innerHTML = "Correct! Well done.";
    feedbackBox.className = "feedback-display feedback-correct";
  } else {
    feedbackBox.innerHTML = `Wrong! The capital is ${currentPair.capital}.`;
    feedbackBox.className = "feedback-display feedback-wrong";
  }

  // Reveal result banners and navigation commands
  feedbackBox.style.display = "block";
  document.getElementById("nextBtn").style.display = "block";
}

// Catch enter key mechanics inside the input field for desktop fluidity
document
  .getElementById("capitalInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !document.getElementById("submitBtn").disabled) {
      checkAnswer();
    }
  });
