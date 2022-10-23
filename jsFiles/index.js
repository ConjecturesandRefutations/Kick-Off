let currentGame;
let currentBall;

let obstaclesFrequency = 0; // support the logic for generating obstacles
let messiFrequency = 0 // support the logic for generating Messi-type obstacles

let background = new Image();
background.src = "./images/football pitch.jpg";

//Opening Area and Start Button

const yourScore = document.getElementById('your-score')
const opponentScore = document.getElementById('opponent-score')
yourScore.style.display = 'none'
opponentScore.style.display = 'none'


//Opening Area and Start Button

const toggleButton = document.querySelector('#start-button')
const toggleOpening = document.querySelector('.opening-section')
toggleOpening.style.display = ''

//Game Area
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.style.display = 'none'

//Game-over Area
const fullTime = document.querySelector('.full-time')
fullTime.style.display = 'none'

//Hiding the Countdown from opening page

timer.style.display = 'none'

//Start Button

window.onload = () => {
  toggleButton.onclick = () => {
    if (toggleOpening.style.display === ''){
      toggleOpening.style.display = 'none';
  }
  if (myCanvas.style.display = 'none'){
      myCanvas.style.display = ''
  }

 
yourScore.style.display = '' 
opponentScore.style.display = ''
myCanvas.style.display = 'block'; 
timer.style.display = ''
    
    
    startGame();
  };

  document.onkeydown = (e) => {
    let whereToGo = e.keyCode;
    currentGame.ball.moveBall(whereToGo);
}
};

//Main Menu Button
let mainMenuButton = document.getElementsByClassName('main-menu-button')
for (let i = 0 ; i < mainMenuButton.length; i++) {
  mainMenuButton[i].addEventListener('click',  ()=>{
    fullTime.style.display = 'none';
    toggleOpening.style.display = ''
    location.reload() 
  })  
}

function startGame() {
  setInterval(updateCountdown, 1000)

  currentGame = new Game();
  ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // draw background image

  //Instantiate a new ball
  currentBall = new Ball();
  currentGame.ball = currentBall;
  currentGame.ball.drawBall();
       updateCanvas();// keeping track of the updates as the game unfolds

}

function updateCanvas() {
  ctx.clearRect(0, 0, 700, 500); // clear canvas
  ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // redraw the background

  currentGame.ball.drawBall(); // redraw the ball at its current position
  obstaclesFrequency++;
  messiFrequency++;

  //Logic for scoring goal
  
  if (currentGame.ball.y < 25 && currentGame.ball.x > 200
     && currentGame.ball.x < 260){
      currentGame.ball.x = 231
      currentGame.ball.y = 520
      currentGame.score++
      document.querySelector('.scoreOne').innerText = currentGame.score
      document.querySelector('.scoreOneM').innerText = currentGame.score
      goalSound.play()
  }

  //Logic for own goal
  if (currentGame.ball.y > 630 && currentGame.ball.x > 200
    && currentGame.ball.x < 260){
      currentGame.opponentsScore++
      document.querySelector('.scoreTwo').innerText = currentGame.opponentsScore
      document.querySelector('.scoreTwoM').innerText = currentGame.opponentsScore
      currentGame.ball.x = 231
      currentGame.ball.y = 520
      ownGoalSound.play()
 }

  if (obstaclesFrequency % 100 === 1) {
      //Draw an obstacle
      let randomObstacleX = 0;
      let randomObstacleY = Math.floor(Math.random() * 410);
      let randomObstacleWidth = 50;
      let randomObstacleHeight = 70;
      let newObstacle = new Obstacle(
          randomObstacleX, 
          randomObstacleY, 
          randomObstacleWidth, 
          randomObstacleHeight);

      currentGame.obstacles.push(newObstacle);
  }

  if (messiFrequency % 100 === 1) {
    //Draw an obstacle
    let randomMessiX = 450;
    let randomMessiY = Math.floor(Math.random() * 410);
    let randomMessiWidth = 30;
    let randomMessiHeight = 70;
    let newMessi = new Messi(
        randomMessiX, 
        randomMessiY, 
        randomMessiWidth, 
        randomMessiHeight);

    currentGame.messi.push(newMessi);

}

  for(let i = 0; i<currentGame.obstacles.length; i++) {
      currentGame.obstacles[i].x += 3; 
      currentGame.obstacles[i].drawObstacle();

      //Logic for getting tackled by obstacles

      if (detectCollision(currentGame.obstacles[i])) {
        currentGame.opponentsScore++ 
        document.querySelector('.scoreTwo').innerText = currentGame.opponentsScore
        document.querySelector('.scoreTwoM').innerText = currentGame.opponentsScore
        currentGame.ball.x = 231
        currentGame.ball.y = 520
        tackleSound.play()
      }
      // Logic for removing obstacles
      if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].x >= 450) {
        currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
      } 
    }

  for(let j = 0; j<currentGame.messi.length; j++) {
    currentGame.messi[j].x -= 2; 
    currentGame.messi[j].drawMessi();

    //Logic for getting tackled by Messi

    if (detectCollision(currentGame.messi[j])) {
      currentGame.opponentsScore++
      document.querySelector('.scoreTwo').innerText = currentGame.opponentsScore
      document.querySelector('.scoreTwoM').innerText = currentGame.opponentsScore
      currentGame.ball.x = 231
      currentGame.ball.y = 520
      tackleSound.play()
    }
    // Logic for removing Messi obstacles

if (currentGame.messi.length > 0 && currentGame.messi[j].x <= 20) {
  currentGame.messi.splice(j, 1); // remove that Messi obstacle from the array
  } 

    //To reset the score
    function resetScore(){
      document.querySelector('.scoreOne').innerText = 0
      document.querySelector('.scoreOneM').innerText = 0
      document.querySelector('.scoreTwo').innerText = 0
      document.querySelector('.scoreTwoM').innerText = 0
      currentGame.score = 0
      currentGame.opponentsScore = 0
    }

//Restart Button
let restartButton = document.getElementsByClassName('try-again-button')
for (var i = 0 ; i < restartButton.length; i++) {
restartButton[i].addEventListener('click',  ()=>{
startingSeconds = 45
isClockPaused= false;
fullTime.style.display = 'none';
toggleOpening.style.display = 'none'
myCanvas.style.display = 'block'
yourScore.style.display = '' 
opponentScore.style.display = ''
timer.style.display = ''
resetScore()
}) 
} 

if (startingSeconds ===-1){
  endGame()
}

function endGame(){
  currentGame.ball.x = 231
  currentGame.ball.y = 520
  toggleOpening.style.display = 'none'
  yourScore.style.display = 'none'
  opponentScore.style.display = 'none'
  myCanvas.style.display = 'none'
  timer.style.display = 'none'
  fullTime.style.display = ''
  isClockPaused = true
}

  }

    requestAnimationFrame(updateCanvas);
}

function detectCollision(obstacle) {
  return ((currentBall.x < obstacle.x + obstacle.width) &&         // check left side of element 
  (currentBall.x + obstacle.width > obstacle.x) &&           // check right side
  (currentBall.y < obstacle.y + obstacle.height) &&         // check top side
  (currentBall.y + obstacle.height > obstacle.y));           // check bottom side
}