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

  return (
    <>
      {step === 1 && <SpinWheel nextStep={goToRecord} />}
      {step === 2 && <Recorder soundClass={recordClass} soundCategory={recordCategory} nextStep={goToPredict} />}
      {step === 3 && <Loading audioBlob={recordBlob} soundCategory={recordCategory} nextStep={goToResult} />}
      {step === 4 && <Prediction audioURL={recordURL} soundCategory={recordCategory} soundClass={recordClass} prediction={recordPrediction} />}
    </>
  );
}

export { Game };
