//Dice backend controller
const diceController = (function() {
  let diceValues = {
    dice1: 0,
    dice2: 0
  };
  const randomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  return {
    diceRoll: function() {
      diceValues.dice1 = randomNumber();
      diceValues.dice2 = randomNumber();

      return diceValues;
    }
  };
})();

//Dice frontend controller
const uIController = (function() {
  let domStrings = {
    diceImage1: "#dice-image-1",
    diceImage2: "#dice-image-2",
    rollBtnName: "#rollBtn"
  };
  return {
    getDomString: function() {
      return domStrings;
    },
    updateDiceImage: function(dice) {
      document.querySelector(
        domStrings.diceImage1
      ).src = `images/dice-${dice.dice1}.png`;
      document.querySelector(
        domStrings.diceImage2
      ).src = `images/dice-${dice.dice2}.png`;
      console.log(dice);
    }
  };
})();

//controller
const controller = (function(uIcontroller, diceController) {
  let domStrings = uIcontroller.getDomString();

  const updateDiceImage = () => {
    uIcontroller.updateDiceImage(diceController.diceRoll());
  };

  const setUpEventListner = () => {
    document
      .querySelector(domStrings.rollBtnName)
      .addEventListener("click", updateDiceImage);
  };

  return {
    init: function() {
      console.log("Application has started");
      setUpEventListner();
    }
  };
})(uIController, diceController);

controller.init();
