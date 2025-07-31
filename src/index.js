import { renderBoard, EventListeners } from './dom.js';
import './style.css';

class Ship {
  constructor(length) {
    this.length = length;
    this.numHit = 0;
  }

  hit() {
    this.numHit++;
  }

  isSunk() {
    return this.numHit >= this.length;
  }
}

class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.ships = [];
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
    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    const cell = this.board[y][x];

    if (cell === null) {
      this.board[y][x] = 'miss';
      return false;
    }

    if (typeof cell === 'object') {
      cell.hit();
      this.board[y][x] = 'hit';
      return true;
    }

    return false;
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

class Player {
  constructor(typePlayer) {
    this.typePlayer = typePlayer;
    this.gameboard = new Gameboard();
  }

  attack(enemyGameboard, x, y) {
    return enemyGameboard.receiveAttack(x, y);
  }

  takeRandomTurn(enemyGameboard) {
    let x;
    let y;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      enemyGameboard.board[y][x] === 'miss' ||
      enemyGameboard.board[y][x] === 'hit'
    );

    return this.attack(enemyGameboard, x, y);
  }
}

export { Ship, Gameboard, Player };

new EventListeners();
