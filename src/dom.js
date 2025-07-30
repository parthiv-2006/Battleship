class EventListeners {
  constructor(player, computer) {
    this.computerBoard = document.querySelector('#computer-board');
    this.playerBoard = document.querySelector('#player-board');
    this.player = player
    this.computer = computer

    this.computerBoard.addEventListener('click', (event) => {
      const x = parseInt(event.target.dataset.x);
      const y = parseInt(event.target.dataset.y);

      if (!isNaN(x) && !isNaN(y)) {
        this.player.attack(computer.gameboard, x, y);
        renderBoard(player.gameboard, this.playerBoard);
        renderBoard(computer.gameboard, this.computerBoard);
      }
    });
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
