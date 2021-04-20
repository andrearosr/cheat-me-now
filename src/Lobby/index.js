import React, { useState, useEffect } from 'react';
import './lobby.css';

function Lobby({ startGame }) {
  const [name, setName] = useState('');

  const handleStartGame = () => {
    startGame({ name });
  }

  const handleChange = (e) => {
    setName(e.target.value);
  }

  return (
    <>
      <div className="game-screen">
        <div className="lobby">
          <div className="lobby__name-card">
            Your name
            <input
              className="lobby__name-input"
              onChange={handleChange}
              value={name}
              type="text"
            />
          </div>
          <button className="lobby__button" onClick={handleStartGame}>New Game</button>
        </div>
      </div>
    </>
  );
}

export { Lobby };
