import { useState, useEffect } from "react";
import "./css/App.css";
import gearIcon from "./assets/cog.png";
import helpIcon from "./assets/help.png";
import closeIcon from "./assets/close-thick.png";

import Card from "./components/Card.jsx";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedArray, setClickedArray] = useState([]);
  const [gameSettings, setGameSettings] = useState({
    generation: 1,
    numberOfCards: 5,
    hardMode: false,
  });
  const [gridState, setGridState] = useState({});
  const [gameStarted, setGameStarted] = useState(false);

  const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < gameSettings.numberOfCards; i++) {
      if (i === gameSettings.numberOfCards - 1) {
        const unclickedCardsInCurrentGrid = grid.filter(
          (number) => !clickedArray[number - 1]
        );
        if (unclickedCardsInCurrentGrid.length === 0) {
          if (clickedArray.every((clicked) => clicked)) {
            let random = getRandomPokemonNumber();
            while (grid.includes(random)) {
              random = getRandomPokemonNumber();
            }
            grid.push(random);
            return grid;
          } else {
            const unclickedIndices = clickedArray.forEach((clicked, index) => {
              if (!clicked) {
                return index;
              }
            });
            grid.push(unclickedIndices[0] + 1);
          }
        }
      }
      let random = getRandomPokemonNumber();
      while (grid.includes(random)) {
        random = getRandomPokemonNumber();
      }
      grid.push(random);
    }
    return grid;
  };

  const getRandomPokemonNumber = () => {
    const randomNumberModifier =
      gameSettings.generation === 1
        ? 151
        : gameSettings.generation === 2
        ? 100
        : gameSettings.generation === 3
        ? 135
        : gameSettings.generation === 4
        ? 107
        : gameSettings.generation === 5
        ? 156
        : gameSettings.generation === 6
        ? 72
        : gameSettings.generation === 7
        ? 88
        : gameSettings.generation === 8
        ? 96
        : gameSettings.generation === 9
        ? 120
        : 1025;

    const randomNumberAdditive =
      gameSettings.generation === 1
        ? 0
        : gameSettings.generation === 2
        ? 151
        : gameSettings.generation === 3
        ? 251
        : gameSettings.generation === 4
        ? 386
        : gameSettings.generation === 5
        ? 493
        : gameSettings.generation === 6
        ? 649
        : gameSettings.generation === 7
        ? 721
        : gameSettings.generation === 8
        ? 809
        : gameSettings.generation === 9
        ? 905
        : 0;

    return (
      Math.ceil(Math.random() * randomNumberModifier) + randomNumberAdditive
    );
  };

  const handleClick = (e) => {
    const index = e.currentTarget.getAttribute("id");
    if (!clickedArray[index]) {
      setClickedArray((prev) => {
        prev[index] = true;
        return prev;
      });
      setCurrentScore(currentScore + 1);
      setGridState((prev) => {
        return { grid: generateGrid(), key: prev.key };
      });
    } else {
      endGame();
    }
  };

  let cardElements = gameStarted
    ? gridState.grid.map((number, index) => {
        return (
          <Card
            number={number}
            key={index}
            hardMode={gameSettings.hardMode}
            callback={handleClick}
          />
        );
      })
    : null;

  const endGame = () => {
    console.log("end game function called");
    setCurrentScore(0);
    setClickedArray([]);
    setGridState((prev) => {
      return { grid: generateGrid(), key: prev.key };
    });
  };

  const showSettings = () => {
    document.querySelector(".settings").classList.toggle("settings-hidden");
    document.querySelector(".settings").classList.toggle("settings-showing");
  };

  const showHowToPlay = () => {
    document.querySelector(".how-to-play").classList.toggle("hidden-modal");
    document.querySelector(".how-to-play").classList.toggle("showing-modal");
    document.querySelector(".modal-shadow").classList.toggle("hidden");
    document.querySelector("body").classList.toggle("no-scroll");
  };

  const updateSettings = (e) => {
    setGameSettings({
      generation: parseInt(e.currentTarget[0].value),
      numberOfCards: parseInt(e.currentTarget[1].value),
      hardMode: e.currentTarget[2].checked,
    });
  };

  useEffect(() => {
    setCurrentScore(0);
    setClickedArray(new Array([]));
    setGridState((prev) => {
      return { grid: generateGrid(), key: prev.key };
    });
  }, [gameSettings]);

  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  }, [currentScore]);

  return (
    <>
      <div className="modal-shadow"></div>
      <nav className="nav-bar">
        <h1>Pokémon Memory Game</h1>
        <div className="score-container">
          <span className="current-score">Current Score: {currentScore}</span>
          <span className="high-score">High Score: {highScore}</span>
        </div>
        <div className="settings-container">
          <div className="options-container">
            <div className="settings settings-hidden">
              <form onChange={updateSettings} className="settings-form">
                <label htmlFor="generation-select" id="generation-label">Generation:</label>
                <select
                  id="generation-select"
                  defaultValue={gameSettings.generation}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="all">All</option>
                </select>
                <label htmlFor="number-of-cards" id="cards-label">Card Count:</label>
                <select
                  id="number-of-cards"
                  defaultValue={gameSettings.numberOfCards}
                >
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <label htmlFor="hard-mode" id="hard-label">Hard Mode:</label>
                <input
                  type="checkbox"
                  id="hard-mode"
                  defaultValue={gameSettings.hardMode}
                />
              </form>
            </div>
            <button className="game-options-button settings-button" onClick={showSettings}>
              <img className="icon" src={gearIcon} />
            </button>
          </div>
          <button className="how-to-play-button settings-button" onClick={showHowToPlay}>
            <img className="icon" src={helpIcon} />
          </button>
        </div>
      </nav>
      <div className="how-to-play modal showing-modal">
        {gameStarted ? (
          <button onClick={showHowToPlay} className="close-how-to-play">
            <img className="icon" src={closeIcon} />
          </button>
        ) : null}
        <h1>How To Play:</h1>
        <p>Click a card that you haven't already clicked to get a point.</p>
        <p>Click the same card twice and the game will end.</p>
        <p>
          The generation of Pokemon shown, as well as the number of cards on the
          screen can be changed in the options.
        </p>
        <p>Try your best to get a high score!</p>
        {gameStarted ? null : (
          <button
            onClick={() => {
              setGameStarted(true);
              showHowToPlay();
            }}
          >
            Start
          </button>
        )}
      </div>
      <div className="app-container">
        <div className="card-grid" key={gridState.key}>
          {cardElements}
        </div>
      </div>
    </>
  );
}

export default App;
