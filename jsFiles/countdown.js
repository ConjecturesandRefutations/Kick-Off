let startingSeconds = 45;
let isClockPaused = false

const countdown = document.getElementById('countdown')
const timer = document.getElementById('timer')

function updateCountdown(){
    countdown.innerText = ` ${startingSeconds}`;
    if (!isClockPaused){
    startingSeconds--;
    }
    if (startingSeconds===-2){
        startingSeconds=45
    } 
}

