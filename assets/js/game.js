
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  if (!promptFight) {
    window.alert("You need to provide a valid answer")
    return fightOrSkip();
  }

  //Conditional Recursive Function Call
  promptFight = promptFight.toLowerCase();

  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);

      //Return true if player wants to leave
      return true;
    }
  }
  return false;
};


var fight = function(enemy) {
  console.log(enemy);
  //Keep track of who goes first
  var isPlayerTurn = true;

  // Randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  //Repeat and execute as long as the enemy-robot is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
  //Ask player to fight or skip
      if (fightOrSkip()) {
        //If true, leave fight by breaking loop
        break;
     }

    //Generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    //Remove enemy's health by sbutracting amount we set in the damage variable
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );

    // Check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");

    //Award player money for winning
    playerInfo.money = playerInfo.money + 20;

    //leave while() loop since enemy is daed
      break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left."); 
    }
    
    // Player gets attacked first
  } else {
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    //Remove player's health by subtracting the amount we set in the damage variable
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

    // Check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      //Leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
  }
  //Switch turn order for next round
  isPlayerTurn = !isPlayerTurn;
 }
};


//Function to start a new game
var startGame = function() {
  
  //Reset player stats
  playerInfo.reset();

// fight each enemy-robot by looping over them and fighting them one at a time
for (var i = 0; i < enemyInfo.length; i++) {
  if (playerInfo.health > 0) {

    //Let player know what round they are in
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
    debugger;

    //Pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyObj = enemyInfo[i];

    // // //Reset enemy.health randomly before starting new fight 
    // pickedEnemyObj.health = randomNumber(40, 60);
    // console.log(pickedEnemyObj.health);

    //Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyObj);

    // If player is still alive and we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

      //Ask if palyer wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

      //If yes, take them to the store() function
      if (storeConfirm) {
        shop();
      }
    }
  }
  //If player robot is dead, stop the game
  else {
    window.alert("You have lost your robot in battle! Game Over!");
    break;
  }
}

//Play again
endGame();
};


//Function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!")

  //Check localStorage for high score, if it's not there, use 0
  var highScore = localStorage.getItem("highscore"); 
  if (highScore === null) {
    highScore = 0;
  }
  //Set new high score if player has more money than current high score
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
  }
  else {
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
  }
  //If player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }

  //Ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};


var shop = function () {
  //Ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);

  //Use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    
    case 2:
      playerInfo.upgradeAttack();
      break;

    case 3:
      window.alert("Leaving the store.");
      //Do nothing, so function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");
      //Call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

var getPlayerName = function() {
  var name = "";
  while (name === "" || name === null) {
  name = prompt("what is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
}

var playerInfo = {

  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },

  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },

  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};


var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
    health: randomNumber(40, 60)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
    health: randomNumber(40, 60)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
    health: randomNumber(40, 60)
  }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

//Start the game when the page loads
startGame();


