import React, { useState } from 'react';
import { SpinWheel } from './SpinWheel';
import { Recorder } from './Recorder';
import { Loading } from './Loading';

function Game() {
  const [step, setStep] = useState(1);
  const [recordClass, setRecordClass] = useState(null);
  const [recordCategory, setRecordCategory] = useState(null);
  const [recordBlob, setRecordBlob] = useState(null);
  const [recordURL, setRecordURL] = useState(null);

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

  return (
    <>
      {step === 1 && <SpinWheel nextStep={goToRecord} />}
      {step === 2 && <Recorder soundClass={recordClass} soundCategory={recordCategory} nextStep={goToPredict} />}
      {step === 3 && <Loading audioBlob={recordBlob} soundCategory={recordCategory} nextStep={() => {}} />}
    </>
  );
}

export { Game };
