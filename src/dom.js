import { Ship, Gameboard, Player } from './index.js';

class EventListeners {
  constructor() {
    this.computerBoard = document.querySelector('#computer-board');
    this.playerBoard = document.querySelector('#player-board')
    this.playButton = document.querySelector('#play-button')
    this.restartButton = document.querySelector('#restart-button')

    this.playButton.addEventListener('click', () => {
      this.playButton.classList.add('hide')
      this.restartButton.classList.remove('hide')
      this.computerBoard.classList.remove('hide')
      this.playerBoard.classList.remove('hide')
      this.setupGame()
    })

    this.restartButton.addEventListener('click', () => {
      this.setupGame()
    })

    this.computerBoard.addEventListener('click', (event) => {
      if (!event.target.classList.contains('cell')) {
        return;
      }
      const x = parseInt(event.target.dataset.x);
      const y = parseInt(event.target.dataset.y);
      this.runGame(x, y);
    });
  }

  setupGame() {
    this.player = new Player('Human')
    this.computer = new Player('Computer')
    
    const shipLengths = [5, 4, 3, 2, 1]

    this.setShipsRandomly(this.player, shipLengths)
    this.setShipsRandomly(this.computer, shipLengths)

    renderBoard(this.player.gameboard, this.playerBoard)
    renderBoard(this.computer.gameboard, this.computerBoard)
  }

  setShipsRandomly(player, shipLengths) {
    shipLengths.forEach((length) => {
      let placed = false
      while (!placed) {
        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 10)
        const isHorizontal = Math.random() < 0.5
        const newShip = new Ship(length)
        placed = player.gameboard.placeShip(newShip, x, y, isHorizontal)
      }
    })

  }

  runGame(x, y) {

    if (isNaN(x) || isNaN(y)) {return}
  
    this.player.attack(this.computer.gameboard, x, y)
    renderBoard(this.computer.gameboard, this.computerBoard)
  
    if (this.computer.gameboard.allShipsSunk()) {
      alert('You Win!')
      this.computerBoard.classList.add('hide')
      this.playerBoard.classList.add('hide')
      this.restartButton.classList.add('hide')
      this.playButton.classList.remove('hide')
      this.playButton.innerHTML = 'Play Again';
      return
    }
  
    // computer turn
  
    setTimeout(() => {
      this.computer.takeTurnComputer(this.player.gameboard)
      renderBoard(this.player.gameboard, this.playerBoard)
      if (this.player.gameboard.allShipsSunk()) {
        alert('You Lose!')
        this.computerBoard.classList.add('hide');
        this.playerBoard.classList.add('hide');
        this.restartButton.classList.add('hide');
        this.playButton.classList.remove('hide');
        this.playButton.innerHTML = 'Play Again'
        return
      }
    }, 500)
  }
}




function renderBoard(gameboard, boardElement) {
  boardElement.innerHTML = '';

  for (let y = 0; y < gameboard.board.length; y++) {
    for (let x = 0; x < gameboard.board[y].length; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;

      const cellState = gameboard.board[y][x];

      if (cellState === 'miss') {
        cell.classList.add('miss');
      } else if (cellState === 'hit') {
        cell.classList.add('hit');
    }
      else if (typeof cellState === 'object' && cellState !== null) {
        cell.classList.add('ship');
      }

      boardElement.appendChild(cell)
      }
  }
}

export { renderBoard, EventListeners};
