let currentGame;
let currentBall;

let obstaclesFrequency = 0; // support the logic for generating obstacles
let messiFrequency = 0 // support the logic for generating Messi-type obstacles

let background = new Image();
background.src = "./images/football pitch.jpg";

//Opening Area and Start Button

const toggleButton = document.querySelector('#start-button')
const toggleOpening = document.querySelector('.opening-section')
toggleOpening.style.display = ''

//Game Area
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.style.display = 'none'

//Start Button

window.onload = () => {
  toggleButton.onclick = () => {
    if (toggleOpening.style.display === ''){
      toggleOpening.style.display = 'none';
  }
  if (myCanvas.style.display = 'none'){
      myCanvas.style.display = ''
  }
    
    
    startGame();
  };

  document.onkeydown = (e) => {
    let whereToGo = e.keyCode;
    currentGame.ball.moveBall(whereToGo);
}
};

//Game-over Area
const toggleTackled = document.querySelector('.tackled-section')
toggleTackled.style.display = 'none'

//Victory Area
const goalSection = document.querySelector('.goal-section')
goalSection.style.display = 'none'


//Restart Button
let restartButton = document.getElementsByClassName('try-again-button')
    for (var i = 0 ; i < restartButton.length; i++) {
    restartButton[i].addEventListener('click',  ()=>{
    toggleTackled.style.display = 'none';
    goalSection.style.display = 'none'
    toggleOpening.style.display = 'none'
    startGame()
  }) ; 
} 

//Main Menu Button
let mainMenuButton = document.getElementsByClassName('main-menu-button')
for (var i = 0 ; i < mainMenuButton.length; i++) {
  mainMenuButton[i].addEventListener('click',  ()=>{
    toggleTackled.style.display = 'none';
    goalSection.style.display = 'none'
    toggleOpening.style.display = ''
    location.reload() 
  }) ; 
}

function startGame() {
  myCanvas.style.display = 'block';

  currentGame = new Game();
  ctx.drawImage(background, 0, 0, myCanvas.width, myCanvas.height); // draw background image
  //Instantiate a new ball
  currentBall = new Ball();
  currentGame.ball = currentBall;
  currentGame.ball.drawBall();
       updateCanvas();// keeping track of the updates as the game unfolds
}

function updateCanvas() {
  ctx.clearRect(0, 0, 500, 700); // clear canvas
  ctx.drawImage(background, 0, 0, myCanvas.width, myCanvas.height); // redraw the background
  currentGame.ball.drawBall(); // redraw the ball at its current position
  obstaclesFrequency++;
  messiFrequency++

  //Logic for scoring goal
  if (currentGame.ball.y < 25 && currentGame.ball.x > 200
     && currentGame.ball.x < 260){
      toggleTackled.style.display = 'none'
      myCanvas.style.display = 'none';
      toggleOpening.style.display = 'none'
      goalSection.style.display = ''
  }

  //Logic for own goal
  if (currentGame.ball.y > 630 && currentGame.ball.x > 200
    && currentGame.ball.x < 260){
   alert ('OH no! You scored an OWN goal!')
   myCanvas.style.display = 'none';
          toggleOpening.style.display = ''
 }

  if (obstaclesFrequency % 100 === 1) {
      //Draw an obstacle
      let randomObstacleX = 0;
      let randomObstacleY = Math.floor(Math.random() * 700);
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
    let randomMessiY = Math.floor(Math.random() * 700);
    let randomMessiWidth = 50;
    let randomMessiHeight = 70;
    let newMessi = new Messi(
        randomMessiX, 
        randomMessiY, 
        randomMessiWidth, 
        randomMessiHeight);

    currentGame.messi.push(newMessi);

}

  for(let i = 0; i<currentGame.obstacles.length; i++) {
      currentGame.obstacles[i].x += 2; 
      currentGame.obstacles[i].y -= 2; 
      currentGame.obstacles[i].drawObstacle();

      if (detectCollision(currentGame.obstacles[i])) {
          obstaclesFrequency = 0;
          currentGame.score = 0;
          document.getElementById('score').innerHTML = 0;
          currentGame.obstacles = [];
          myCanvas.style.display = 'none';
          toggleOpening.style.display = 'none'
          toggleTackled.style.display = ''
      }
      // Logic for removing obstacles
      if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y <= 10) {
        currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
      } 
    }

  for(let j = 0; j<currentGame.messi.length; j++) {
    currentGame.messi[j].x -= 2; 
    currentGame.messi[j].y += 2; 
    currentGame.messi[j].drawMessi();

    if (detectCollision(currentGame.messi[j])) {
        messiFrequency = 0;
        currentGame.score = 0;
        document.getElementById('score').innerHTML = 0;
        currentGame.messi = [];
        myCanvas.style.display = 'none';
        toggleOpening.style.display = 'none'
        toggleTackled.style.display = ''
    }
    // Logic for removing Messi obstacles

if (currentGame.messi.length > 0 && currentGame.messi[j].y >= 670) {
  currentGame.messi.splice(j, 1); // remove that Messi obstacle from the array
  } 

  }

  console.log(currentGame.obstacles)

    requestAnimationFrame(updateCanvas);
}

function detectCollision(obstacle) {
 /*  return !((currentBall.y > obstacle.y + obstacle.height) || 
  (currentBall.x + currentBall.width < obstacle.x) || 
  (currentBall.x - currentBall.width  > obstacle.x + obstacle.width-50)) */
  return ((currentBall.x < obstacle.x + obstacle.width-10) &&         // check left side of element 
  (currentBall.x + obstacle.width-10 > obstacle.x) &&           // check right side
  (currentBall.y < obstacle.y+20 + obstacle.height) &&         // check top side
  (currentBall.y + obstacle.height > obstacle.y));           // check bottom side
}

function detectCollision(messi) {
    /*  return !((currentBall.y > messi.y + messi.height) || 
     (currentBall.x + currentBall.width < messi.x) || 
     (currentBall.x - currentBall.width  > messi.x + messi.width-50)) */
     return ((currentBall.x < messi.x + messi.width-10) &&         // check left side of element 
     (currentBall.x + messi.width-10 > messi.x) &&           // check right side
     (currentBall.y < messi.y+20 + messi.height) &&         // check top side
     (currentBall.y + messi.height-50 > messi.y));           // check bottom side
   }