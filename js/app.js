/*
 * Create a list that holds all of your cards
 */
 //GLOBAL VARIABLES
const deck = document.querySelectorAll('.deck li');
const cardArray = Array.from(deck);
const cardSelect = document.querySelector('.deck');
const starTrack = document.querySelector('.stars');
let matchedCards = [];
let openCards = [];
let moves = 0;
let timer = document.querySelector('.timer');
let clockStop = true;
let time = 0;
let clockId;
const modalAlert = document.querySelector('.modal')

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function placeCards(){
    const shuffledCards = shuffle(cardArray);
    for (card of shuffledCards) {
        cardSelect.appendChild(card);
    }
}
placeCards();
 
/*DEBUG - JUST DOESN'T WORK AT ALL :( 
* const resetGame = document.querySelector('.restart')
* resetGame.addEventListener('click', function(clickReset){
*     const resetClick = clickReset;
*     placeCards();
* });
*/

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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



//FUNCTIONS
function gameStart() {
    clockId = setInterval(() => {
        time++;
        displayTime();
        console.log(time);
    }, 1000);
};
    
function displayTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) {
        timer.innerHTML = minutes + ':0' + seconds;
    } else {
        timer.innerHTML = minutes + ':' + seconds;
    };
    console.log(timer);
};

function gameStop() {
    clearInterval(clockId);
};

function toggle(eventTarget) {
    eventTarget.classList.toggle('open');
    eventTarget.classList.toggle('show');
};

function addToOpen(clickTarget) {
    if (clickTarget.classList.contains('open') &&
         openCards.length < 2) {
         openCards.push(clickTarget);
    };
};

function addMove() {
    if (openCards.length === 2){
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
    };
};

function itsAmatch() {
    if (openCards[0].firstElementChild.className ===
        openCards[1].firstElementChild.className) {
            openCards[0].setAttribute('class', 'card match');
            openCards[1].setAttribute('class', 'card match');
            matchedCards.push(openCards[0]);
            matchedCards.push(openCards[1]);
            openCards = [];
    } else {
        setTimeout(function(){
            toggle(openCards[0]);
            toggle(openCards[1]);
            openCards = [];
        }, 500);
        scoreCard();
    };
};

function scoreCard() {
    if (moves === 5 || moves === 15 || moves === 20) {
        starTrack.lastElementChild.remove();
    }
}

//DEBUG -- DOESN'T SHOW FINAL SCORE

let starScore = document.getElementById('star');
let timeScore = document.getElementById('time');
let moveScore = document.getElementById('moves');

function gameWin() {
    if (matchedCards.length === 16) {
        let finalTime = timer.innerHTML;
        gameStop();
        let finalStars = document.querySelector('.stars').innerHTML;
        let finalMoves = moves.innerHTML;
        modalAlert.style.display = "block";
        starScore.innerHTML = finalStars;
        timeScore.innerHTML = finalTime;
        moveScore.innerHTML = finalMoves;
    }
}

    


//EVENT LISTENERS
cardSelect.addEventListener('click', event => {
    const clickedCard = event.target;
    if (clockStop) {
        gameStart();
        clockStop = false;
    };
    if (clickedCard.classList.contains('card')) {
        toggle(clickedCard);
    };
    addToOpen(clickedCard);
    addMove();
    itsAmatch();
    gameWin();
});