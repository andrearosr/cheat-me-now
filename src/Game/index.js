import React, { useState } from 'react';
import { SpinWheel } from './SpinWheel';
import { Recorder } from './Recorder';
import { soundCategories } from '../categories';

function Game() {
  const [step, setStep] = useState(1);
  const [recordClass, setRecordClass] = useState(null);
  const [recordCategory, setRecordCategory] = useState(null);

  const goToRecord = ({ soundClass, soundCategory }) => {
    setRecordClass(soundClass);
    setRecordCategory(soundCategory);
    setStep(2);
  }

  return (
    <>
      {step === 1 && <SpinWheel nextStep={goToRecord} />}
      {step === 2 && <Recorder soundClass={recordClass} soundCategory={recordCategory} />}
    </>
  );
}

export { Game };
