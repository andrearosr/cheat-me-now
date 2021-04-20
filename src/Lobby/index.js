import React, { useState } from 'react';
import './lobby.css';

function Lobby({ startGame }) {
  return (
    <>
      <div className="game-screen">
        <div className="lobby">
          <div className="lobby__name-card">
            Your name
            <input className="lobby__name-input" type="text" />
          </div>
          <button className="lobby__button" onClick={startGame}>Create a code</button>
          <button className="lobby__button" onClick={startGame}>Join with a code</button>
        </div>
      </div>
    </>
  );
}

export { Lobby };
