import React, { useState } from 'react';
import { SpinWheel } from './SpinWheel';
import { Recorder } from './Recorder';

function Game() {
  const [step, setStep] = useState(1);
  return (
    <>
      {step === 1 && <SpinWheel nextStep={() => setStep(2)} />}
      {step === 2 && <Recorder />}
    </>
  );
}

export { Game };
