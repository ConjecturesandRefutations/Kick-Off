Kick Off
---------------

Description
---------------
Kick Off is a game in which the player has the objective of moving a ball into the goal at the top of the screen. The player can move up, down, left and right. Whenever a user scores a goal, their score increases by one. The user must avoid opponents. If the player makes contact with an opponent (is tackled), the opponent's score increases by one. The game ends when the 45 second time-limit is up. Both the current score and the time remaining are displayed to the user. The final score is also displayed after the game ends. The ultimate objective is to score more goals than the opponent.

MVP (DOM - CANVAS)
----------------
Game has ball that moves in all directions
Opponents generate and move across the screen
Collision detection (the possibility of being tackled)
Getting tackled ends the game
Scoring ends the game

Backlog
----------------
Scoring a goal adds to the player's score (rather than ending the game)
Getting tackled adds to the opponent's score (rather than ending the game)
Game has a time limit
Scores and remaining time are displayed to the user
Audio effects

Data Structure
----------------

index.html/styles.css
................
splashScreen display
gameScreen
restartButton display
mainMenuButton display
restartButton display
mainMenuButton display
endGame display

index.js
.................
splashScreen() functionality
gameScreen()
restartButton() functionality
mainMenuButton() functionality
restartButton() functionality
mainMenuButton() functionality
endGame() functionality
checkCollisions()
drawCanvas()


game.js
.................
class Game{}

ball.js
.................
class Ball{}

obstacle.js
.................
class Obstacle{}
class Messi{}

countdown.js
.................
updateCountDown()

audio.js
.................
all audio variables


States and States Transitions
----------------

splashScreen
gameScreen
gameOverScreen

Task
---------------
Build Dom
Build Game Screen
Build Opening Screen
Build Starting Screen
Build Button Functionality
Add Event Listener
Start loop
End loop
Ball Class
Obstacle Classes
Scoring and Conceding Functionality and Display
Collision Detection
Count Down

Links
---------------

Trello
..............
https://trello.com/b/HFZgxMlR/kick-off

Git
..............
https://github.com/ConjecturesandRefutations/Kick-Off-Project
https://conjecturesandrefutations.github.io/Kick-Off-Project/

Slides
..............
https://docs.google.com/presentation/d/1qT5JyTCzIwdv4UWrG213OprfOMJfxAZdqBQ98Clmxrw/edit#slide=id.p