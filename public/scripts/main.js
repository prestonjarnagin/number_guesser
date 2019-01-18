var correct = 0;
var incorrect = 0;
var min = 0;
var max = 100;
var randomNumber

function getRandomNumber()
{
  min = Math.ceil(min);
  max = Math.floor(max);
  rand =  Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(rand)
  return rand
}

function resetForm()
{
  document.getElementById('game-form').reset();
  guessButton = document.getElementById("guess-button")
  clearButton = document.getElementById("clear-button")

  disableButton(guessButton)
  disableButton(clearButton)
}

function submitForm()
{
  var guessedNumber = (document.getElementById("number").value);
  checkNumber(guessedNumber);
  document.getElementById("last-guess-display").innerText = guessedNumber;
}

function checkNumber(number)
{
  if(number == randomNumber){
    guessedCorrectNumber();
    resetButton = document.getElementById("reset-button")
    enableButton(resetButton, "javascript: resetGame();")
  }
  else if(isNaN(parseInt(number, 10))){
    guessedNaN();
  }
  else if(number < min || number > max){
    guessedOutOfRange();
  }
  else{
    guessedWrong(number);
    resetButton = document.getElementById("reset-button")
    resetButton.href = "javascript: resetGame();";
    resetButton.classList.remove("disabled-button");
    resetButton.classList.add("enabled-button");
  }
}

function resetGame()
{
  document.getElementById("last-guess-display").innerText = "Game Reset";
  correct = 0;
  incorrect = 0;
  randomNumber = getRandomNumber();

  resetButton = document.getElementById("reset-button")

  guessButton = document.getElementById("guess-button")

  clearButton = document.getElementById("clear-button")
  disableButton(resetButton)
  disableButton(guessButton)
  disableButton(clearButton)
}

function guessedCorrectNumber(){
  correct++;
  randomNumber = getRandomNumber();
  document.getElementById("guess-feedback").innerText = "BOOM! \n Incresing Upper and Lower Bounds by 10";
  increaseRange();
  document.getElementById("guess-range-feedback").innerText = "Current Min: " + min + " \n " + "Current Max: " + max;
}

function guessedOutOfRange(){
  document.getElementById("guess-feedback").innerText = "That number is out of range. Please enter a number between 1 and 100";
}

function guessedNaN(){
  document.getElementById("guess-feedback").innerText = "That is not a number, try again";
}

function guessedWrong(number){
  incorrect++
  if(number > randomNumber){
    document.getElementById("guess-feedback").innerText = "That is too high";
  }
  else{
    document.getElementById("guess-feedback").innerText = "That is too low";
  }
}

function validateInput(){
  guessField = document.getElementById("number")
  guessButton = document.getElementById("guess-button")
  clearButton = document.getElementById("clear-button")
  if (guessField.value === "") {
    disableButton(guessButton)
    disableButton(clearButton)
  }
  else {
    enableButton(guessButton, "javascript: submitForm()")
    enableButton(clearButton, "javascript: resetForm()")
  }
}

function enableButton(button, action){
  button.href = action
  button.classList.remove("disabled-button")
  button.classList.add("enabled-button")
}

function disableButton(button){
  button.href = ""
  button.classList.add("disabled-button")
  button.classList.remove("enabled-button")
}

function validateRange(){
  min = document.getElementById("min-range-entry").value
  max = document.getElementById("max-range-entry").value

  if(isNaN(parseInt(min, 10)) || isNaN(parseInt(max, 10))){
    document.getElementById("range-error-message").innerText = "That's Not a Valid Range"
  }
  else{
    document.getElementById("range-error-message").innerText = ""

    document.getElementById("range-form").style.display = "none";
    document.getElementById("game-form").style.display = "block";

    randomNumber = getRandomNumber()
  }

}

function increaseRange(){
  min-=10;
  max+=10;
}
