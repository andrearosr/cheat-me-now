import React, { useState } from 'react';
import { SpinWheel } from './SpinWheel';
import { Recorder } from './Recorder';
import { Loading } from './Loading';
import { Prediction } from './Prediction';

function Game() {
  const [step, setStep] = useState(1);
  const [recordClass, setRecordClass] = useState(null);
  const [recordCategory, setRecordCategory] = useState(null);
  const [recordBlob, setRecordBlob] = useState(null);
  const [recordURL, setRecordURL] = useState(null);
  const [recordPrediction, setRecordPrediction] = useState(null);
  const [round, setRound] = useState(1);
  const [coins, setCoins] = useState(0);

  const goToRecord = ({ soundClass, soundCategory }) => {
    setRecordClass(soundClass);
    setRecordCategory(soundCategory);
    setStep(2);
  }

  const goToPredict = ({ audioBlob, audioURL }) => {
    setRecordBlob(audioBlob);
    setRecordURL(audioURL);
    setStep(3);
  }

  const goToResult = ({ prediction }) => {
    setRecordPrediction(prediction);
    setStep(4);
  }

  const goToWheel = ({ win }) => {
    if (win) setCoins(coins + (recordPrediction.confidence_score * 1000));
    setRound(round + 1);
    setStep(1);
  }

  return (
    <>
      {step === 1 && <SpinWheel round={round} coins={coins} nextStep={goToRecord} />}
      {step === 2 && <Recorder soundClass={recordClass} soundCategory={recordCategory} nextStep={goToPredict} />}
      {step === 3 && <Loading audioBlob={recordBlob} soundCategory={recordCategory} nextStep={goToResult} />}
      {step === 4 && <Prediction audioURL={recordURL} soundCategory={recordCategory} soundClass={recordClass} prediction={recordPrediction} nextStep={goToWheel} />}
    </>
  );
}

export { Game };
