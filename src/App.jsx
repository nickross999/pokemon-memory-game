import { useState, useEffect } from "react";
import "./css/App.css";
import gearIcon from "./assets/cog.png";
import helpIcon from "./assets/help.png";

import CardGrid from "./components/CardGrid.jsx";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedArray, setClickedArray] = useState(new Array(1025).fill(false));
  const [gameSettings, setGameSettings] = useState({
    numberOfCards: 10,
    generations: {
      1: true,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
    },
  });

  const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < gameSettings.numberOfCards; i++) {
      let random = Math.ceil(Math.random() * 1025);
      while (grid.includes(random)) {
        random = Math.ceil(Math.random() * 1025);
      }
      grid.push(random);
    }
    return grid;
  };

  const [gridState, setGridState] = useState(generateGrid());

  const handleClick = (e) => {
    const index = e.currentTarget.getAttribute("id");
    if (!clickedArray[index]) {
      setClickedArray((prev) => {
        prev[index] = true;
        return prev;
      });
      setCurrentScore(currentScore + 1);
      setGridState(generateGrid());
    } else {
      endGame();
    }
  };

  const endGame = () => {
    console.log("end game function called");
  };

  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  }, [currentScore, highScore]);

  return (
    <>
      <nav className="nav-bar">
        <h1>Pokémon Memory Game</h1>
        <div className="score-container">
          <span className="current-score">Current Score: {currentScore}</span>
          <span className="high-score">High Score: {highScore}</span>
        </div>
        <div className="settings-container">
          <button className="game-options">
            <img className="icon" src={gearIcon} />
          </button>
          <button className="how-to-play">
            <img className="icon" src={helpIcon} />
          </button>
        </div>
      </nav>
      <div className="app-container">
        <CardGrid callback={handleClick} grid={gridState} />
      </div>
    </>
  );
}

export default App;
