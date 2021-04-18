import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { soundCategories, soundClasses } from '../categories';
import './game.css';

const categoriesToWheel = () => soundCategories.map(cat => ({ option: cat.emoji }));

function SpinWheel() {
  const data = categoriesToWheel();
  const [spin, setSpin] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [soundClass, setSoundClass] = useState(null);

  function handleSpinClick() {
    setCategoryIndex(Math.floor(Math.random() * data.length));
    setSoundClass(null);
    setSpin(true);
  }

  function onStopSpinning() {
    const categoryClasses = soundCategories[categoryIndex].classes;
    const classIndex = Math.floor(Math.random() * categoryClasses.length);
    const newSoundClass = soundClasses.find(c => c.class === categoryClasses[classIndex])
    setSpin(false);
    setSoundClass(newSoundClass);
  }

  const colors = soundCategories.map(cat => cat.color);
  const category = !spin && categoryIndex !== null && soundCategories[categoryIndex];

  return (
    <div className="spin-wheel">
      {!!category && (
        <div class="spin-wheel__selected-category">
          <span style={{ color: category.color }}>
            {category.label}
          </span>
        </div>
      )}
      <div className="spin-wheel__wrapper">
        <Wheel
          mustStartSpinning={spin}
          prizeNumber={categoryIndex}
          data={data}
          onStopSpinning={onStopSpinning}
          fontSize={60}
          textDistance={65}
          perpendicularText
          backgroundColors={colors}
          outerBorderColor="rgb(98,98,98)"
          outerBorderWidth="10"
          innerRadius="20"
          innerBorderWidth="2"
          innerBorderColor="rgb(98,98,98)"
          radiusLineWidth="2"
          radiusLineColor="rgb(98,98,98)"
        />
        <button className="spin-wheel__button" onClick={handleSpinClick}>SPIN</button>
      </div>
      {/* {soundClass && `${soundClass.label} ${soundClass.emoji}`} */}
    </div>
  );
}

export { SpinWheel };
