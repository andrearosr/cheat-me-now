import React, { useState, useEffect, useRef } from 'react';
import { Wheel } from 'react-custom-roulette';
import { soundCategories, soundClasses } from '../categories';
import './game.css';

const categoriesToWheel = () => soundCategories.map(cat => ({ option: cat.emoji }));

function SpinWheel({ nextStep }) {
  const data = categoriesToWheel();
  const [spin, setSpin] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [soundClass, setSoundClass] = useState(null);

  const colors = soundCategories.map(cat => cat.color);
  const category = !spin && categoryIndex !== null && soundCategories[categoryIndex];

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
    setTimeout(() => {
      nextStep({ soundClass: newSoundClass, soundCategory: soundCategories[categoryIndex] });
    }, 3000);
  }

  useEffect(() => {
    setTimeout(() => {
      const wheel = document.querySelector('.spin-wheel__wrapper > div');
      const img = document.querySelector('.spin-wheel__wrapper img[alt=roulette-static]');
      wheel.style.width = '350px';
      wheel.style.height = '350px';
      img.style.display = 'none';
    }, 0);
  }, []);

  return (
    <div className="game-screen">
      <div className="spin-wheel">
        {!!category && (
          <div className="spin-wheel__selected-category">
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
          <div className="spin-wheel__arrow"></div>
          <button className="spin-wheel__button" onClick={handleSpinClick}>SPIN</button>
        </div>
        {/* {soundClass && `${soundClass.label} ${soundClass.emoji}`} */}
      </div>
    </div>
  );
}

export { SpinWheel };
