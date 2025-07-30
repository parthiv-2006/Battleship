class EventListeners {
  constructor(player, computer) {
    this.computerBoard = document.querySelector('#computer-board');
    this.playerBoard = document.querySelector('#player-board');
    this.player = player
    this.computer = computer
    this.isGameOver = false

    this.computerBoard.addEventListener('click', (event) => {
      if (this.isGameOver || !event.target.classList.contains('cell')) {
        return;
      }
      const x = parseInt(event.target.dataset.x);
      const y = parseInt(event.target.dataset.y);
      this.runGame(x, y);
    });
  }

  runGame(x, y) {

    if (isNaN(x) || isNaN(y)) {return}
  
    this.player.attack(this.computer.gameboard, x, y)
    renderBoard(this.computer.gameboard, this.computerBoard)
  
    if (this.computer.gameboard.allShipsSunk()) {
      alert('You Win!')
      this.isGameOver = true
      return
    }
  
    // computer turn
  
    setTimeout(() => {
      this.computer.takeRandomTurn(this.player.gameboard)
      renderBoard(this.player.gameboard, this.playerBoard)
      if (this.player.gameboard.allShipsSunk()) {
        alert('You Lose!')
        this.isGameOver = true
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
