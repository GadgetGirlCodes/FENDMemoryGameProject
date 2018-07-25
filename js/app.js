/*
 * Create a list that holds all of your cards
 */
const htmlCollection = document.getElementsByClassName('card')
const cardArray = Array.from(htmlCollection)
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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

cardArray.forEach(function(item) {
    item.setAttribute('class', 'card');
});

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
const cardSelect = document.querySelector('.deck');
let openCards = [];
let moves = 0;

//FUNCTIONS
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
            openCards = [];
    } else {
        setTimeout(function(){
            toggle(openCards[0]);
            toggle(openCards[1]);
            openCards = [];
        }, 1500);
    };
};

//EVENT LISTENERS
cardSelect.addEventListener('click', function cardFlip(event) {
    const clickedCard = event.target;
    if (clickedCard.classList.contains('card')) {
        toggle(clickedCard);
    };
    addToOpen(clickedCard);
    addMove();
    itsAmatch();
});
