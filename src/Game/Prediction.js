import React from "react";
import Header from './Header';
import { soundClasses } from '../categories';
import Play from '../images/play.png';

function Prediction({ soundCategory, soundClass, audioURL, prediction }) {
  const handlePlayback = () => {
    const audio = new Audio(audioURL);
    audio.play();
  }

  const win = prediction.result === soundClass.class;
  const predictionClass = soundClasses.find(c => c.class === prediction.result);

  return (
    <div className="game-screen">
      <Header title={soundCategory.label} color={soundCategory.color} />
      <div className="record">
        {win && (
          <>
            Your score
            {prediction.confidence_score}
          </>
        )}
        {!win && (
          <>
            <div className="record__title">
              <span>{win ? "Great!" : "Oh no!"}</span>
            </div>
            It sounds like a<br />
            <div className="record__class">
              <span>{predictionClass.class}</span>
            </div>
          </>
        )}
      </div>
      <div className="playback">
        <button className="playback__button" onClick={handlePlayback}>
          <img className="playback__icon" src={Play} alt="play" />
        </button>
      </div>
    </div>
  );
}

export { Prediction };