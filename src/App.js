import React from 'react';
import { Game } from './Game/index';
import Footer from './images/footer.svg';
import './App.css';

function App() {
  return (
    <>
      <main className="main">
        <Game />
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
