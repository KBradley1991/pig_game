const diceController = (function() {
  const WinningScore = 100;
  let gameStatus = true;
  let players = {
    activePlayer: 1,
    player1: {
      roundScore: 0,
      fullScore: 0
    },
    player2: {
      roundScore: 0,
      fullScore: 0
    }
  };

  const randomNumberGenarator = () => {
    return Math.floor(Math.random() * 6 + 1);
  };

  return {
    rollDice: () => {
      const activePlayer = "player" + players.activePlayer;
      console.log("## " + activePlayer);
      const dice = {
        dice1: randomNumberGenarator(),
        dice2: randomNumberGenarator(),
        sum: function() {
          return this.dice1 + this.dice2;
        }
      };
      if (dice.dice1 === 1 || dice.dice2 === 1) {
        players[activePlayer].fullScore = 0;
        players[activePlayer].roundScore = 0;
        players.activePlayer === 1
          ? (players.activePlayer = 2)
          : (players.activePlayer = 1);
      } else {
        players[activePlayer].fullScore += dice.sum();
        players[activePlayer].roundScore = dice.sum();
      }
      return dice;
    },
    getActivePlyer: () => {
      return players.activePlayer;
    },
    setActivePlyer: function(player) {
      players.activePlayer = player;
    },
    getPlayers: () => {
      return players;
    },
    checkIfGameOver: () => {
      if (
        players.player1.fullScore >= WinningScore ||
        players.player2.fullScore >= WinningScore
      ) {
        gameStatus = false;
      }
      return gameStatus;
    },
    changeActiveUser: () => {
      players.activePlayer === 1
        ? (players.activePlayer = 2)
        : (players.activePlayer = 1);
    },
    newGame: () => {
      players.player1.fullScore = 0;
      players.player1.roundScore = 0;
      players.player2.fullScore = 0;
      players.player2.roundScore = 0;
      gameStatus = true;
    }
  };
})();

const uIController = (function() {
  const domStrings = {
    diceImage1: "#dice-image-1",
    diceImage2: "#dice-image-2",
    rollDiceBtn: ".roll-dice",
    holdDiceBtn: ".hold-btn",
    playerScoreCard: "#player-score-",
    activePlayer: ".player-score-",
    player1RndScro: "#player-score-1",
    player2RndScro: "#player-score-2",
    player1totalScore: "#player-1-totalscore",
    player2totalScore: "#player-2-totalscore",
    rulesLink: ".game-rules",
    gameRules: ".rules-section",
    bodySection: ".body-section",
    newGameBtn: ".new-btn"
  };
  let ruleButnStatus = false;
  return {
    domString: function() {
      return domStrings;
    },
    updateScore: function(activePlayer) {},
    updateDice: function(dice) {
      document.querySelector(
        domStrings.diceImage1
      ).src = `images/dice-${dice.dice1}.png`;
      document.querySelector(
        domStrings.diceImage2
      ).src = `images/dice-${dice.dice2}.png`;
      console.log(`dice value 1 ${dice.dice1} dice value 2 ${dice.dice2}`);
    },
    updateScore: function(player, score) {
      document.querySelector(
        domStrings.playerScoreCard + player
      ).innerHTML = score;
    },
    updateScoreBoard: function(players) {
      document.querySelector(domStrings.player1RndScro).innerHTML =
        players.player1.roundScore;
      document.querySelector(domStrings.player1totalScore).innerHTML =
        players.player1.fullScore;
      document.querySelector(domStrings.player2RndScro).innerHTML =
        players.player2.roundScore;
      document.querySelector(domStrings.player2totalScore).innerHTML =
        players.player2.fullScore;

      console.log(players);
    },
    updateActivePlayer: function(player) {
      const nonActivePlayer = player === 1 ? 2 : 1;
      document
        .querySelector(domStrings.activePlayer + player)
        .classList.add("active");
      document
        .querySelector(domStrings.activePlayer + nonActivePlayer)
        .classList.remove("active");
      console.log(`non active player ${nonActivePlayer}`);
    },
    displayRules: () => {
      if (ruleButnStatus === false) {
        document.querySelector(domStrings.gameRules).style.display = "block";
        document.querySelector(domStrings.bodySection).style.display = "none";
        document.querySelector(domStrings.rulesLink).innerHTML =
          "<< Back to Home";
        ruleButnStatus = true;
      } else {
        document.querySelector(domStrings.gameRules).style.display = "none";
        document.querySelector(domStrings.bodySection).style.display = "block";
        document.querySelector(domStrings.rulesLink).innerHTML = "Game Rules";
        ruleButnStatus = false;
      }
    }
  };
})();

const controller = (function(uIController, diceController) {
  const domStrings = uIController.domString();

  const updateScoreBoard = () => {
    let gameStatus = diceController.checkIfGameOver();
    if (gameStatus === true) {
      let diceValues = diceController.rollDice();
      uIController.updateDice(diceValues);
      uIController.updateActivePlayer(diceController.getActivePlyer());
      uIController.updateScoreBoard(diceController.getPlayers());
    } else {
      console.log("game is dead");
    }
  };

  const changeActiveUser = () => {
    diceController.changeActiveUser();
    uIController.updateActivePlayer(diceController.getActivePlyer());
  };

  const newGame = () => {
    diceController.newGame();
    uIController.updateScoreBoard(diceController.getPlayers());
  };

  const setUPEventListner = () => {
    document
      .querySelector(domStrings.rollDiceBtn)
      .addEventListener("click", updateScoreBoard);
    document
      .querySelector(domStrings.holdDiceBtn)
      .addEventListener("click", changeActiveUser);
    document
      .querySelector(domStrings.rulesLink)
      .addEventListener("click", uIController.displayRules);
    document
      .querySelector(domStrings.newGameBtn)
      .addEventListener("click", newGame);
  };

  return {
    init: function() {
      console.log("Application has started");
      uIController.updateActivePlayer(diceController.getActivePlyer());
      setUPEventListner();
    }
  };
})(uIController, diceController);

controller.init();
