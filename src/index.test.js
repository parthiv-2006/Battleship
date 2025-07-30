import {Ship, Gameboard} from './index.js';


test('Creates a ship object', () => {
  const myShip = new Ship(6)
  expect(myShip).toEqual({length: 6, numHit: 0})
});

test('Ship is hit once', () => {
  const myShip = new Ship(6)
  myShip.hit()
  expect(myShip.numHit).toBe(1)
})

test('Ship is sunk', () => {
  const myShip = new Ship(2)
  myShip.hit()
  myShip.hit()
  expect(myShip.isSunk()).toBe(true)
})

test('Creates a gameboard with 10 rows', () => {
  const myGameboard = new Gameboard()
  expect(myGameboard.board.length).toBe(10)
})

test('Creates a gameboard with 10 entries per row', () => {
  const myGameboard = new Gameboard()
  myGameboard.board.forEach(element => {
    expect(element.length).toBe(10)
  })
})

describe('placeShip', () => {
  let gameboard;
  let ship;
  
  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3);
  });

  test('Ship is not placed with invalid coordinates', () => {
    expect(gameboard.placeShip(ship, 10, 10)).toBe(false);
  });

  test('Ship is placed with valid coordinates (horizontal)', () => {
    gameboard.placeShip(ship, 0, 0, true);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
  });

  test('Ship is placed with valid coordinates (vertical)', () => {
    gameboard.placeShip(ship, 0, 0, false);
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
  });

  test('does not place a ship on top of another ship (horizontal)', () => {
    const ship2 = new Ship(3)
    gameboard.placeShip(ship2, 0, 0, true);
    expect(gameboard.placeShip(ship, 0, 0, true)).toBe(false);
  })

  test('does not place a ship on top of another ship (vertical)', () => {
    const ship2 = new Ship(3);
    gameboard.placeShip(ship2, 0, 0, false);
    expect(gameboard.placeShip(ship, 0, 0, false)).toBe(false);
  });

  describe('receiveAttack', () => {
    let gameboard;
    let ship;

    beforeEach(() => {
      gameboard = new Gameboard();
      ship = new Ship(3);
      gameboard.placeShip(ship, 0, 0, true);
    })

    test('ship is hit', () => {
      expect(gameboard.receiveAttack(0, 0)).toBe(true)
    })

    test('ship is not hit', () => {
      expect(gameboard.receiveAttack(0, 1)).toBe(false)
    })

    test('ship hit counter is incremented', () => {
      gameboard.receiveAttack(0, 0)
      gameboard.receiveAttack(0, 1)
      gameboard.receiveAttack(1, 0)
      expect(ship.numHit).toBe(2)
    })

    test('records a missed attack on the board', () => {
      gameboard.receiveAttack(5, 5)
      expect(gameboard.board[5][5]).toBe('miss')
    })
  })

})

test('reports all ships sunk', () => {
  const gameboard = new Gameboard()
  const ship = new Ship(1)
  const ship2 = new Ship(1)
  gameboard.placeShip(ship2, 0, 1, true)
  gameboard.placeShip(ship, 0, 0, true)
  ship.hit()
  ship2.hit()
  expect(gameboard.allShipsSunk()).toBe(true)
})

test('reports when all ships are not sunk', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(1);
  const ship2 = new Ship(1);
  gameboard.placeShip(ship2, 0, 1, true);
  gameboard.placeShip(ship, 0, 0, true);
  ship.hit();
  expect(gameboard.allShipsSunk()).toBe(false);
});

