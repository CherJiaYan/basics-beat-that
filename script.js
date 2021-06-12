var rollTheDice = function () {
  var randomDecimal = Math.random() * 6;
  var diceNumber = Math.ceil(randomDecimal);
  return diceNumber;
};

// GAME_MODES
var GAME_MODE_ENTER_NUM_PLAYERS = "ENTER_NUM_PLAYERS";
var GAME_MODE_ENTER_NUM_DICE = "ENTER_NUM_DICE";
var GAME_MODE_ROLL_THE_DICE = "ROLL_THE_DICE";
var GAME_MODE_ENTER_INDEX_SEQUENCE = "ENTER_INDEX_SEQUENCE";
var GAME_MODE_LEADERBOARD = "LEADERBOARD";
var gameMode = GAME_MODE_ENTER_NUM_PLAYERS;

// GLOBAL_VARIABLES
var currentPlayer = 1;
var numberOfPlayers = 0;
var numberOfDice = 0;
var numberOfRounds_PlayedByEachPlayer = [];
var numberOfWins_ByEachPlayer = [];
var diceRollArray = []; // must be numbers
var combinedNumberArray = [];

var incrementNumberOfRoundsPlayedByEachPlayer = function () {
  var currPlayerIndex = currentPlayer - 1;
  numberOfRounds_PlayedByEachPlayer[currPlayerIndex] += 1;
};

var incrementNumberOfWinsOfEachPlayer = function (returnIndexOfHighestNumber) {
  numberOfWins_ByEachPlayer[returnIndexOfHighestNumber] += 1;
};

var generateDiceValues = function () {
  var arrayOfDiceNumbers = [];
  var diceCounter = 0;

  while (diceCounter < numberOfDice) {
    var diceNumber = Number(rollTheDice());
    arrayOfDiceNumbers.push(diceNumber);
    diceCounter += 1;
  }

  return arrayOfDiceNumbers; // this array is working fine.
};

var concatenanteRandomDigitNumbers = function (input) {
  var splitArray = input.split("");
  console.log(`User input index = ${splitArray}`);
  var splitArrayOfNumbers = splitArray.map(Number);
  var combinedNumber = [];

  var diceCounter = 0;
  while (diceCounter < numberOfDice) {
    var arrayIndexNumber = splitArrayOfNumbers[diceCounter];
    Number(arrayIndexNumber);
    var preCombinedNumber = diceRollArray[arrayIndexNumber];
    Number(preCombinedNumber);
    combinedNumber.push(preCombinedNumber);
    `Return final combined number based on user input of index = ${combinedNumber}`;
    diceCounter += 1;
  }

  return combinedNumber;
};

var returnNumberAsInteger = function (combinedNumber) {
  var integer = "";
  var diceCounter = 0;

  while (diceCounter < numberOfDice) {
    integer = `${integer}${combinedNumber[diceCounter]}`;
    diceCounter += 1;
  }

  return integer;
};

var indexOfMaxInArray = function (combinedNumberArrayNumber) {
  if (combinedNumberArrayNumber.length == 0) {
    return -1;
  }

  var max = combinedNumberArrayNumber[0];
  var maxIndex = 0;

  for (var i = 1; i < combinedNumberArrayNumber.length; i++) {
    if (combinedNumberArrayNumber[i] > max) {
      maxIndex = i;
      max = combinedNumberArrayNumber[i];
    }
  }

  return maxIndex;
};

var main = function (input) {
  if (gameMode == GAME_MODE_ENTER_NUM_PLAYERS) {
    numberOfPlayers = Number(input);
    numberOfRounds_PlayedByEachPlayer = Array(numberOfPlayers).fill(0);
    numberOfWins_ByEachPlayer = Array(numberOfPlayers).fill(0);
    gameMode = GAME_MODE_ENTER_NUM_DICE;
    return `Welcome to Beat That! You have chosen to play with ${numberOfPlayers} players.<br><br>Player ${currentPlayer}, please enter the number of dice you want to roll.`;
  }

  if (gameMode == GAME_MODE_ENTER_NUM_DICE) {
    numberOfDice = Number(input);
    gameMode = GAME_MODE_ROLL_THE_DICE;
    return `Hi player ${currentPlayer}, you have chosen to roll ${numberOfDice} dice. Please click "SUBMIT" to start the game!`;
  }

  if (gameMode == GAME_MODE_ROLL_THE_DICE) {
    console.log(`Current Player: ${currentPlayer}`);
    incrementNumberOfRoundsPlayedByEachPlayer();
    diceRollArray = generateDiceValues();
    console.log(`Dice roll numbers = ${diceRollArray}`);
    gameMode = GAME_MODE_ENTER_INDEX_SEQUENCE;
    return `Hi player ${currentPlayer}:<br>Dice Roll Values: ${diceRollArray}.`;
  }

  if (gameMode == GAME_MODE_ENTER_INDEX_SEQUENCE) {
    var combinedNumber = concatenanteRandomDigitNumbers(input);
    var integer = Number(returnNumberAsInteger(combinedNumber));
    console.log(`integer = ${integer}`);

    combinedNumberArray.push(integer); // keep track of all players' combined numbers during that round
    console.log(`Combined Number Array = ${combinedNumberArray}`);

    var nextPlayer = (currentPlayer % numberOfPlayers) + 1;
    console.log(`Next Player: Player ${nextPlayer}`);
    console.log(`-------------------------------------`);

    var outputMessage = `Hi player ${currentPlayer}, your number is ${integer}.`;

    if (currentPlayer == numberOfPlayers) {
      gameMode = GAME_MODE_LEADERBOARD;
      return `${outputMessage} Please click on "Submit" to see who won!`;
    }

    currentPlayer = nextPlayer;
    gameMode = GAME_MODE_ROLL_THE_DICE;
    return `${outputMessage} Player ${currentPlayer}, please click "SUBMIT" to roll the dice!`;
  }

  if (gameMode == GAME_MODE_LEADERBOARD) {
    var combinedNumberArrayNumber = combinedNumberArray.map(Number);
    var returnIndexOfHighestNumber = Number(
      indexOfMaxInArray(combinedNumberArrayNumber)
    ); // Index of highest number + 1 = player

    incrementNumberOfWinsOfEachPlayer(returnIndexOfHighestNumber);
    console.log(`Winning array = ${numberOfWins_ByEachPlayer}`);
    console.log(`Total rounds played = ${numberOfRounds_PlayedByEachPlayer}`);
    console.log(
      `-------------------------------------------------------------`
    );

    var myOutputMessage = generateOutputMessage();
    currentPlayer = 1;
    diceRollArray = [];
    gameMode = GAME_MODE_ROLL_THE_DICE;
    combinedNumberArray = [];
    return `${myOutputMessage}<br>Click on "submit" button to start a new round!`;
  }
};

var generateOutputMessage = function (input) {
  var outputMessage = "";
  var playerCounter = 0;

  while (playerCounter < numberOfPlayers) {
    var player = playerCounter + 1;
    var winCount = numberOfWins_ByEachPlayer[playerCounter];
    var lossCount =
      numberOfRounds_PlayedByEachPlayer[playerCounter] -
      numberOfWins_ByEachPlayer[playerCounter];
    outputMessage = `${outputMessage}Player ${player}<br>Win count: ${winCount}<br>Lose count: ${lossCount}<br><br>`;
    playerCounter += 1;
  }
  return outputMessage;
};
