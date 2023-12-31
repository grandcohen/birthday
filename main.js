const gameplayContainer = document.getElementById("gameplay");
const messages = document.getElementById("messages");
const startButton = document.getElementById("start");
const welcomeContainer = document.getElementById("welcome-container");
const timer = document.querySelector('.countdown-timer');
const buttonContainer = document.querySelector('.button-container');
const resultContainer = document.querySelector('.result-container');
const resultText = document.querySelector('.result-text');
const buttons = document.querySelectorAll('.button');
const smallaContainer = document.querySelector('.smalla-container');
const smallaText = document.querySelector('.smalla-text');
const buttonIds = ['A', 'B12', 'C', 'Zinc', 'Magnesium', 'Omega3'];
const smallaIds = ['Eyesight', 'Tiredness', 'Immune', 'Hairloss', 'Heart', 'Bones'];
const shownSmallas = [];
const FULL_TIMER = 3000;
const WEEKS_DIVIDER = Math.ceil(FULL_TIMER/104);
const ROUNDS = 4;

let countdown;
let startTime;
let endTime;
let timerText;
let currentSmalla;
let currentID;
let currentRandom;
let round = 1;
let totalWeeks = 0;
let clickedButtonId='';
let isTimerOn = false;

function startTimer() {
  
  clickedButtonId='';
  isTimerOn = true;
  let timeRemaining = FULL_TIMER; // 3 seconds in milliseconds
  startTime = Date.now();
  endTime = startTime + timeRemaining;
  currentRandom = Math.floor(Math.random() * buttonIds.length); // Choose a random ID from the buttonIds array
  currentSmalla = smallaIds[currentRandom];
  currentID = buttonIds[currentRandom];
  let all = '';
  smallaIds.forEach((item) => {
    all = all+item+', ';
  });
  console.log ('smallaIds: '+all);
  console.log ('currentRandom: ' + currentRandom);
  console.log ('currentSmalla: ' + currentSmalla);
  console.log ('currentID: ' + currentID);

  smallaIds.splice(currentRandom,1);
  buttonIds.splice(currentRandom,1);

  smallaText.textContent = currentSmalla;

  resultContainer.style.display = 'none';
  messages.style.display = 'none'
  gameplayContainer.style.display = 'block';

  // gilc
  //smallaContainer.style.display = 'block';
  //timer.style.display = 'block';
  //buttonContainer.style.display = 'block'; 


  countdown = setInterval(() => {
    const millisecondsLeft = endTime - Date.now();
    const seconds = Math.floor(millisecondsLeft / 1000);
    const milliseconds = (millisecondsLeft % 1000).toFixed(0).padStart(3, '0').slice(0, 2);


    if (millisecondsLeft > 0) {
    	timer.textContent = `${seconds.toString().padStart(2, '0')}:${milliseconds}`;

    // Oh no, no more time
    } else {
    	timer.textContent = '00:00'
      resultContainer.style.color = 'red';
      clearInterval(countdown);
      showResult(millisecondsLeft);
      isTimerOn = false;
    }
  }, 10);
}

function showResult(milliseconds) {

  let currentWeeks = (FULL_TIMER-milliseconds)/WEEKS_DIVIDER;
  resultText.textContent = Math.ceil(currentWeeks);
  totalWeeks = totalWeeks + Math.ceil(currentWeeks);
  
  resultContainer.style.display = 'block';

  console.log('totalWeeks: '+totalWeeks);
  console.log('====================================')

  setTimeout(() => {
  
    //gilc
    //resultContainer.style.display = 'none';
    //timer.style.display = 'none';
    //buttonContainer.style.display = 'none';
    gameplayContainer.style.display = 'none';

    if (clickedButtonId!='') {
      const clickedButton = document.getElementById(clickedButtonId);
      clickedButton.style.backgroundColor = 'white';
    }

  // Still playing
  if (round < ROUNDS)  {
    round = round + 1;
    
    messages.textContent = 'Round '+round+': Ready?';
    messages.style.display = 'block'
    
    setTimeout(() => {
      startTimer();
    }, 2000);
    
    // End of game
  } else {
    let weeksInteger = Math.floor(totalWeeks/52);
    let weeksFractional = (totalWeeks/52) % 1;
    console.log('weeksInteger: '+weeksInteger);
    console.log('weeksFractional: '+weeksFractional);
    let endText;

    if (weeksFractional > 0.4 && weeksFractional < 0.7) {
      endText = (38+weeksInteger)+' and a half';
    } else if (weeksFractional >= 0.7) {
      endText = (38+weeksInteger+1);
    } else {
      endText = 38+weeksInteger;
    }

    // gilc
    //smallaText.textContent = "You're 38 but look like "+endText;
    //buttonContainer.style.display = 'none';
    messages.textContent = "You're 38 but look like "+endText;
    messages.style.display = 'block'
   
  }
}, 2000);

}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {

    if (isTimerOn) {
      isTimerOn = false;
      currentEvent = event;
      clickedButtonId = event.target.id;
      console.log('clicked: '  + clickedButtonId); 
      clearInterval(countdown);

      if (currentID == clickedButtonId) {
        console.log('same');
        event.target.style.backgroundColor = 'green';
        resultContainer.style.color = 'green';
        showResult(endTime - Date.now());
      } else {
        console.log('nope');
        event.target.style.backgroundColor = 'red';
        resultContainer.style.color = 'red';
        showResult(0);
      }
    }
  });
});

startButton.addEventListener('click', (event) => {
  startGame();  
});

function startGame() {
  welcomeContainer.style.display = 'none';
  messages.textContent = 'Round '+round+': Ready?';
  messages.style.display = 'block'

    setTimeout(() => {
      startTimer();
    }, 2000);  
    
}



