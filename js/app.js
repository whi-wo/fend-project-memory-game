//global variables

const cardsToShuffle = ['fa-diamond', 'fa-diamond',
'fa-paper-plane-o', 'fa-paper-plane-o',
'fa-anchor', 'fa-anchor',
'fa-bolt', 'fa-bolt',
'fa-cube','fa-cube',
'fa-bicycle', 'fa-bicycle',
'fa-leaf', 'fa-leaf',
'fa-bomb', 'fa-bomb',
];


let toggledCards = [];
let moves = 0;
let active = true;
const deck = document.querySelector('.deck');
const stars = Array.from(document.querySelectorAll('.stars li'));
const movesText = document.querySelector('.moves');
const matchedCards = document.querySelectorAll('.match');
const starThree= stars[2];
const starTwo = stars[1];



// timer starts ONLY once user clicks the deck
deck.addEventListener('click',startTimer,{once : true} );



//randomizes the cards
function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}
shuffleDeck();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//move counter
function addMove () {
  moves++;
  movesText.innerHTML = moves;
}

//decreases star score based on number of moves
function changeStars (){
  if (moves === 16){
    stars[2].style.color = '#ffffff';
    stars.pop();
  }
  if (moves === 32) {
    stars[1].style.color = '#ffffff';
    stars.pop();
  }
  console.log("the number of star" + stars.length);
};


//defines the timer
function startTimer() {
  if (active) {
    const timer = document.getElementById("clock").innerHTML;
    const arr = timer.split(":"); //splitting the timer into an array
    let min = arr[0];
    let sec = arr[1];

    if (sec == 59) {
      if (min == 59) {
        hour++;
        min = 0;
        if (hour < 10) hour = "0" + hour;
      } else {
        min++;
      }
      if (min > 10) min = "0" + min;
      sec = 0;
    } else {
      sec++;
      if (sec < 10) sec = "0" + sec;
    }
    //update the HTML
    document.getElementById("clock").innerHTML = min + ":" + sec;
    setTimeout(startTimer, 1000); //keep repeating this every second
  }
}

//function to be called when the game is over to stop the timer
function stopTimer () {
  active = false;
  console.log('the clock has been stopped');
}

//function to reset the timer, stars, and deck when the game has been restarted
document.getElementById("reset").addEventListener("click", gameReset);

function resetTimer () {
  document.getElementById("clock").innerHTML = "0" + ":" + "00";
}

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (validClick(clickTarget
  )){

    toggleCard(clickTarget);
    addToggledCard(clickTarget);
    if (toggledCards.length === 2) {
      checkForMatch(clickTarget);
      addMove();
      changeStars();
    }
  }
});



//function for a valid click
function validClick(clickTarget){
  return (
    clickTarget.classList.contains('card')&&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)
  );

}

//function for toggling cards
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

function addToggledCard(clickTarget) {
  toggledCards.push(clickTarget);
}

//function to check for a card match
function checkForMatch() {
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    checkMatchedCards(); //checking to see if all cards have been matched
    toggledCards= [];
  } else {
    setTimeout(() => {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];
    }, 1000);
  }
}

//game ends when all of the cards are matched and the modal with appear
function checkMatchedCards (){
  const matchedCards= document.querySelectorAll('.match');
  console.log(matchedCards.length);
  if (matchedCards.length === 16){
    stopTimer();
    console.log('all cards have been matched!');
    setTimeout(writeModalStats, 200);
    setTimeout(toggleModal, 500);
  }
}

//function that toggles modal appearance
function toggleModal(){
  const modal = document.querySelector('.modal-bgd');
  modal.classList.toggle('hide');
}



//function to gather the game stats and present them in the modal
function writeModalStats(){
  const timeStat = document.querySelector('.clock').textContent;
  const moveStat = document.querySelector('.moves').textContent;
  const starStat = stars.length;
  console.log(timeStat);
  console.log(starStat);
  console.log(moveStat);
  document.querySelector('.modal-time').innerHTML = "You finished with a time of " + timeStat;
  document.querySelector('.modal-moves').innerHTML = "in " + moveStat + " moves";
  document.querySelector('.modal-stars').innerHTML = "with star rating of " + starStat + "!";
}

//function to reset the cards back to flipper over
function resetCards() {
  const cards = document. querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}

//resetting the stars. This function pushes stars back into the array and recolors them
function resetStars(){
  if(stars.length = 2){
    stars.push(starThree);
    starThree.style.color = '#ef798a';
  }
  if(stars.length = 1){
    stars.push(starTwo);
    starTwo.style.color = '#ef798a';
  }
}

function gameReset(){
  location.reload();
}

document.querySelector('#replay').addEventListener('click',gameReset);
document.querySelector('#close').addEventListener('click',toggleModal);
