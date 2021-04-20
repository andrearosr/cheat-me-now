import React, { useState, useEffect } from 'react';
import { Game } from './Game/index';
import { Lobby } from './Lobby/index';
import Footer from './images/footer.svg';
import './App.css';

const states = {
  lobby: 'game',
  game: 'lobby',
}

function App() {
  const [state, setState] = useState('lobby');

  const handleStartGame = () => {
    setState('game');
  }

  return (
    <>
      <main className="main">
        {state === 'lobby' && <Lobby startGame={handleStartGame} />}
        {state === 'game' && <Game />}
      </main>
      <footer className="footer">
        <img className="footer__image" src={Footer} alt="footer" />
        <div className="footer__border"></div>
        <div className="footer__block"></div>
      </footer>
    </>
  );
}

export default App;
