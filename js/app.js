//GLOBAL VARIABLES
const deck = document.querySelectorAll('.deck li');
const cardArray = Array.from(deck);
const cardSelect = document.querySelector('.deck');




//Shuffles cards and places them on the board
function placeCards(){
    const shuffledCards = shuffle(cardArray);
    for (card of shuffledCards) {
        cardSelect.appendChild(card);
    }
}
placeCards();

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

//Starts the timer
let timer = document.querySelector('.timer');
let clockStop = true;
let time = 0;
let clockId;

function gameStart() {
    clockId = setInterval(() => {
        time++;
        displayTime();
        console.log(time);
    }, 1000);
};

//Displays the timer as it is counting
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

//Stops the clock
function gameStop() {
    clearInterval(clockId);
};

//Flips the cards
function toggle(eventTarget) {
    eventTarget.classList.toggle('open');
    eventTarget.classList.toggle('show');
};

//Adds open cards to a list
let openCards = [];

function addToOpen(clickTarget) {
    if (clickTarget.classList.contains('open') &&
         openCards.length < 2) {
         openCards.push(clickTarget);
    };
};

//Increments the moves counter with each set of cards flipped
const movesText = document.querySelector('.moves');
let moves = 0;

function addMove() {
    if (openCards.length === 2){
    moves++;
    movesText.innerHTML = moves;
    };
};

//Determines if open cards are a match and adds matched cards to a list
let matchedCards = [];

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
    };
    scoreCard();
};

//Decreases the amount of stars with move increments
const starTrack = document.querySelectorAll('.stars li');

function starHidden() {
    for (star of starTrack) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

function scoreCard() {
    for (star of starTrack)
    if (moves === 5 || moves === 15 || moves === 20) {
        starHidden();
        break;
    }
}


//Displays modal upon completion of game
const modalAlert = document.querySelector('.modal')
let starScore = document.getElementById('star');
let timeScore = document.getElementById('time');
let moveScore = document.getElementById('moves');

function gameWin() {
    if (matchedCards.length === 16) {
        let finalTime = timer.innerHTML; //DEBUG -- DOESN'T SHOW TIME
        gameStop();
        let finalStars = document.querySelector('.stars').innerHTML;
        let finalMoves = moves.innerHTML;
        modalAlert.style.display = "block";
        starScore.innerHTML = finalStars;
        timeScore.innerHTML = finalTime;
        moveScore.innerHTML = finalMoves;
    }
}

//Resets the game back to start
const resetGame = document.querySelector('.restart')
const playAgain = document.querySelector('.playAgain')

function gameReset() {
    time = 0;
    moves = 0;
    timer.innerHTML = "0:00";
    movesText.innerHTML = 0;
    resetCards();
    resetStars();
}

function resetCards() {
    for (cards of matchedCards){
        cards.classList.toggle('match');
    };
    matchedCards = [];
    openCards = [];
}

function resetStars() {
    for (star of starTrack) {
        if (star.style.display === 'none') {
            star.style.display = 'inline-block';
        }
    }
}

//EVENT LISTENERS

//Resets the game
resetGame.addEventListener('click', () => {
    gameStop();
    clockStop = true;
    gameReset();
    placeCards();
});

playAgain.addEventListener('click', () => {
    clockStop = true;
    gameReset();
    placeCards();
    modalAlert.style.display = "none";
})




//Starts game
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
