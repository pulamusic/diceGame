/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying

// set initial state of the game
init()

// roll the dice
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // random number
    var dice = Math.floor(Math.random() * 6) + 1

    // display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block'
    diceDOM.src = 'dice-' + dice + '.png'

    // update the round score if the rolled number was not a 1
    if (dice !== 1) {
      // add score
      roundScore += dice
      document.querySelector('#current-' + activePlayer).textContent = roundScore
    } else {
      // next player
      nextPlayer()
    }
  }
})

// hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore
    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    // check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
      document.querySelector('.dice').style.display = 'none'
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
      gamePlaying = false
    } else {
      nextPlayer()
    }
  }
})

// setup for the next player
function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  roundScore = 0

  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')

  document.querySelector('.dice').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', init)

// reset everything at the beginning and end of the game
function init () {
  // reset scores
  scores = [0, 0]
  activePlayer = 0
  roundScore = 0
  gamePlaying = true

  // clear dice from the board
  document.querySelector('.dice').style.display = 'none'

  // reset all score counters
  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  // reset to Player 1 and Player 2
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'

  // remove .winner and .active classes
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')

  // add .active class to Player 1
  document.querySelector('.player-0-panel').classList.add('active')
}
