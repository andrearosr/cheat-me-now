import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { categories } from '../categories';

const categoriesToWheel = () => categories.map(cat => ({ option: cat.emoji }));

function SpinWheel() {
  const data = categoriesToWheel();
  const [spin, setSpin] = useState(false);
  const [roundClass, setRoundClass] = useState(null);

  function handleSpinClick() {
    setRoundClass(Math.floor(Math.random() * data.length));
    setSpin(true);
  }

  function onStopSpinning() {
    setSpin(false);
  }

  return (
    <div>
      {spin && <h2>What will it be?</h2>}
      {!spin && roundClass !== null && <h2>{categories[roundClass].label}</h2>}
      <Wheel
        mustStartSpinning={spin}
        prizeNumber={roundClass}
        data={data}
        onStopSpinning={onStopSpinning}
        fontSize={40}
        textDistance={70}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </div>
  );
}

export { SpinWheel };
