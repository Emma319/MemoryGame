/**
* @description Create a list that holds all of cards
*/
 // list of symbols
const symbols = [
    "fa fa-diamond", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-bolt",
    "fa fa-cube", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bomb"
];

// list of all icons which is made of two sets of symbols
const icons = symbols.concat(symbols);

/**
* @description Shuffle the array of icon list
* @param {array} array
* @returns {array} shuffled new array with random order
*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/**
* @description Initial a new game. Call click, close, and countdownTimer function
*/
function initial() {
    // reset default variables
    cardClick = 0;
    firstCard = "";
    secondCard = "";
    matchs = 0;
    moves = 0;
    score = 3;

    // reset rating level
    stars[0].className = "fa fa-star";
    stars[1].className = "fa fa-star";
    stars[2].className = "fa fa-star";

   // clear card deck
    cardsDeck.innerHTML = "";

    // shuffle the list of cards
    let iconsList = shuffle(icons);

    // build up new card deck
    for (i = 0; i < iconsList.length; i++) {
        const card = document.createElement("li");
        card.className = "card open show";

        const icon = document.createElement("i");
        icon.className = iconsList[i];

        card.appendChild(icon);
        cardsDeck.appendChild(card);

        // add click event listener to each card
        click(card);

        // close cards after 5 seconds
        setTimeout(function() {
            close(card);
        }, 5000);
    }

    // Call countdown timer: show cards for 5 seconds
    countdownTimer(countdown);
}


/**
* @description Creat a Countdown Timer. Call gameTimer function once target time achieved
* @class
* @param {object} timer - countdown
*/
function countdownTimer(timer) {
    timer.start({countdown: true, startValues: {seconds: 5}});

    countdownTag.textContent = timer.getTimeValues().toString(["seconds"]);
    timeTag.textContent = "00:00";

    timer.addEventListener("secondsUpdated", function (e) {
        countdownTag.textContent = timer.getTimeValues().toString(["seconds"]);
    });

    timer.addEventListener("targetAchieved", function (e) {
        countdownTag.textContent = "START!!";
        // start a game timer
        gameTimer(stopwatch);
    });

    // Disappear the countdown timer text info
    setTimeout(function() {
        countdownTag.textContent = "";
    }, 8000);
}

/**
* @description Start a Game Timer. Stop it after 10 mins and show Game Over message
* @class
* @param {object} timer - stopwatch
*/
function gameTimer(timer) {
    timer.reset();

    timer.addEventListener("secondsUpdated", function (e) {
        timeTag.textContent = timer.getTimeValues().toString(["minutes", "seconds"]);
    });
    timer.addEventListener("started", function (e) {
        timeTag.textContent = timer.getTimeValues().toString(["minutes", "seconds"]);
    });
    timer.addEventListener("reset", function (e) {
        timeTag.textContent = timer.getTimeValues().toString(["minutes", "seconds"]);
    });

    // time out after 10 mins
    setTimeout(function() {
        timer.pause();
        countdownTag.textContent = "Game Over!!";
        cardsDeck.classList.add("hidden");
        message.classList.remove("hidden");
        overMsg.classList.remove("hidden");
    }, 600000);
}


/**
* @description Add "click" event listerner to all cards. Call open function if it got clicked.
* @param {object} card - all cards
*/
function click(card) {
    card.addEventListener("click", function() {
        open(card);
    })
}


/**
* @description Open a Card and call compare function if there are two cards got clicked.
* @param {object} card - the card got clicked
*/
function open(card) {
    cardClick ++;

    // If it's first card
    if (cardClick === 1) {
        card.classList.add("open", "show");
        firstCard = card;
    }

    // if it's second card
    else if (cardClick === 2) {
        card.classList.add("open", "show");
        secondCard = card;

        // compare two cards
        compare(firstCard, secondCard);
    }
}


/**
* @description Compare two Cards see if match or not. Call match or notMatch function
* @param {object} firstCard - first clicked card
* @param {object} secondCard - second clicked card
*/
function compare(firstCard, secondCard) {
    firstCard.firstChild.className === secondCard.firstChild.className ?
    match(firstCard, secondCard) : notMatch(firstCard, secondCard);
}


/**
* @description Mark two cards matched and count moves and matched. Call checkComplete fuction
* @param {object} firstCard - first clicked card
* @param {object} secondCard - second clicked card
*/
function match(firstCard, secondCard) {
    // mark the cards matched
    firstCard.classList.add("match");
    secondCard.classList.add("match");

    // count move & update rating
    moves ++;
    countMove();
    setRating();

    // count matched & check if complete
    matchs ++;
    checkComplete();

    // reset the default variable
    cardClick = 0;
    firstCard = "";
    secondCard = "";
}


/**
* @description Mark two cards not matched and count moves. Call close fuction
* @param {object} firstCard - first clicked card
* @param {object} secondCard - second clicked card
*/
function notMatch(firstCard, secondCard) {
    // mark the cards not-matched
    setTimeout(function() {
        firstCard.classList.add("notmatch");
        secondCard.classList.add("notmatch");
    }, 400);

    // count move & update rating
    moves ++;
    countMove();
    setRating();

    // close both cards
    setTimeout(function() {
        close(firstCard);
        close(secondCard);

        // reset the default variable
        cardClick = 0;
        firstCard = "";
        secondCard = "";
    }, 700);
}


/**
* @description Update moves count
*/
function countMove() {
    moveTag.textContent = moves;
}


/**
* @description Update rating rank
*/
function setRating() {
    if (moves > rank3 && moves <= rank2) {
        score = 2;
        stars[2].className = "fa fa-star-o";
    } else if (moves > rank2) {
        score = 1;
        stars[1].className = "fa fa-star-o";
    }
}


/**
* @description Close the Card
* @param {object} card - the card need to be closed
*/
function close(card) {
    // remove all other class name like open, show, nonmatch etc.
    card.className = "card";
}


 /**
* @description Check if the game is completed. Show Congratulations message
*/
function checkComplete() {
    if (matchs === symbols.length) {
        // stop the game timer and show END info
        stopwatch.pause();
        countdownTag.textContent = "END!!";

        // show message window
        setTimeout(function() {
            cardsDeck.classList.add("hidden");
            message.classList.remove("hidden");
            winMsg.classList.remove("hidden");
            winMsg.querySelector(".move").textContent = moves;
            winMsg.querySelector(".score").textContent = score;
            winMsg.querySelector(".time").textContent = stopwatch.getTotalTimeValues().seconds;
        }, 500);
    }
}


 /**
* @description Restart the Game
*/
function restart() {
    // stop the game timer and initial a new game
    stopwatch.pause();
    initial();
    countMove();

    // disappear message window and show card deck
    cardsDeck.classList.remove("hidden");
    message.classList.add("hidden");
    comfirmMsg.classList.add("hidden");
    winMsg.classList.add("hidden");
    overMsg.classList.add("hidden");
}


 /**
* @description Close the message panel
*/
function closeMsg() {
    // disappear message window and show card deck
    cardsDeck.classList.remove("hidden");
    message.classList.add("hidden");
    comfirmMsg.classList.add("hidden");
}




/**
*  Start the program
*/
// Setup default variables
let cardClick = 0;
let firstCard = "";
let secondCard = "";
let moves = 0;
let matchs = 0;
let score = 3;
let rank3 = 10, rank2 = 16, rank1 = 22;
let countdown = new Timer();
let stopwatch = new Timer();

const cardsDeck = document.querySelector(".deck");
const message = document.querySelector(".message");
const comfirmMsg = document.querySelector(".comfirm");
const winMsg = document.querySelector(".win");
const overMsg = document.querySelector(".over");
const moveTag = document.querySelector(".moves");
const timeTag = document.querySelector(".timer");
const countdownTag = document.querySelector(".countdown");
const stars = document.querySelectorAll(".fa-star");
const resetBtn = document.querySelector(".restart");


// initial a game
initial();

// restart a game
resetBtn.addEventListener("click", function() {
    if (cardsDeck.classList.length === 1) {
        cardsDeck.classList.add("hidden");
        message.classList.remove("hidden");
        comfirmMsg.classList.remove("hidden");
    }
});
