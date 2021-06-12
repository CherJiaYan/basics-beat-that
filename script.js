var currentGameMode = "NUMBER_OF_PLAYERS";
var numberOfPlayers = 0;
var numberOfDicesPerGame = 0;
var player1 = " ";
var player2 = " ";
var player1Choices = [];
var player2Choices = [];
var tempWinner = [];
var player1WinCount = 0;
var player2WinCount = 0;
var player1DiceNumbers = " ";
var player2DiceNumbers = " ";

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomDiceNumber = randomInteger + 1;
  return randomDiceNumber;
};

// Player 1 to roll 2 dices. Display the 2 dices.
// Player 1 sees the number of the 2 dices.
// Player 1 decides how he/she wants to arrange.
// Player 1 inputs his/her decision.
// Store the decision in an array.
// Prompt Player 2 to roll the dice.
// Repeat.

var generateDiceNumbers = function () {
  var diceOne = diceRoll();
  var diceTwo = diceRoll();
  var diceNumbers = [diceOne, diceTwo];
  return diceNumbers;
};

var returnTempWinner = function () {
  var player1latestnumber = player1Choices[player1Choices.length - 1];
  var player2latestnumber = player2Choices[player2Choices.length - 1];
  if (player1latestnumber > player2latestnumber) {
    tempWinner.push(player1);
    player1WinCount += 1;
  } else if (player2latestnumber > player1latestnumber) {
    tempWinner.push(player2);
    player2WinCount += 1;
  } else if (player2latestnumber == player1latestnumber) {
    return `It is a draw!`;
  }
  return `${
    tempWinner[tempWinner.length - 1]
  } has won this round! Congratulations!`;
};

var returnLeaderBoard = function () {
  if (player1WinCount > player2WinCount) {
    return `${player1} Win Count: ${player1WinCount}<br>${player2} Win Count: ${player2WinCount}`;
  } else {
    return `${player2} Win Count: ${player2WinCount}<br>${player1} Win Count: ${player1WinCount}`;
  }
};

var generateDiceOrder = function (input) {
  if (currentGameMode == "GAME_STAGE_1") {
    if (input == player1DiceNumbers[0]) {
      return `${input}${player1DiceNumbers[1]}`;
    }
    return `${input}${player1DiceNumbers[0]}`;
  } else if (currentGameMode == "GAME_STAGE_3") {
    if (input == player2DiceNumbers[0]) {
      return `${input}${player2DiceNumbers[1]}`;
    }
    return `${input}${player2DiceNumbers[0]}`;
  }
};

var main = function (input) {
  if (currentGameMode == "NUMBER_OF_PLAYERS") {
    if (Number.isNaN(Number(input)) == true) {
      return `Sorry, please enter the number of players.`;
    }
    numberOfPlayers = Number(input);
    currentGameMode = "PLAYER_1_NAME";
    return `You have selected ${numberOfPlayers} players.<br><br>Please enter Player 1's name.`;
  } else if (currentGameMode == "PLAYER_1_NAME") {
    player1 = input;
    currentGameMode = "PLAYER_2_NAME";
    return `Player 1: ${player1}<br><br>Now, please enter Player's 2 name.`;
  } else if (currentGameMode == "PLAYER_2_NAME") {
    player2 = input;
    currentGameMode = "NUMBER_OF_DICES";
    return `Player 1: ${player1}<br>Player 2: ${player2}.<br><br>Now, please enter the number of dices for this game.`;
  } else if (currentGameMode == "NUMBER_OF_DICES") {
    if (Number.isNaN(Number(input)) == true) {
      return `Sorry, please enter the number of dices in this game.`;
    }
    numberOfDicesPerGame = Number(input);
    currentGameMode = "START_GAME";
    return `Welcome ${player1} & ${player2} to a game of Beat That!<br><br>Both of you have chosen ${numberOfDicesPerGame} dices for this game.<br><br>${player1}, please start by clicking "Submit" to roll the dice.`;
  } else if (currentGameMode == "START_GAME") {
    player1DiceNumbers = generateDiceNumbers();
    currentGameMode = "GAME_STAGE_1";
    return `Welcome ${player1}, you rolled:<br><br>Dice 1: ${player1DiceNumbers[0]}<br>Dice 2: ${player1DiceNumbers[1]}<br><br>Enter the largest number!`;
  } else if (currentGameMode == "GAME_STAGE_1") {
    var diceOrder = generateDiceOrder(input);
    player1Choices.push(diceOrder);
    currentGameMode = "GAME_STAGE_2";
    return `Great! ${player1}, you have entered ${input} and your number is ${diceOrder}.<br><br>${player2}, please click "Submit" to roll the dice.`;
  } else if (currentGameMode == "GAME_STAGE_2") {
    player2DiceNumbers = generateDiceNumbers();
    currentGameMode = "GAME_STAGE_3";
    return `Welcome ${player2}, you rolled:<br><br>Dice 1: ${player2DiceNumbers[0]}<br>Dice 2: ${player2DiceNumbers[1]}<br><br>Enter the largest number!`;
  } else if (currentGameMode == "GAME_STAGE_3") {
    var diceOrder = generateDiceOrder(input);
    player2Choices.push(diceOrder);
    var nameOfTempWinner = returnTempWinner();
    currentGameMode = "START_GAME";
    var leaderboardOutput = returnLeaderBoard();
    return `[Results]<br>${player1}, you have chosen number: ${
      player1Choices[player1Choices.length - 1]
    }.<br>${player2}, you have chosen number: ${
      player2Choices[player2Choices.length - 1]
    }<br><br>${nameOfTempWinner}<br><br>[LeaderBoard]<br>${leaderboardOutput}<br><br>${player1}, click "Submit" to roll the dice again!`;
  }
};
