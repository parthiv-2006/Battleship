import {Ship, Gameboard} from './index.js';


test('Creates a ship object', () => {
  const myShip = new Ship(6)
  expect(myShip).toEqual({length: 6, numHit: 0, sunk: false})
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
  expect(myShip.sunk).toBe(true)
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