# BATTLESHIP - The Tactical Naval Combat Game


This project is a web-based implementation of the classic board game, Battleship. It's a single-player game where you face off against a computer opponent. The objective is to sink all of the opponent's ships before they sink yours. This project was built with a focus on clean code, Object-Oriented Programming (OOP) principles, and Test-Driven Development (TDD).

**Live Demo:** [Link to live demo](https://parthiv-2006.github.io/Battleship/)

## Features

* **Classic Battleship Gameplay:** Engage in tactical naval combat on a 10x10 grid.
* **Player vs. Computer:** Test your skills against an AI opponent.
* **Randomized Ship Placement:** Both player and computer fleets are randomly positioned at the start of each game for unique challenges.
* **"Swap Board" Option:** Don't like your initial ship layout? Swap it for a new random one before the first shot is fired.
* **Intelligent AI:** The computer opponent employs a "hunt and target" algorithm. After scoring a hit, it will intelligently attack adjacent squares to sink the ship quickly.
* **Interactive UI:** A clean and modern user interface provides clear visual feedback for hits, misses, and your own ship placements.
* **Game State Messages:** Stay informed with messages indicating whose turn it is, and clear win/loss announcements.
* **Responsive Design:** The game is designed to be playable on various screen sizes.

## Technologies Used

This project is built using modern web development tools and practices.

* **Frontend:**
    * HTML5
    * CSS3
    * JavaScript (ES6+)
* **Build Tools & Development Environment:**
    * **Webpack:** For bundling JavaScript modules and assets.
    * **Babel:** For transpiling modern JavaScript to ensure browser compatibility.
    * **Webpack Dev Server:** For a live-reloading development environment.
* **Testing & Code Quality:**
    * **Jest:** For running unit tests.
    * **ESLint:** For identifying and fixing problems in JavaScript code.
    * **Prettier:** For automated code formatting to maintain a consistent style.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* [Node.js](https://nodejs.org/) (which includes npm)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/battleship.git](https://github.com/your-username/battleship.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd battleship
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

## Available Scripts

In the project directory, you can run the following commands:

* `npm start`
    * Runs the app in development mode using the Webpack Dev Server.
    * Open [http://localhost:8080](http://localhost:8080) (or the port shown in your terminal) to view it in the browser.
    * The page will reload if you make edits.

* `npm run build`
    * Builds the app for production to the `dist` folder.
    * It correctly bundles your code and optimizes the build for the best performance.

* `npm test`
    * Launches the test runner in the interactive watch mode.
    * This will run all the unit tests written with Jest.

* `npm run watch`
    * A variation of the test script that automatically re-runs tests when files are changed.

* `npm run lint`
    * Runs ESLint to analyze the code for potential errors and style issues.

## Project Structure

The core logic of the game is organized into several key modules:

* **`index.js`:** Contains the primary game logic classes:
    * `Ship`: Represents a single ship with properties for length, hits, and whether it's sunk.
    * `Gameboard`: Manages the 10x10 grid, ship placement, and attack registration.
    * `Player`: Represents a player (either Human or Computer) and handles attacks.
* **`dom.js`:** Handles all interactions with the DOM. This includes rendering the game boards, handling user clicks, and updating the display based on game events.
* **`index.test.js`:** Contains all the unit tests for the game logic, ensuring that each component works as expected.

