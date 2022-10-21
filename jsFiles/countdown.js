let startingSeconds = 45;
let isClockPaused = false

const countdown = document.getElementById('countdown')
const timer = document.getElementById('timer')

function updateCountdown(){
    countdown.innerHTML = ` ${startingSeconds}`;
    if (!isClockPaused){
    startingSeconds--;
    }
    if (startingSeconds===-2){
        startingSeconds=45
    } 
}

