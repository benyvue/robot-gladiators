var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);

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
    playerMoney = Math.max(0, playerMoney - 10); 
    console.log("playerMoney", playerMoney);
    break;
    }
  }
 
    //Generate random damage value based on player's attack power
    var damage = randomNumber(playerAttack - 3, playerAttack);

    enemyHealth = Math.max(0, enemyHealth - damage);
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
    
    //Generate random damage value based on enemy's attack power
    var damage = randomNumber(enemyAttack - 3, enemyAttack);

    playerHealth = Math.max(0, playerHealth - damage);
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

    //Reset enemyHealth randomly before startiong new fight 
    enemyHealth = randomNumber(40, 60);

    //use debugger to pause script from running and check what's going on at that moment in the code
    // debugger;

    //Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);

    // If player is still alive and we're not at the last enemy in the array
    if (playerHealth > 0 && i < enemyNames.length - 1) {

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

  //If palyer is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
      if (playerMoney >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      //Increase health and decrease money
      playerHealth = playerHealth + 20;
      playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
      break;
    
    case "UPGRADE": //New case
    case "upgrade":
      if (playerMoney >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      //Increase attack and decrease money
      playerAttack = playerAttack + 6;
      playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
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

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (21)) + 40;

  return value;
};

//Start the game when the page loads
startGame();


