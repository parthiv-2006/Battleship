class Ship {
  constructor(length) {
    this.length = length;
    this.numHit = 0;
    this.sunk = false;
  }

  hit() {
    this.numHit++;
    this.isSunk();
  }

  isSunk() {
    if (this.numHit === this.length) {
      this.sunk = true;
    }
  }
}

class Gameboard {
  constructor() {
    this.board = this.createBoard();
  }

  createBoard() {
    const board = []; // 10 x 10 gameboard
    const rowSize = 10;

    for (let i = 0; i < rowSize; i++) {
      board.push(new Array(rowSize).fill(null));
    }
    return board;
  }

  placeShip(ship, x, y, isHorizontal = true) {
    if (isHorizontal && ship.length + x > 10) {
      return false;
    }
    if (!isHorizontal && ship.length + y > 10) {
      return false;
    }

    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        if (this.board[y][x + i] !== null) {
          return false;
        }
      } else {
        if (this.board[y + i][x] !== null) {
          return false;
        }
      }
    }

    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        this.board[y][x + i] = ship;
      } else {
        this.board[y + i][x] = ship;
      }
    }
    return true;
  }
}

export { Ship, Gameboard };
