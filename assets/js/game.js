
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

  //Repeat and execute as long as the enemy-robot is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
  //Ask player to fight or skip
    if (fightOrSkip()) {
      //If true, leave fight by breaking loop
      break;
    }
 
    //Generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

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
    
    //Generate random damage value based on enemy's attack power
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

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

  //If palyer is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }

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
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );


  //Use switch to carry out action
  switch (shopOptionPrompt) {

    case "REFILL": //New case
    case "refill":
      playerInfo.refillHealth();
      break;
    
    case "UPGRADE": //New case
    case "upgrade":
      playerInfo.upgradeAttack();
      break;

    case "LEAVE": //New case
    case "leave":
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


