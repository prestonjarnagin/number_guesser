// Set up some initial variables. They'll change so they can't be const
var correct = 0;
var incorrect = 0;
var min = 0;
var max = 100;
var randomNumber

pry = require('pryjs')
eval(pry.it)
// Function to genertate new random number
function getRandomNumber()
{

  // If a decimal was entered for the min, it will be rounded up
  min = Math.ceil(min);
  // If a decimal was entered for the max, it will be rounded down
  max = Math.floor(max);

  // A random number is genertated between the min an max. Its rounded down to the nearest integer
  rand =  Math.floor(Math.random() * (max - min + 1)) + min;

  // Added a printout of the generated random numebr for debugging (or cheating)
  console.log(rand)

  //Return the result
  return rand
}

// The resetForm function is called when the button to clear the form is clicked.
// It disabled the appropriate buttons
function resetForm()
{
  // Reset form entries using JS
  document.getElementById('game-form').reset();

  // Get the buttons to disable
  guessButton = document.getElementById("guess-button")
  clearButton = document.getElementById("clear-button")

  // Disable the buttons
  disableButton(guessButton)
  disableButton(clearButton)
}

// submitForm is called when a user clicks the button to make their guess
// If a guess isn't entered the guess button won't be enabled, so no validations are needed.
function submitForm()
{
  // Pull out the value of the guess
  var guessedNumber = (document.getElementById("number").value);

  // Run the number through checkNumber
  checkNumber(guessedNumber);
  // Update the page to display what the last guess was
  document.getElementById("last-guess-display").innerText = guessedNumber;
}

// checkNumber takes in a guess and triggers one of a few options based on if
// the number was too high, too low, correct, or invalid
function checkNumber(number)
{
  // Case: Number is correct
  // 'number' is a string, so it cannot be compared using strictly equals
  if(number == randomNumber){
    // Helper method for when the correct number is guessed
    guessedCorrectNumber();
    // Get and enable the game reset button. May or may not already be enabled.
    resetButton = document.getElementById("reset-button")
    enableButton(resetButton, "javascript: resetGame();")
  }

  //Case: number isn't actually a number
  else if(isNaN(parseInt(number, 10))){
    // Helper method for when a NaN is entered
    guessedNaN();
  }
  //Case: number is out of range
  else if(number < min || number > max){
    // Helper method for when number isnt within user defined bounds
    guessedOutOfRange();
  }
  else{
    // Helper method for when number is correct
    guessedWrong(number);

    // Get and enable game reset button. Can be rewritten with helper method at
    // some point
    resetButton = document.getElementById("reset-button")
    resetButton.href = "javascript: resetGame();";
    resetButton.classList.remove("disabled-button");
    resetButton.classList.add("enabled-button");
  }
}

// Method to reset the game
function resetGame()
{
  // Change area that usually displays the last number guessed to say 'Game Reset'
  document.getElementById("last-guess-display").innerText = "Game Reset";

  // Reset scores
  correct = 0;
  incorrect = 0;

  //Gets a new random number
  randomNumber = getRandomNumber();

  // Gets and disables all buttons
  resetButton = document.getElementById("reset-button")
  guessButton = document.getElementById("guess-button")
  clearButton = document.getElementById("clear-button")
  disableButton(resetButton)
  disableButton(guessButton)
  disableButton(clearButton)
}

// checkNumber helper method. Handles a correct guess.
function guessedCorrectNumber(){
  //Increase score
  correct++;
  // Get a new random number
  randomNumber = getRandomNumber();
  // Give user feedback
  document.getElementById("guess-feedback").innerText = "BOOM! \n Incresing Upper and Lower Bounds by 10";
  // Helper method to increase difficulty
  increaseRange();
  // Update UI with current difficulty
  document.getElementById("guess-range-feedback").innerText = "Current Min: " + min + " \n " + "Current Max: " + max;
}

// checkNumber helper method. Handles a guess that is out of current bounds.
function guessedOutOfRange(){
  document.getElementById("guess-feedback").innerText = "That number is out of range. Please enter a number between " + min + " and " + max;
}

// checkNumber helper method. Handles a NaN guess.
function guessedNaN(){
  document.getElementById("guess-feedback").innerText = "That is not a number, try again";
}
// checkNumber helper method. Handles a correctly formatted, but wrong guess.
function guessedWrong(number){
  // Increase incorrect counter
  incorrect++

  // Gives feedback
  if(number > randomNumber){
    document.getElementById("guess-feedback").innerText = "That is too high";
  }
  else{
    document.getElementById("guess-feedback").innerText = "That is too low";
  }
}

// Checks the input of the guess field with each keypress
function validateInput(){
  // Grab number entry field, guess button, and clear button.
  guessField = document.getElementById("number")
  guessButton = document.getElementById("guess-button")
  clearButton = document.getElementById("clear-button")

  //If theres nothing in the number entry field, disable the buttons
  if (guessField.value === "") {
    disableButton(guessButton)
    disableButton(clearButton)
  }
  // Otherwise, enable the buttons
  else {
    enableButton(guessButton, "javascript: submitForm()")
    enableButton(clearButton, "javascript: resetForm()")
  }
}

// Helper method to enable a button. Takes in the button object and the
// href action the button should have
function enableButton(button, action){
  // Sets the action
  button.href = action
  // Swpas HTML classes for styling purposes
  button.classList.remove("disabled-button")
  button.classList.add("enabled-button")
}

// Helper method to enable a button. Takes in the button object.
function disableButton(button){
  // Removes any action the button may have had.
  button.href = ""
  // Swpas HTML classes for styling purposes
  button.classList.add("disabled-button")
  button.classList.remove("enabled-button")
}

// Used for validateion when user initially defines min and max bounds
function validateRange(){
  // Get the values entered
  min = document.getElementById("min-range-entry").value
  max = document.getElementById("max-range-entry").value

  // Parse the entries from strgin to integer. If either is NaN, give user feedback
  if(isNaN(parseInt(min, 10)) || isNaN(parseInt(max, 10))){
    document.getElementById("range-error-message").innerText = "That's Not a Valid Range"
  }
  // If neither of the entries are NaN...
  else{
    // Clear a error message that may have been previously displayed from the
    // if block above ^^^.
    document.getElementById("range-error-message").innerText = ""
    // Hide the range entry form. This makes the last line redundant, but it
    // feels claner I think.
    document.getElementById("range-form").style.display = "none";
    // Display the main game form
    document.getElementById("game-form").style.display = "block";
    // Display the starting range that user just defined.
    document.getElementById("guess-range-feedback").innerText = "Current Min: " + min + " \n " + "Current Max: " + max;
    //Get a new random number to start the game
    randomNumber = getRandomNumber()
  }
}

// Helper method to increase difficulty
function increaseRange(){
  min-=10;
  max+=10;
}
