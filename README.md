# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [How to play](#Howtoplay)
* [Dependencies](#Dependencies)
* [Contributing](#contributing)


## Instructions
This is an Udacity Project.

To initial a game, it calls *shuffle* function to create a list of sixteen random ordered cards. A event listener is set up for each card.
If a card is clicked:
* display the card's symbol
   - add the card to a list of *open* cards
   - if the list already has another card, check to see if the two cards match
     - if the cards do match, lock the cards in the open position
     - if the cards do not match, remove the cards from the list and hide the card's symbol
* increment the move counter and display it on the page
* if all cards have matched, display a message with the final score


## How to play
1. Initial a game, all cards will be open for 5 seconds. Try to remember them as many as possible you can. After countdown, all cards will be closed and then the game **START**!!
[Game Initial](img/ScreenShot1.png)
[Game Start](img/ScreenShot2.png)
2. Click any two cards to open them. If two flipped cards have the same icon, they match and keep open. Otherwise, the cards close.
3. Player should take as fewer moves as possiable to open all cards, then you will get a rating about the level of your menory based on how many moves and how much time you spend.

Ready to Paly: [Go here](index.html)


## Dependencies
This project uses open libraries like _bootstrap, font awesome, EasyTimer_ etc. to design the font, symbles, and timers.


## Contributing
This repository is a practice project for **Udacity _Front-End Developer Program_**. Therefore, we most likely will not accept pull requests.
