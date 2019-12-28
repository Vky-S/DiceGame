var DOM = {
    player_1 : ".player-1",
    player_1_score : ".player-1-score",
    player_2 : ".player-2",
    player_2_score : ".player-2-score",
    dice_img_1 : ".dice-img-1",
    dice_img_2 : ".dice-img-2",
    final_score : ".final-score",
    roll_dice : ".roll-dice",
    hold : ".hold",
    new_game : ".new-game-text",
    dice_img : ".dice-img-section",
    final_score_value : ".final-score-value"
};

var currentPlayer, currentScore, dice_1, dice_2, newHoldScore, oldHoldScore, overallScore;

document.querySelector(DOM.roll_dice).addEventListener("click", roll);
document.querySelector(DOM.hold).addEventListener("click", hold);
document.querySelector(DOM.new_game).addEventListener("click", newGame);
document.querySelector(DOM.final_score).addEventListener("keypress", finalScoreValue);

currentScore = 0;
currentPlayer = 1;

// ROLL Dice
function roll() {
    document.querySelector(DOM.dice_img).style.display = "block";

    dice_1 = Math.floor((Math.random() * 6) + 1);
    dice_2 = Math.floor((Math.random() * 6) + 1);

    document.querySelector(DOM.dice_img_1).src = "./images/dice-"+ dice_1 +".png";
    document.querySelector(DOM.dice_img_2).src = "./images/dice-"+ dice_2 +".png";

    currentScore += (dice_1 + dice_2);
    document.querySelector(".current-value-" + currentPlayer).innerHTML = currentScore;

    if (dice_1 == 1 || dice_2 == 1) {
      document.querySelector(".current-value-" + currentPlayer).innerHTML = 0;
      document.querySelector(".current-value-" + currentPlayer).innerHTML = 0;

      currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1;
      currentScore = 0;

      document.querySelector(DOM.player_1).classList.toggle("active");
      document.querySelector(DOM.player_2).classList.toggle("active");

    }
}

// HOLD
function hold() {
  newHoldScore = document.querySelector(".current-value-" + currentPlayer).textContent;
  oldHoldScore = document.querySelector(".player-"+ currentPlayer +"-score").textContent;
  overallScore = Number(newHoldScore) + Number(oldHoldScore);
  document.querySelector(".player-"+ currentPlayer +"-score").textContent = overallScore;

  currentScore = 0;
  document.querySelector(".current-value-" + currentPlayer).innerHTML = currentScore;

  if (overallScore >= scoreValue) {
    document.querySelector(".player-"+ currentPlayer +"-text").insertAdjacentHTML("beforebegin",'<div class="winner">!!!-WINNER-!!!</div>');
    document.querySelector(DOM.roll_dice).removeEventListener("click", roll);
    document.querySelector(DOM.hold).removeEventListener("click", hold);
    document.querySelector(DOM.final_score).removeEventListener("keypress", finalScoreValue);
  }
}

// NEW GAME
function newGame() {
  document.querySelector(".winner").remove();
  document.querySelector(DOM.final_score_value).style.display = "none";
  document.querySelector(DOM.final_score).style.display = "block";
  document.querySelector(DOM.final_score).value = "";

  document.querySelector(DOM.player_1).classList.add("active");
  document.querySelector(DOM.player_2).classList.remove("active");

  document.querySelector(".current-value-1").innerHTML = 0;
  document.querySelector(".current-value-2").innerHTML = 0;

  document.querySelector(".player-1-score").textContent = 0;
  document.querySelector(".player-2-score").textContent = 0;

  document.querySelector(DOM.dice_img).style.display = "none";
}

// FINAL SCORE
function finalScoreValue(e) {
  scoreValue = document.querySelector(DOM.final_score).value;
    if (isNaN(scoreValue) || scoreValue == " ") {
      document.querySelector(DOM.final_score).value = " ";
      alert("Please enter only number!");
    } else if (e.code == "Enter" && scoreValue != " ") {
      document.querySelector(DOM.final_score).style.display = "none";
      document.querySelector(DOM.final_score_value).textContent = "Final Score set is "+ scoreValue;
      document.querySelector(DOM.final_score_value).style.display = "block";
      if (overallScore >= scoreValue) {
        document.querySelector(".player-"+ currentPlayer +"-text").insertAdjacentHTML("beforebegin",'<div class="winner">!!!-WINNER-!!!</div>');
        document.querySelector(DOM.roll_dice).removeEventListener("click", roll);
        document.querySelector(DOM.hold).removeEventListener("click", hold);
        document.querySelector(DOM.final_score).removeEventListener("keypress", finalScoreValue);
      }
    }
}


//
