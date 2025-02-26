import { useState, useEffect } from 'react';
import './css/App.css';
import gearIcon from "./assets/cog.png";
import helpIcon from "./assets/help.png";

import CardGrid from './components/CardGrid.jsx';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      grid.push(Math.ceil(Math.random() * 1025));
    }
    return grid;
  };

  const [gridState, setGridState] = useState(generateGrid());

  const handleClick = () => {
    setCurrentScore(currentScore + 1);
    setGridState(generateGrid());
  }

  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  }, [currentScore, highScore]);

  return (<>
    <nav className="nav-bar">
      <h1>Pokémon Memory Game</h1>
      <div className="score-container">
        <span className="current-score">Current Score: {currentScore}</span>
        <span className="high-score">High Score: {highScore}</span>
      </div>
      <div className="settings-container">
        <button className="game-options"><img className="icon" src={gearIcon} /></button>
        <button className="how-to-play"><img className="icon" src={helpIcon} /></button>
      </div>
    </nav>
    <div className="app-container">
      <CardGrid callback={handleClick} grid={gridState} />
    </div>
  </>)
}

export default App;