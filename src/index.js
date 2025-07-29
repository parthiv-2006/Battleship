class Ship {
  constructor(length) {
    this.length = length;
    this.numHit = 0;
    this.sunk = false;
  }

  hit() {
    this.numHit++;
    this.isSunk()
  }

  isSunk() {
    if (this.numHit === this.length) {
      this.sunk = true;
    }
  }
}

class Gameboard {
  constructor () {
    this.board = this.createBoard()
  }

  createBoard() {
    const board = [] // 10 x 10 gameboard
    const rowSize = 10

    for (let i = 0; i < rowSize; i++) {
      board.push(new Array(rowSize).fill(null))
    }
    return board
  }


}

export {Ship, Gameboard}


