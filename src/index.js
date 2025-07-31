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
    this.originalShipPlacement = [];
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
    this.originalShipPlacement.push({ ship, x, y, isHorizontal });
    return true;
  }
  

  reset() {
    // 1. Reset all ships' hit counters to 0
    this.ships.forEach((ship) => {
      ship.numHit = 0;
    });

    // 2. Create a new, clean board grid
    this.board = this.createBoard();

    // 3. Re-place all the ships using the saved placement data
    this.originalShipPlacement.forEach(({ ship, x, y, isHorizontal }) => {
      for (let i = 0; i < ship.length; i++) {
        if (isHorizontal) {
          this.board[y][x + i] = ship;
        } else {
          this.board[y + i][x] = ship;
        }
      }
    });
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
      return cell;
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

    if (this.typePlayer === 'Computer') {
      this.isHunting = true;
      this.targetQueue = [];
    }
  }
  getValidAdjacentSquares(x, y, gameboard) {
    const adjacentSquares = [];
    if (y > 0) {
      adjacentSquares.push([x, y - 1]);
    }
    if (y < 9) {
      adjacentSquares.push([x, y + 1]);
    }
    if (x > 0) {
      adjacentSquares.push([x - 1, y]);
    }
    if (x < 9) {
      adjacentSquares.push([x + 1, y]);
    }
    return adjacentSquares.filter(([adjX, adjY]) => {
      const cell = gameboard.board[adjY][adjX];
      return cell !== 'miss' && cell !== 'hit';
    });
  }

  attack(enemyGameboard, x, y) {
    return enemyGameboard.receiveAttack(x, y);
  }

  takeTurnComputer(enemyGameboard) {
    if (this.isHunting) {
      let x;
      let y;
      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } while (
        enemyGameboard.board[y][x] === 'miss' ||
        enemyGameboard.board[y][x] === 'hit'
      );
      const hitResult = this.attack(enemyGameboard, x, y);
      if (hitResult) {
        this.isHunting = false;
        this.targetQueue = this.getValidAdjacentSquares(x, y, enemyGameboard);
      }
    } else {
      if (this.targetQueue.length === 0) {
        this.isHunting = true;
        this.takeTurnComputer(enemyGameboard);
        return;
      }
      const [x, y] = this.targetQueue.shift();
      const hitResult = this.attack(enemyGameboard, x, y);
      if (hitResult) {
        const hitShip = hitResult;
        if (hitShip.isSunk()) {
          this.isHunting = true;
          this.targetQueue = [];
        }
      }
    }
  }
}

export { Ship, Gameboard, Player };

new EventListeners();
