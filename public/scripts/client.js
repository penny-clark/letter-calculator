// USER INPUT PROCESSING FUNCTIONS------------------------------------------------------


// Function to check that input character is a letter
const letterChecker = function(letter) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphabetArray = alphabet.split('');
  let isLetter = false;
  alphabetArray.forEach(element => {if (element === letter) isLetter = true});
	return isLetter;
}

// Function to check that each character of the input is a letter
const stringCharValidator = function(inputString) {
 const inputStringArr = inputString.split('')
 let stringValid = true;
 inputStringArr.forEach(element => {if (letterChecker(element) === false) stringValid = false});
 return stringValid;
}

// Function to make sure input doesn't exceed 10 characters
const maxLengthValidator = function(inputString) {
  if (inputString.length > 10 ) return false;
  return true;
}

// Function to make sure input exists
const minLengthValidator = function(inputString) {
  if (inputString.length < 1 ) return false;
  return true;
}

// Function to convert input to corresponding numbers and add them up
const stringSumTotal = function(letters) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lettersArr = letters.toLowerCase().split('');
  const numbers = lettersArr.map(x => alphabet.indexOf(x) + 1);
  let total = 0;
  numbers.forEach(element => total += element)
  return total;
}

// Function to check if input is prime
const isPrime = function(number) {
  let factor = number - 1;
  while (factor > 1 && number % factor !== 0) {
   factor--;
  }
  if (factor === 1) return true;
  return false;
}

// INFORMATION DISPLAY FUNCTIONS------------------------------------------------------

//Shows the user the value of each letter they entered
const stringSumDetailDisplay = function(letters) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lettersArr = letters.toLowerCase().split('');
  const numbers = lettersArr.map(x => alphabet.indexOf(x) + 1);
  $('.results-total').append(`${lettersArr[0]} = ${numbers[0]}`)
  for (let i=1; i<lettersArr.length; i++) {
    $('.results-total').append("<br />" + `${lettersArr[i]} = ${numbers[i]}`)
  }
}

//Remaining character count display
const characterCounter = function () {
  const charLength = $(this).val().length;
  const maxChar = 10;
  let charLimitCount = maxChar - charLength;
  const counter = $(this).closest(".calculator-input").find(".counter");
  $(counter).text(charLimitCount);
};

// Calculation results display
const showResults = function(letterString) {
  $('.error-container').removeClass('error-visible').empty();
  $('.calculator-input').hide();
  $('.input-display').empty().append(`${letterString}`)
  stringSumDetailDisplay(letterString);
  const letterStringTotal = stringSumTotal(letterString)
  $('.results-total').append("<br />" + `The total is ${letterStringTotal}`)
  if (isPrime(letterStringTotal)) {
    $('.results-message').text(`${letterStringTotal} is a prime number`)
  } else {
    $('.results-message').text(`${letterStringTotal} is not a prime number`)
  }
  $('.results-container').slideDown();
}


// COLLECT AND RESET INPUT------------------------------------------------------

// Handle user input
const getInput = function() {
  // Get user input from text field
  const letterString = document.getElementById('input-text').value
  
  // Validate user input
  if(!stringCharValidator(letterString)) {
    return $('.error-container').empty().append("&#9888; This calculator only works with letters! Check your text and try again.").hide().addClass('error-visible').slideDown()
  }
  if(!maxLengthValidator(letterString)) {
    return $('.error-container').empty().append("&#9888; This calculator works with 10 letters max. Delete some letters and try again.").hide().addClass('error-visible').slideDown()
  }
  if(!minLengthValidator(letterString)) {
    return $('.error-container').empty().append("&#9888; Please enter at least one letter." + "<br />" + "(Zero is not a prime number, if you are wondering.)").hide().addClass('error-visible').slideDown()
  }

  // If input is valid, perform calculations and show results to user
  showResults(letterString)
}

// Reset the calculator when back button is pushed
const resetCalculator = function() {
  $('.results-container').slideUp();
  $('.calculator-input').slideDown();
  $('.results-total').empty();
  $('#input-text').val(``);
  $('.counter').text(`10`);
}

// DOCUMENT READY------------------------------------------------------

$(document).ready(function() {
  $('.results-container').hide();
  $("#input-text").on('keyup', characterCounter);
  calculateButton.addEventListener('click', getInput, false)
  backButton.addEventListener('click', resetCalculator, false)
});