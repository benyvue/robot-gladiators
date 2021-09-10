var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

var fight = function(enemyName) {
  //Repeat and execute as long as the enemy-robot is alive
  while (playerHealth > 0 && enemyHealth > 0) {
  //Ask player to fight or skip
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT or "SKIP" to choose.');
  
      // if player chooses to skip
  if (promptFight === "skip" || promptFight === "SKIP") {
    //confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    //if yes (true), leave fight
  if (confirmSkip) {
    window.alert(playerName + " has decided to skip this fight. Goodbye!");
    playerMoney = playerMoney - 10; 
    console.log("playerMoney", playerMoney);
    break;
    }
  }
 
    // remove enemy's health by sbutracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // Check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");

    //Award player money for winning
    playerMoney = playerMoney + 20;

    //leave while() loop since enemy is daed
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left."); 
    }
    
    // remove player's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

    // Check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      //Leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
};


//Function to start a new game
var startGame = function() {
  //Reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

// fight each enemy-robot by looping over them and fighting them one at a time
for (var i = 0; i < enemyNames.length; i++) {
  if (playerHealth > 0) {

    //Let player know what round they are in
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );

    //Pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    //Reset enemyHealth before startiong new fight
    enemyHealth= 50;

    //use debugger to pause script from running and check what's going on at that moment in the code
    // debugger;

    //Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);
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

  //If palyer is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  }
  else {
    window.alert("TYou've lost your robot in battle.");
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

//Start the game when the page loads
startGame();

