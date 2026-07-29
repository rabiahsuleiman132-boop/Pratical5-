/**
 * Task 5.4: Event-Driven Real-time Form Validation Engine
 */

// Gather DOM nodes securely
const nameInput = document.getElementById("userName");
const emailInput = document.getElementById("userEmail");
const phoneInput = document.getElementById("userPhone");
const passwordInput = document.getElementById("userPassword");
const submitBtn = document.getElementById("submitBtn");

// Attach live "input" event listeners to track user typing metrics
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
passwordInput.addEventListener("input", validatePassword);

/**
 * Validates Name field: Required, Minimum 3 characters
 */
function validateName() {
  const val = nameInput.value.trim();
  const error = document.getElementById("nameError");

  if (val.length >= 3) {
    setValid(nameInput, error);
    return true;
  } else {
    setInvalid(nameInput, error);
    return false;
  }
}

/**
 * Validates Email field: Must contain '@' and '.'
 */
function validateEmail() {
  const val = emailInput.value.trim();
  const error = document.getElementById("emailError");

  if (val.includes("@") && val.includes(".")) {
    setValid(emailInput, error);
    return true;
  } else {
    setInvalid(emailInput, error);
    return false;
  }
}

/**
 * Validates Phone field: Must start with "0" and be exactly 11 digits long
 */
function validatePhone() {
  const val = phoneInput.value.trim();
  const error = document.getElementById("phoneError");

  // Check if input consists only of digits, starts with 0, and has length of 11
  const isAllDigits = /^\d+$/.test(val);

  if (val.startsWith("0") && val.length === 11 && isAllDigits) {
    setValid(phoneInput, error);
    return true;
  } else {
    setInvalid(phoneInput, error);
    return false;
  }
}

/**
 * Validates Password field: Minimum 8 characters
 */
function validatePassword() {
  const val = passwordInput.value;
  const error = document.getElementById("passwordError");

  if (val.length >= 8) {
    setValid(passwordInput, error);
    return true;
  } else {
    setInvalid(passwordInput, error);
    return false;
  }
}

/**
 * UI Modifier Helpers: Toggles state appearance based on verification rules
 */
function setValid(inputEl, errorEl) {
  inputEl.classList.remove("invalid-input");
  inputEl.classList.add("valid-input");
  errorEl.style.display = "none";
  checkFormCompletion();
}

function setInvalid(inputEl, errorEl) {
  inputEl.classList.remove("valid-input");
  inputEl.classList.add("invalid-input");
  errorEl.style.display = "block";
  checkFormCompletion();
}

/**
 * Evaluates all fields together to manage overall submit button state
 */
function checkFormCompletion() {
  const isNameValid = nameInput.value.trim().length >= 3;
  const isEmailValid =
    emailInput.value.trim().includes("@") &&
    emailInput.value.trim().includes(".");
  const isPhoneValid =
    phoneInput.value.trim().startsWith("0") &&
    phoneInput.value.trim().length === 11 &&
    /^\d+$/.test(phoneInput.value.trim());
  const isPasswordValid = passwordInput.value.length >= 8;

  // Enable button only if all validation passes successfully
  if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// Block submission actions during testing cycles
function preventSubmit(e) {
  e.preventDefault();
  alert("Form submitted successfully! Excellent validation compliance.");
}
